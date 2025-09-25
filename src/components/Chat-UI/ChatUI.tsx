// src/components/Chat-UI/ChatUI.tsx
import React, { useState } from 'react';
import { ChatBackend, Message } from '../../types/chat';
import { MessageBubble } from './MessageBubble'; // named import (ensure matching export)
import { ArrowUpCircle } from 'lucide-react'; // or ArrowUpCircleIcon depending on package

interface ChatUIProps {
  backend: ChatBackend;
}

export default function ChatUI({ backend }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      createdAt: new Date().toISOString(),
    };

    // optimistic add
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
      const reply = await backend.sendMessage(input);
      // backend should return a Message (with createdAt)
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error('sendMessage failed:', err);
      // show an error message instead of wiping the UI
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Error: failed to get reply. Check console.',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500">No messages yet — say hi 👋</div>
        )}

        {messages.map((msg) => {
          if (typeof (MessageBubble as any) !== 'function') {
            return (
              <pre key={msg.id} className="bg-white p-2 rounded shadow">
                {JSON.stringify(msg, null, 2)}
              </pre>
            );
          }
          return <MessageBubble key={msg.id} message={msg} />;
        })}
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            placeholder="Type a message..."
            disabled={sending}
          />
          <button
            className={`p-2 rounded-full text-white ${
              sending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
            onClick={sendMessage}
            aria-label="Send"
            disabled={sending}
>
  <ArrowUpCircle className="w-5 h-5" />
</button>

        </div>
      </div>
    </div>
  );
}
