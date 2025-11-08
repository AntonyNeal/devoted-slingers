import { MTGProfile, BaseDataSource } from '../types';

export abstract class MTGProfileDataSource implements BaseDataSource {
  abstract initialize(): Promise<void>;
  abstract cleanup(): Promise<void>;

  abstract getMTGProfile(userId: string): Promise<MTGProfile | null>;
  abstract createMTGProfile(profile: MTGProfile): Promise<MTGProfile>;
  abstract updateMTGProfile(userId: string, updates: Partial<MTGProfile>): Promise<MTGProfile>;
  abstract deleteMTGProfile(userId: string): Promise<void>;
  abstract searchByPreferences(filters: {
    formats?: string[];
    colors?: string[];
    experienceLevel?: string;
    playStyle?: string[];
  }): Promise<MTGProfile[]>;
}
