'use client';

import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSOWStore } from '@/stores/sow-store';
import { Send, Loader2, Bot } from 'lucide-react';
import { SlashCommandMenu } from './slash-command-menu';
import { AIModelSelector } from '@/components/ui/ai-model-selector';

interface ChatInputProps {
  mode?: 'plan' | 'build';
}

export function ChatInput({ mode }: ChatInputProps) {
  const { sendMessage } = useSOWStore();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadSelectedModel();
  }, []);

  const loadSelectedModel = async () => {
    try {
      const response = await fetch('/api/settings/selectedModel');
      if (response.ok) {
        const data = await response.json();
        if (data.model) {
          setSelectedModel(data.model);
          console.log('Loaded saved model:', data.model);
        }
      }
    } catch (error) {
      console.error('Failed to load selected model:', error);
    }
  };

  const saveSelectedModel = async (modelId: string) => {
    try {
      const response = await fetch('/api/settings/selectedModel', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: modelId }),
      });
      if (response.ok) {
        setSelectedModel(modelId);
        setShowModelSelector(false);
        console.log('Model saved successfully:', modelId);
      }
    } catch (error) {
      console.error('Failed to save selected model:', error);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(message);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = '36px';
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);

    // Show slash menu when user types '/' at start or after space
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = newValue.substring(0, cursorPosition);
    const lastWord = textBeforeCursor.split(/\s+/).pop() || '';
    
    setShowSlashMenu(lastWord.startsWith('/') && lastWord.length > 0);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = '36px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, 36), 72)}px`;
    }
  };

  const handleSlashCommandSelect = (command: string) => {
    // Replace the current slash command with the selected one
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    const textBeforeCursor = message.substring(0, cursorPosition);
    const textAfterCursor = message.substring(cursorPosition);
    
    // Find the start of the current slash command
    const words = textBeforeCursor.split(/\s+/);
    const currentWord = words[words.length - 1];
    
    if (currentWord.startsWith('/')) {
      const beforeSlash = textBeforeCursor.substring(0, textBeforeCursor.length - currentWord.length);
      const newMessage = beforeSlash + command + ' ' + textAfterCursor;
      setMessage(newMessage);
      
      // Position cursor after the command
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPos = beforeSlash.length + command.length + 1;
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
          textareaRef.current.focus();
        }
      }, 0);
    }
    
    setShowSlashMenu(false);
  };

  const handleSlashMenuClose = () => {
    setShowSlashMenu(false);
  };

  return (
    <div>
      {/* Model Selector */}
      {showModelSelector && (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <AIModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onSave={() => saveSelectedModel(selectedModel)}
            showSaveButton={true}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowModelSelector(false)}
            className="mt-2 w-full"
          >
            Close
          </Button>
        </div>
      )}
      
      {/* Chat Input */}
      <div className="flex gap-2 items-end">
        <Button
          onClick={() => setShowModelSelector(!showModelSelector)}
          variant="outline"
          size="sm"
          className="h-[44px] px-3 rounded-lg bg-background border-2 border-input hover:bg-accent hover:border-emerald-400/50 transition-all duration-200"
          title="Select AI Model"
        >
          <Bot className="h-4 w-4" />
        </Button>
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="✨ Ask me about your project or say 'hi' to get started..."
            className="w-full resize-none rounded-lg border-2 bg-background backdrop-blur-sm px-4 py-3 pr-10 text-sm font-medium text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 hover:border-emerald-400/50 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:shadow-md"
            rows={1}
          style={{
            minHeight: '44px',
            maxHeight: '88px',
            lineHeight: '1.5',
            overflowY: message.split('\n').length > 2 ? 'auto' : 'hidden'
          }}
          disabled={isSending}
        />
        {message.trim() && (
          <div className="absolute bottom-2 right-2 opacity-50 hover:opacity-70 transition-opacity">
            <kbd className="px-2 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-md font-medium shadow-sm">Enter ↵</kbd>
          </div>
        )}
        <SlashCommandMenu
          isVisible={showSlashMenu}
          onSelect={handleSlashCommandSelect}
          onClose={handleSlashMenuClose}
          filter={message.split(/\s+/).pop()?.substring(1) || ''}
        />
        </div>
        <Button
          onClick={handleSend}
          disabled={!message.trim() || isSending}
          className="px-4 py-3 h-[44px] rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 disabled:opacity-50 disabled:hover:transform-none"
          size="sm"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
