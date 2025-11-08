import axios, { AxiosInstance } from 'axios';
import { ScryfallCard, ScryfallSearchResult, BaseDataSource } from '../types';

export class ScryfallDataSource implements BaseDataSource {
  private client: AxiosInstance;
  private readonly baseUrl = 'https://api.scryfall.com';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async initialize(): Promise<void> {
    // No initialization needed for Scryfall API
  }

  async cleanup(): Promise<void> {
    // No cleanup needed
  }

  async searchCards(query: string, page = 1): Promise<ScryfallSearchResult> {
    try {
      const response = await this.client.get<ScryfallSearchResult>('/cards/search', {
        params: {
          q: query,
          page,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          object: 'list',
          total_cards: 0,
          has_more: false,
          data: [],
        };
      }
      throw error;
    }
  }

  async getCardById(scryfallId: string): Promise<ScryfallCard | null> {
    try {
      const response = await this.client.get<ScryfallCard>(`/cards/${scryfallId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async getCardByName(name: string, exact = true): Promise<ScryfallCard | null> {
    try {
      const response = await this.client.get<ScryfallCard>('/cards/named', {
        params: exact ? { exact: name } : { fuzzy: name },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async getRandomCard(): Promise<ScryfallCard> {
    const response = await this.client.get<ScryfallCard>('/cards/random');
    return response.data;
  }

  async autocomplete(query: string): Promise<string[]> {
    try {
      const response = await this.client.get<{ object: 'catalog'; data: string[] }>(
        '/cards/autocomplete',
        {
          params: { q: query },
        }
      );
      return response.data.data;
    } catch (error) {
      return [];
    }
  }
}
