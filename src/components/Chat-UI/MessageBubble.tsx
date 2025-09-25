import React from 'react';
import { Message } from '../../types/chat';

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl shadow 
          ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
      >
        <div>{message.content}</div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
