import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '@/lib/db/schema';

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getProfile(userId: string): Promise<Omit<User, 'password' | 'refreshToken'>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...profile } = user;
    return profile;
  }

  async updateProfile(userId: string, data: Partial<Pick<User, 'fullName' | 'username' | 'email'>>): Promise<Omit<User, 'password' | 'refreshToken'>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if email or username is already taken by another user
    if (data.email || data.username) {
      const existingUsers = await this.userRepository.findByEmailOrUsername(
        data.email || user.email,
        data.username || user.username
      );

      const isConflict = existingUsers.some(u => u.id !== userId);
      if (isConflict) {
        throw new Error('Email or Username already in use');
      }
    }

    const updatedUser = await this.userRepository.update(userId, data);
    const { password: _, ...profile } = updatedUser;
    return profile;
  }
}
