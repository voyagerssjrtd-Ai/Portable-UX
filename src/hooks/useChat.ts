// src/hooks/useChat.ts
import { useState } from 'react';
import { Message } from '../types/chat';
import { LocalAdapter } from '../adapters/LocalAdapter'; // adjust path if needed

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const backend = LocalAdapter;

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // 1️⃣ add the user message to the state
    const userMessage: Message = {
      id: crypto.randomUUID(),       // unique id
      role: 'user',
      content,
      createdAt: new Date().toISOString() // ✅ required
    };
    setMessages(prev => [...prev, userMessage]);

    // 2️⃣ get assistant reply from backend
    const reply = await backend.sendMessage(content);

    // 3️⃣ add assistant reply to the state
    setMessages(prev => [...prev, reply]);
  };

  return { messages, sendMessage };
};
