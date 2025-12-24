import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { JWTService } from '../utils/JWTService';
import { PasswordUtil } from '../utils/PasswordUtil';
import { NewUser, User } from '@/lib/db/schema';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(userData: NewUser) {
    const [existingUsers, hashedPassword] = await Promise.all([
      this.userRepository.findByEmailOrUsername(userData.email, userData.username),
      PasswordUtil.hash(userData.password)
    ]);

    if (existingUsers.some(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }

    if (existingUsers.some(u => u.username === userData.username)) {
      throw new Error('Username already taken');
    }

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.generateAuthResponse(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await PasswordUtil.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return this.generateAuthResponse(user);
  }

  async refresh(token: string) {
    const payload = JWTService.verifyRefreshToken(token);
    if (!payload) {
      throw new Error('Invalid refresh token');
    }

    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new Error('User not found');
    }

    return this.generateAuthResponse(user);
  }

  private generateAuthResponse(user: User) {
    const payload = { id: user.id, email: user.email, username: user.username };
    const accessToken = JWTService.signAccessToken(payload);
    const refreshToken = JWTService.signRefreshToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
      },
      accessToken,
      refreshToken,
    };
  }
}
