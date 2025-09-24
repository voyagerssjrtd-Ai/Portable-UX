import { ChatBackend, Message } from '../types/chat';

export const LocalAdapter: ChatBackend = {
  async sendMessage(content: string): Promise<Message> {
    // Fake reply after 1 second
    await new Promise((r) => setTimeout(r, 1000));
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Echo: ${content}`,
      createdAt: new Date(),
    };
  },
};
