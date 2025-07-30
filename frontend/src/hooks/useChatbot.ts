import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  productLinks?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
}

export interface ChatbotState {
  messages: ChatMessage[];
  isTyping: boolean;
  isOpen: boolean;
  isMinimized: boolean;
}

export const useChatbot = () => {
  const [state, setState] = useState<ChatbotState>({
    messages: [],
    isTyping: false,
    isOpen: false,
    isMinimized: false,
  });

  const addMessage = useCallback((message: ChatMessage) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }, []);

  const setTyping = useCallback((isTyping: boolean) => {
    setState(prev => ({ ...prev, isTyping }));
  }, []);

  const openChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true, isMinimized: false }));
  }, []);

  const closeChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const toggleMinimize = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [] }));
  }, []);

  return {
    ...state,
    addMessage,
    setTyping,
    openChat,
    closeChat,
    toggleMinimize,
    clearMessages,
  };
};