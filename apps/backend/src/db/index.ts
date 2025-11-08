import { Pool, PoolClient } from 'pg';
import { config } from '../config';

export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      connectionString: config.databaseUrl,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async query(text: string, params?: any[]): Promise<any> {
    const start = Date.now();
    const res = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  }

  public async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }

  public async initialize(): Promise<void> {
    await this.createTables();
  }

  private async createTables(): Promise<void> {
    const client = await this.getClient();
    try {
      await client.query('BEGIN');

      // Tenants table
      await client.query(`
        CREATE TABLE IF NOT EXISTS tenants (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          domain VARCHAR(255) UNIQUE NOT NULL,
          settings JSONB DEFAULT '{}',
          active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Users table
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          display_name VARCHAR(255) NOT NULL,
          bio TEXT,
          avatar_url VARCHAR(500),
          latitude DOUBLE PRECISION,
          longitude DOUBLE PRECISION,
          city VARCHAR(255),
          country VARCHAR(255),
          preferences JSONB DEFAULT '{}',
          tenant_id UUID REFERENCES tenants(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // MTG Profiles table
      await client.query(`
        CREATE TABLE IF NOT EXISTS mtg_profiles (
          user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          favorite_formats TEXT[] DEFAULT '{}',
          favorite_colors TEXT[] DEFAULT '{}',
          experience_level VARCHAR(50),
          play_style TEXT[] DEFAULT '{}',
          looking_for TEXT[] DEFAULT '{}',
          deck_count INTEGER DEFAULT 0,
          win_rate DOUBLE PRECISION
        );
      `);

      // Swipes table
      await client.query(`
        CREATE TABLE IF NOT EXISTS swipes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          target_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          action VARCHAR(10) NOT NULL CHECK (action IN ('like', 'pass')),
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, target_user_id)
        );
      `);

      // Matches table
      await client.query(`
        CREATE TABLE IF NOT EXISTS matches (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id_1 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          user_id_2 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          status VARCHAR(20) DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id_1, user_id_2)
        );
      `);

      // Messages table
      await client.query(`
        CREATE TABLE IF NOT EXISTS messages (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
          sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          type VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'image', 'deck')),
          read BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Decks table
      await client.query(`
        CREATE TABLE IF NOT EXISTS decks (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          name VARCHAR(255) NOT NULL,
          format VARCHAR(50) NOT NULL,
          colors TEXT[] DEFAULT '{}',
          description TEXT,
          mainboard JSONB DEFAULT '[]',
          sideboard JSONB DEFAULT '[]',
          commander JSONB,
          is_public BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create indexes
      await client.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');
      await client.query('CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);');
      await client.query('CREATE INDEX IF NOT EXISTS idx_swipes_user ON swipes(user_id);');
      await client.query('CREATE INDEX IF NOT EXISTS idx_swipes_target ON swipes(target_user_id);');
      await client.query('CREATE INDEX IF NOT EXISTS idx_matches_users ON matches(user_id_1, user_id_2);');
      await client.query('CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id);');
      await client.query('CREATE INDEX IF NOT EXISTS idx_decks_user ON decks(user_id);');

      await client.query('COMMIT');
      console.log('Database tables created successfully');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error creating tables:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}
