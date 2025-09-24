import React, { useState } from 'react';
import { ChatBackend } from '../../types/chat';

interface ChatUIProps {
  backend: ChatBackend;
}

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatUI({ backend }: ChatUIProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // add user message
    const userMsg: Msg = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);

    // get reply
    const reply = await backend.sendMessage(input);
    setMessages((prev) => [...prev, { id: reply.id, role: 'assistant', content: reply.content }]);

    setInput('');
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-lg ${
              m.role === 'user' ? 'bg-blue-100 self-end text-right' : 'bg-gray-100 self-start'
            }`}
          >
            <strong>{m.role === 'user' ? 'You' : 'Bot'}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="flex border-t pt-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
