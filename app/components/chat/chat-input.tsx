'use client';

import { SendHorizontal } from 'lucide-react';
import { useRef, useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 border-t bg-white p-3 sm:p-4">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about CDP platforms..."
        className="min-h-[45px] sm:min-h-[60px] w-full resize-none rounded-md border border-gray-300 p-2 text-sm sm:text-base focus:border-blue-500 focus:outline-none"
        maxLength={1000}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !input.trim()}
        className="h-[45px] w-[45px] sm:h-[60px] sm:w-[60px] rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
      >
        <SendHorizontal className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}