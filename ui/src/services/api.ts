import axios from 'axios';
import { NewsArticle } from '../types/news';
import { API_URL } from '../constants';

export const fetchNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news articles');
  }
}; 