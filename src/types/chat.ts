export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: Date;
}

export interface ChatBackend {
  sendMessage(content: string): Promise<Message>;
}
