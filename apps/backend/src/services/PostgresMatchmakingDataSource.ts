import { Match, SwipeAction, MatchStatus, MatchmakingDataSource } from '@devoted-slingers/matchmaking-sdk';
import { Database } from '../db';

export class PostgresMatchmakingDataSource extends MatchmakingDataSource {
  private db: Database;

  constructor() {
    super();
    this.db = Database.getInstance();
  }

  async initialize(): Promise<void> {
    // Database initialization handled by Database class
  }

  async cleanup(): Promise<void> {
    // Cleanup handled by Database class
  }

  async recordSwipe(swipe: SwipeAction): Promise<void> {
    await this.db.query(
      `INSERT INTO swipes (user_id, target_user_id, action, timestamp)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, target_user_id) DO UPDATE SET action = $3, timestamp = $4`,
      [swipe.userId, swipe.targetUserId, swipe.action, swipe.timestamp]
    );

    // Check if this creates a match
    if (swipe.action === 'like') {
      const reciprocalSwipe = await this.db.query(
        `SELECT * FROM swipes WHERE user_id = $1 AND target_user_id = $2 AND action = 'like'`,
        [swipe.targetUserId, swipe.userId]
      );

      if (reciprocalSwipe.rows.length > 0) {
        // Create a match
        await this.db.query(
          `INSERT INTO matches (user_id_1, user_id_2, status)
           VALUES ($1, $2, 'accepted')
           ON CONFLICT (user_id_1, user_id_2) DO NOTHING`,
          [swipe.userId, swipe.targetUserId]
        );
      }
    }
  }

  async checkMatch(userId: string, targetUserId: string): Promise<Match | null> {
    const result = await this.db.query(
      `SELECT * FROM matches 
       WHERE (user_id_1 = $1 AND user_id_2 = $2) OR (user_id_1 = $2 AND user_id_2 = $1)`,
      [userId, targetUserId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToMatch(result.rows[0]);
  }

  async getUserMatches(userId: string, status?: MatchStatus): Promise<Match[]> {
    let query = `SELECT * FROM matches WHERE (user_id_1 = $1 OR user_id_2 = $1)`;
    const values: any[] = [userId];

    if (status) {
      query += ` AND status = $2`;
      values.push(status);
    }

    query += ` ORDER BY created_at DESC`;

    const result = await this.db.query(query, values);
    return result.rows.map((row: any) => this.mapRowToMatch(row));
  }

  async updateMatchStatus(matchId: string, status: MatchStatus): Promise<Match> {
    const result = await this.db.query(
      `UPDATE matches SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, matchId]
    );

    return this.mapRowToMatch(result.rows[0]);
  }

  async getMatchById(matchId: string): Promise<Match | null> {
    const result = await this.db.query(
      `SELECT * FROM matches WHERE id = $1`,
      [matchId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToMatch(result.rows[0]);
  }

  async getPotentialMatches(userId: string, limit: number): Promise<string[]> {
    // Get users that haven't been swiped on yet by the current user
    const result = await this.db.query(
      `SELECT u.id FROM users u
       WHERE u.id != $1
       AND u.id NOT IN (
         SELECT target_user_id FROM swipes WHERE user_id = $1
       )
       LIMIT $2`,
      [userId, limit]
    );

    return result.rows.map((row: any) => row.id);
  }

  private mapRowToMatch(row: any): Match {
    return {
      id: row.id,
      userId1: row.user_id_1,
      userId2: row.user_id_2,
      status: row.status as MatchStatus,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
