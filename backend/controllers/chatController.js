import axios from 'axios';
import Chat from '../models/Chat.js';

class ChatController {
  // Get available models from LM Studio
  async getAvailableModels(req, res) {
    try {
      console.log('Fetching available models from LM Studio...');
      
      const lmStudioResponse = await axios.get('http://localhost:1234/v1/models', {
        timeout: 5000
      });

      // Filter out embedding models
      const availableModels = lmStudioResponse.data.data
        .filter(model => !model.id.includes('embedding'))
        .map(model => ({
          id: model.id,
          name: model.id.split('/').pop() || model.id,
          description: 'Available in LM Studio',
          provider: model.id.split('/')[0] || 'Unknown',
          maxTokens: 8192,
          isLoaded: true
        }));

      console.log('Available models:', availableModels);

      res.json({
        success: true,
        models: availableModels
      });

    } catch (error) {
      console.error('Error fetching models from LM Studio:', error);
      
      res.status(500).json({
        success: false,
        error: 'Unable to fetch models from LM Studio',
        models: []
      });
    }
  }

  // Send message to LM Studio and save chat
  async sendMessage(req, res) {
    try {
      const { sessionId, model, messages, userId = 'default-user' } = req.body;

      if (!sessionId || !model || !messages) {
        return res.status(400).json({
          success: false,
          error: 'sessionId, model, and messages are required'
        });
      }

      // Prepare the payload for LM Studio with correct model identifier
      const lmStudioPayload = {
        model: model, // Use the exact model name
        messages: messages,
        temperature: 0.7,
        max_tokens: -1,
        stream: false
      };

      console.log('Sending to LM Studio:', {
        url: process.env.LM_STUDIO_URL,
        model: model,
        messageCount: messages.length
      });

      // Send request to LM Studio
      const lmStudioResponse = await axios.post(
        process.env.LM_STUDIO_URL,
        lmStudioPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000 // 30 second timeout
        }
      );

      const assistantMessage = lmStudioResponse.data.choices[0].message.content;

      // Save or update chat in MongoDB with userId
      let chat = await Chat.findOne({ userId, sessionId });
      
      if (!chat) {
        // Create new chat
        chat = new Chat({
          userId,
          sessionId,
          model,
          messages: [
            ...messages,
            {
              role: 'assistant',
              content: assistantMessage,
              timestamp: new Date()
            }
          ]
        });
      } else {
        // Update existing chat
        chat.messages = [
          ...messages,
          {
            role: 'assistant',
            content: assistantMessage,
            timestamp: new Date()
          }
        ];
        chat.model = model;
      }

      await chat.save();

      res.json({
        success: true,
        message: assistantMessage,
        chatId: chat._id
      });

    } catch (error) {
      console.error('Error in sendMessage:', error);
      
      let errorMessage = 'An unexpected error occurred';
      
      if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Unable to connect to LM Studio. Please ensure LM Studio is running on localhost:1234';
      } else if (error.response) {
        errorMessage = `LM Studio API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`;
      } else if (error.request) {
        errorMessage = 'No response from LM Studio server';
      }

      res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }

  // Get recent chats for a specific user
  async getRecentChats(req, res) {
    try {
      const { userId = 'default-user' } = req.query;
      
      const chats = await Chat.find({ userId })
        .sort({ updatedAt: -1 })
        .limit(20)
        .select('_id sessionId title model createdAt updatedAt');

      res.json(chats);
    } catch (error) {
      console.error('Error fetching recent chats:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch recent chats'
      });
    }
  }

  // Get specific chat by ID
  async getChatById(req, res) {
    try {
      const { id } = req.params;
      const { userId = 'default-user' } = req.query;
      
      const chat = await Chat.findOne({ _id: id, userId });

      if (!chat) {
        return res.status(404).json({
          success: false,
          error: 'Chat not found'
        });
      }

      res.json(chat);
    } catch (error) {
      console.error('Error fetching chat:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch chat'
      });
    }
  }

  // Get chat history by session and user ID
  async getChatHistory(req, res) {
    try {
      const { sessionId } = req.params;
      const { userId = 'default-user' } = req.query;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: 'sessionId is required'
        });
      }

      const chat = await Chat.findOne({ userId, sessionId });
      
      if (!chat) {
        return res.json({
          success: true,
          messages: []
        });
      }

      res.json({
        success: true,
        messages: chat.messages,
        chatId: chat._id,
        model: chat.model
      });

    } catch (error) {
      console.error('Error fetching chat history:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch chat history'
      });
    }
  }

  // Create new chat
  async createNewChat(req, res) {
    try {
      const { sessionId, userId = 'default-user' } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: 'sessionId is required'
        });
      }

      const newChat = new Chat({
        userId,
        sessionId,
        model: 'mistral',
        messages: []
      });

      await newChat.save();

      res.json({
        success: true,
        chat: newChat
      });
    } catch (error) {
      console.error('Error creating new chat:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create new chat'
      });
    }
  }

  // Delete chat
  async deleteChat(req, res) {
    try {
      const { id } = req.params;
      const chat = await Chat.findByIdAndDelete(id);

      if (!chat) {
        return res.status(404).json({
          success: false,
          error: 'Chat not found'
        });
      }

      res.json({
        success: true,
        message: 'Chat deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting chat:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete chat'
      });
    }
  }
}

export default new ChatController();
