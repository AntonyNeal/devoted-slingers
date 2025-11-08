import { Message, Conversation, MessageType, BaseDataSource } from '../types';

export abstract class MessagingDataSource implements BaseDataSource {
  abstract initialize(): Promise<void>;
  abstract cleanup(): Promise<void>;

  abstract sendMessage(message: Omit<Message, 'id' | 'createdAt' | 'read'>): Promise<Message>;
  abstract getMessages(matchId: string, limit?: number, offset?: number): Promise<Message[]>;
  abstract markAsRead(messageId: string): Promise<void>;
  abstract getConversations(userId: string): Promise<Conversation[]>;
  abstract getConversation(matchId: string): Promise<Conversation | null>;
  abstract deleteMessage(messageId: string): Promise<void>;
}
