import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'assistant']
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'default-user' // For now, until we add authentication
  },
  sessionId: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true,
    default: 'google/gemma-3-4b'
  },
  title: {
    type: String,
    default: ''
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for user-based queries
chatSchema.index({ userId: 1, updatedAt: -1 });
chatSchema.index({ userId: 1, sessionId: 1 }, { unique: true });

// Update the updatedAt field on save
chatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Generate title from first user message if not set
  if (!this.title && this.messages.length > 0) {
    const firstUserMessage = this.messages.find(msg => msg.role === 'user');
    if (firstUserMessage) {
      this.title = firstUserMessage.content.length > 50 
        ? firstUserMessage.content.substring(0, 50) + '...'
        : firstUserMessage.content;
    }
  }
  
  next();
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
