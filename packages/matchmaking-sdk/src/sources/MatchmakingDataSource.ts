import { Match, SwipeAction, MatchStatus, BaseDataSource } from '../types';

export abstract class MatchmakingDataSource implements BaseDataSource {
  abstract initialize(): Promise<void>;
  abstract cleanup(): Promise<void>;

  abstract recordSwipe(swipe: SwipeAction): Promise<void>;
  abstract checkMatch(userId: string, targetUserId: string): Promise<Match | null>;
  abstract getUserMatches(userId: string, status?: MatchStatus): Promise<Match[]>;
  abstract updateMatchStatus(matchId: string, status: MatchStatus): Promise<Match>;
  abstract getMatchById(matchId: string): Promise<Match | null>;
  abstract getPotentialMatches(userId: string, limit: number): Promise<string[]>;
}
