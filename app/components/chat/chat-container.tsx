'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { Message } from '@/app/types/chat';

import { 
  generateResponse,   
  identifyPlatform,
  type ConversationContext 
} from '@/app/lib/chat-utils';

const INITIAL_MESSAGE: Message = {
  id: '1',
  content: "Hello! I'm your CDP Support Assistant. I can help you with questions about Segment, mParticle, Lytics, and Zeotap. How can I assist you today?",
  role: 'assistant',
  timestamp: new Date(),
};

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    platform: null,
    topic: null
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { response, updatedContext } = generateResponse(content, context);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setContext(updatedContext);
      
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-16rem)] sm:h-[700px] w-full flex-col rounded-2xl sm:rounded-2xl border bg-white/95 backdrop-blur-sm shadow-xl sm:shadow-2xl">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}