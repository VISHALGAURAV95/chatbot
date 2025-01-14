'use client';

import { Message } from '@/app/types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  const formatMessageContent = (content: string) => {
    if (!content.includes('\n')) {
      return <p>{content}</p>;
    }

    const lines = content.split('\n');
    const formattedContent: JSX.Element[] = [];
    let skipUntilNextNonStep = false;

    lines.forEach((line, index) => {
      if (skipUntilNextNonStep) {
        if (!line.match(/^\d+\./)) {
          skipUntilNextNonStep = false;
        } else {
          return;
        }
      }

      if (line.trim().startsWith('1.') || line.match(/^\d+\./)) {
        const steps = lines
          .slice(index)
          .filter(l => l.match(/^\d+\./))
          .map(step => step.replace(/^\d+\.\s*/, '').trim());

        formattedContent.push(
          <ul key={`steps-${index}`} className="chat-message-steps">
            {steps.map((step, stepIndex) => (
              <li key={stepIndex}>{step}</li>
            ))}
          </ul>
        );
        skipUntilNextNonStep = true;
      } else if (line.trim() && !line.match(/^\d+\./)) {
        formattedContent.push(
          <p key={`text-${index}`} className="mb-2 text-sm sm:text-base">{line}</p>
        );
      }
    });

    return formattedContent;
  };

  return (
    <div
      className={`flex w-full gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-colors ${
        isAssistant 
          ? 'bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm shadow-sm' 
          : 'bg-gradient-to-r from-indigo-50/90 to-white/90'
      }`}
    >
      <div className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 select-none items-center justify-center rounded-lg shadow-sm ${
        isAssistant 
          ? 'bg-gradient-to-br from-indigo-100 to-white border-indigo-100' 
          : 'bg-gradient-to-br from-white to-indigo-50 border-white'
      }`}>
        {isAssistant ? (
          <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600" />
        ) : (
          <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
        )}
      </div>
      <div className="flex-1 space-y-1 sm:space-y-2">
        <p className={`text-xs sm:text-sm font-medium ${
          isAssistant ? 'text-indigo-600' : 'text-gray-600'
        }`}>
          {isAssistant ? 'CDP Assistant' : 'You'}
        </p>
        <div className="prose prose-sm max-w-none">
          {formatMessageContent(message.content)}
        </div>
      </div>
    </div>
  );
}