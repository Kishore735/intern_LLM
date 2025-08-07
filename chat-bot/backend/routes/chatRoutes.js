import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

// Chat routes
router.post('/chat', chatController.sendMessage);
router.get('/models', chatController.getAvailableModels); // Add this new route
router.get('/chats', chatController.getRecentChats);
router.get('/chat/:id', chatController.getChatById);
router.get('/history/:sessionId', chatController.getChatHistory);
router.post('/chat/new', chatController.createNewChat);
router.delete('/chat/:id', chatController.deleteChat);

export default router;
