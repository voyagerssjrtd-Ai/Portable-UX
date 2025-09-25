export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
}

export interface ChatBackend {
  sendMessage(content: string): Promise<Message>;
    streamMessage?: (
    content: string,
    onChunk: (chunk: string) => void,
    onComplete?: (final: Message) => void,
    signal?: AbortSignal
  ) => Promise<void>;
}

