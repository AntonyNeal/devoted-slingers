import { UserProfile, UserProfileDataSource } from '@devoted-slingers/matchmaking-sdk';
import { Database } from '../db';

export class PostgresUserProfileDataSource extends UserProfileDataSource {
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

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToProfile(result.rows[0]);
  }

  async createUserProfile(profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserProfile> {
    const result = await this.db.query(
      `INSERT INTO users (email, display_name, bio, avatar_url, latitude, longitude, city, country, preferences, tenant_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        profile.email,
        profile.displayName,
        profile.bio,
        profile.avatarUrl,
        profile.location?.latitude,
        profile.location?.longitude,
        profile.location?.city,
        profile.location?.country,
        JSON.stringify(profile.preferences || {}),
        profile.tenantId,
      ]
    );

    return this.mapRowToProfile(result.rows[0]);
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updates.displayName !== undefined) {
      fields.push(`display_name = $${paramCount++}`);
      values.push(updates.displayName);
    }
    if (updates.bio !== undefined) {
      fields.push(`bio = $${paramCount++}`);
      values.push(updates.bio);
    }
    if (updates.avatarUrl !== undefined) {
      fields.push(`avatar_url = $${paramCount++}`);
      values.push(updates.avatarUrl);
    }
    if (updates.location !== undefined) {
      fields.push(`latitude = $${paramCount++}`);
      values.push(updates.location.latitude);
      fields.push(`longitude = $${paramCount++}`);
      values.push(updates.location.longitude);
      fields.push(`city = $${paramCount++}`);
      values.push(updates.location.city);
      fields.push(`country = $${paramCount++}`);
      values.push(updates.location.country);
    }
    if (updates.preferences !== undefined) {
      fields.push(`preferences = $${paramCount++}`);
      values.push(JSON.stringify(updates.preferences));
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(userId);

    const result = await this.db.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return this.mapRowToProfile(result.rows[0]);
  }

  async deleteUserProfile(userId: string): Promise<void> {
    await this.db.query('DELETE FROM users WHERE id = $1', [userId]);
  }

  async searchUsers(filters: {
    location?: { latitude: number; longitude: number; radiusKm: number };
    tenantId?: string;
  }): Promise<UserProfile[]> {
    let query = 'SELECT * FROM users WHERE 1=1';
    const values: any[] = [];
    let paramCount = 1;

    if (filters.tenantId) {
      query += ` AND tenant_id = $${paramCount++}`;
      values.push(filters.tenantId);
    }

    if (filters.location) {
      // Using Haversine formula for distance calculation
      const { latitude, longitude, radiusKm } = filters.location;
      query += ` AND (
        6371 * acos(
          cos(radians($${paramCount})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians($${paramCount + 1})) +
          sin(radians($${paramCount})) * sin(radians(latitude))
        )
      ) <= $${paramCount + 2}`;
      values.push(latitude, longitude, radiusKm);
    }

    query += ' LIMIT 50';

    const result = await this.db.query(query, values);
    return result.rows.map((row: any) => this.mapRowToProfile(row));
  }

  private mapRowToProfile(row: any): UserProfile {
    return {
      id: row.id,
      email: row.email,
      displayName: row.display_name,
      bio: row.bio,
      avatarUrl: row.avatar_url,
      location: row.latitude && row.longitude ? {
        latitude: row.latitude,
        longitude: row.longitude,
        city: row.city,
        country: row.country,
      } : undefined,
      preferences: row.preferences || {},
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      tenantId: row.tenant_id,
    };
  }
}
