// Generic Types
export interface BaseDataSource {
  initialize(): Promise<void>;
  cleanup(): Promise<void>;
}

// User Profile Types
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  location?: GeoLocation;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  tenantId?: string;
}

export interface UserPreferences {
  ageRange?: [number, number];
  maxDistance?: number;
  [key: string]: any;
}

// Matchmaking Types
export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  status: MatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum MatchStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  BLOCKED = 'blocked'
}

export interface SwipeAction {
  userId: string;
  targetUserId: string;
  action: 'like' | 'pass';
  timestamp: Date;
}

// Messaging Types
export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  createdAt: Date;
  read: boolean;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  DECK = 'deck'
}

export interface Conversation {
  id: string;
  matchId: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// GeoLocation Types
export interface GeoLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface GeoDistance {
  distance: number;
  unit: 'km' | 'miles';
}

// MTG-Specific Types
export interface MTGProfile {
  userId: string;
  favoriteFormats: MTGFormat[];
  favoriteColors: MTGColor[];
  experienceLevel: ExperienceLevel;
  playStyle: PlayStyle[];
  lookingFor: LookingFor[];
  deckCount: number;
  winRate?: number;
}

export enum MTGFormat {
  STANDARD = 'Standard',
  MODERN = 'Modern',
  COMMANDER = 'Commander',
  LEGACY = 'Legacy',
  VINTAGE = 'Vintage',
  PIONEER = 'Pioneer',
  PAUPER = 'Pauper',
  DRAFT = 'Draft',
  SEALED = 'Sealed'
}

export enum MTGColor {
  WHITE = 'W',
  BLUE = 'U',
  BLACK = 'B',
  RED = 'R',
  GREEN = 'G',
  COLORLESS = 'C'
}

export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  COMPETITIVE = 'competitive'
}

export enum PlayStyle {
  CASUAL = 'casual',
  COMPETITIVE = 'competitive',
  SOCIAL = 'social',
  TOURNAMENT = 'tournament'
}

export enum LookingFor {
  PLAYGROUP = 'playgroup',
  TOURNAMENT_PARTNER = 'tournament_partner',
  CASUAL_GAMES = 'casual_games',
  DECK_BUILDING = 'deck_building',
  TRADING = 'trading',
  FRIENDSHIP = 'friendship'
}

// Deck Types
export interface Deck {
  id: string;
  userId: string;
  name: string;
  format: MTGFormat;
  colors: MTGColor[];
  description?: string;
  mainboard: DeckCard[];
  sideboard: DeckCard[];
  commander?: DeckCard;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeckCard {
  scryfallId: string;
  name: string;
  quantity: number;
  imageUrl?: string;
}

// Scryfall API Types
export interface ScryfallCard {
  id: string;
  name: string;
  mana_cost?: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;
  colors?: string[];
  color_identity?: string[];
  set: string;
  rarity: string;
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
  };
  prices?: {
    usd?: string;
    eur?: string;
  };
}

export interface ScryfallSearchResult {
  object: 'list';
  total_cards: number;
  has_more: boolean;
  data: ScryfallCard[];
}

// Multi-tenant Types
export interface Tenant {
  id: string;
  name: string;
  domain: string;
  settings: TenantSettings;
  createdAt: Date;
  active: boolean;
}

export interface TenantSettings {
  features: {
    matchmaking: boolean;
    messaging: boolean;
    deckSharing: boolean;
  };
  branding?: {
    primaryColor: string;
    logoUrl: string;
  };
  [key: string]: any;
}
