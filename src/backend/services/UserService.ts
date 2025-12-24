import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { User } from '../types/User';
import { CacheService } from '../utils/CacheService';

export class UserService {
  private userRepository: IUserRepository;
  private readonly CACHE_TTL = 300; // 5 minutes

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const cacheKey = `user_profile_${userId}`;
    const cached = CacheService.get<Omit<User, 'password'>>(cacheKey);
    if (cached) return cached;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...profile } = user;
    CacheService.set(cacheKey, profile, this.CACHE_TTL);
    return profile;
  }

  async updateProfile(userId: string, data: Partial<Pick<User, 'fullName' | 'username' | 'email'>>): Promise<Omit<User, 'password'>> {
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
    
    // Invalidate and update cache
    const cacheKey = `user_profile_${userId}`;
    CacheService.set(cacheKey, profile, this.CACHE_TTL);
    
    return profile;
  }
}
