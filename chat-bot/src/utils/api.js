import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.userId = 'default-user'; // Default user ID
  }

  setUserId(userId) {
    this.userId = userId;
  }

  // Chat endpoints
  async sendMessage(sessionId, model, messages) {
    try {
      const response = await this.api.post('/chat', {
        sessionId,
        model,
        messages,
        userId: this.userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async getRecentChats() {
    try {
      const response = await this.api.get('/chats', {
        params: { userId: this.userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent chats:', error);
      throw error;
    }
  }

  async getChatById(chatId) {
    try {
      const response = await this.api.get(`/chat/${chatId}`, {
        params: { userId: this.userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chat:', error);
      throw error;
    }
  }

  async getChatHistory(sessionId) {
    try {
      const response = await this.api.get(`/history/${sessionId}`, {
        params: { userId: this.userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  }

  async createNewChat(sessionId) {
    try {
      const response = await this.api.post('/chat/new', {
        sessionId,
        userId: this.userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating new chat:', error);
      throw error;
    }
  }
}

export default new ApiService();
