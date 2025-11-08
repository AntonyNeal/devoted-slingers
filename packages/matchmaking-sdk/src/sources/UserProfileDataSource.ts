import { UserProfile, BaseDataSource } from '../types';

export abstract class UserProfileDataSource implements BaseDataSource {
  abstract initialize(): Promise<void>;
  abstract cleanup(): Promise<void>;

  abstract getUserProfile(userId: string): Promise<UserProfile | null>;
  abstract createUserProfile(profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserProfile>;
  abstract updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile>;
  abstract deleteUserProfile(userId: string): Promise<void>;
  abstract searchUsers(filters: {
    location?: { latitude: number; longitude: number; radiusKm: number };
    tenantId?: string;
    [key: string]: any;
  }): Promise<UserProfile[]>;
}
