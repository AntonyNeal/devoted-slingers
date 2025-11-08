import { Deck, DeckCard, MTGFormat, BaseDataSource } from '../types';

export abstract class DeckDataSource implements BaseDataSource {
  abstract initialize(): Promise<void>;
  abstract cleanup(): Promise<void>;

  abstract getDeck(deckId: string): Promise<Deck | null>;
  abstract getUserDecks(userId: string): Promise<Deck[]>;
  abstract createDeck(deck: Omit<Deck, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deck>;
  abstract updateDeck(deckId: string, updates: Partial<Deck>): Promise<Deck>;
  abstract deleteDeck(deckId: string): Promise<void>;
  abstract getPublicDecks(filters?: { format?: MTGFormat; userId?: string }): Promise<Deck[]>;
  abstract addCard(deckId: string, card: DeckCard, location: 'mainboard' | 'sideboard' | 'commander'): Promise<Deck>;
  abstract removeCard(deckId: string, cardName: string, location: 'mainboard' | 'sideboard' | 'commander'): Promise<Deck>;
}
