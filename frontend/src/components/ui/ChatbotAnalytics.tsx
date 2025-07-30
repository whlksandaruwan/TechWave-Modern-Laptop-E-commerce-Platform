import { useState, useEffect } from 'react';

interface ChatAnalytics {
  totalChats: number;
  averageSessionLength: number;
  commonQueries: Array<{
    query: string;
    count: number;
  }>;
  userSatisfaction: number;
}

export const useChatbotAnalytics = () => {
  const [analytics, setAnalytics] = useState<ChatAnalytics>({
    totalChats: 0,
    averageSessionLength: 0,
    commonQueries: [],
    userSatisfaction: 0,
  });

  const trackChatStart = () => {
    const currentStats = JSON.parse(localStorage.getItem('chatbot_analytics') || '{}');
    const updatedStats = {
      ...currentStats,
      totalChats: (currentStats.totalChats || 0) + 1,
      lastChatStart: Date.now(),
    };
    localStorage.setItem('chatbot_analytics', JSON.stringify(updatedStats));
  };

  const trackQuery = (query: string) => {
    const currentStats = JSON.parse(localStorage.getItem('chatbot_analytics') || '{}');
    const queries = currentStats.queries || {};
    queries[query] = (queries[query] || 0) + 1;
    
    const updatedStats = {
      ...currentStats,
      queries,
    };
    localStorage.setItem('chatbot_analytics', JSON.stringify(updatedStats));
  };

  const trackSatisfaction = (rating: number) => {
    const currentStats = JSON.parse(localStorage.getItem('chatbot_analytics') || '{}');
    const ratings = currentStats.ratings || [];
    ratings.push(rating);
    
    const updatedStats = {
      ...currentStats,
      ratings,
    };
    localStorage.setItem('chatbot_analytics', JSON.stringify(updatedStats));
  };

  const getAnalytics = (): ChatAnalytics => {
    const stats = JSON.parse(localStorage.getItem('chatbot_analytics') || '{}');
    
    const commonQueries = Object.entries(stats.queries || {})
      .map(([query, count]) => ({ query, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const ratings = stats.ratings || [];
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
      : 0;

    return {
      totalChats: stats.totalChats || 0,
      averageSessionLength: 0, // Could be calculated based on session data
      commonQueries,
      userSatisfaction: averageRating,
    };
  };

  useEffect(() => {
    setAnalytics(getAnalytics());
  }, []);

  return {
    analytics,
    trackChatStart,
    trackQuery,
    trackSatisfaction,
    getAnalytics,
  };
};