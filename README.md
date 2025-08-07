# Full-Stack AI Chatbot Application

A modern, responsive chatbot application built with React.js and Node.js, featuring AI integration through LM Studio and a sleek dark/light mode interface.

## 🚀 Features

- **Modern UI/UX**: Built with React.js and Tailwind CSS
- **Theme Support**: Dark and light mode with smooth transitions
- **Responsive Design**: Mobile-first design with adaptive sidebar
- **AI Integration**: Connect to LM Studio for intelligent conversations
- **Real-time Chat**: Dynamic conversation interface
- **Model Selection**: Choose from available AI models
- **Session Management**: Chat history with MongoDB storage
- **Cross-platform**: Works on Windows, macOS, and Linux

## 🏗️ Tech Stack

### Frontend
- **React.js** (v19.1.0) - UI framework
- **Vite** (v7.0.4) - Build tool and dev server
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **React Icons** - Icon library
- **Axios** - HTTP client for API calls
- **UUID** - Unique identifier generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v4.18.2) - Web framework
- **MongoDB** - Database with Mongoose ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### AI Integration
- **LM Studio** - Local AI model hosting
- **Dynamic Model Detection** - Automatic model discovery
- **Fallback Handling** - Graceful error handling

## 📁 Project Structure

```
chat-bot/
├── backend/                    # Node.js backend server
│   ├── controllers/           # API route controllers
│   │   └── chatController.js  # Chat and model management
│   ├── models/               # MongoDB data models
│   │   └── Chat.js           # Chat session schema
│   ├── routes/               # API routes
│   │   └── chatRoutes.js     # Chat endpoints
│   ├── .env                  # Environment variables
│   ├── package.json          # Backend dependencies
│   └── server.js             # Main server file
├── src/                      # React frontend source
│   ├── components/           # React components
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   ├── ChatArea.jsx      # Main chat interface
│   │   └── InputFooter.jsx   # Input and model selection
│   ├── config/               # Configuration files
│   │   └── models.js         # AI model configuration
│   ├── App.jsx               # Main application component
│   ├── App.css               # Application styles
│   ├── index.css             # Global styles and Tailwind imports
│   └── main.jsx              # Application entry point
├── public/                   # Static assets
├── package.json              # Frontend dependencies
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.js            # Vite build configuration
├── start.bat                 # Windows startup script
├── start.sh                  # Unix startup script
└── README.md                 # This file
```

## 🛠️ Prerequisites

Before running this application, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **MongoDB** (local or cloud instance)
   - Local: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Cloud: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)

4. **LM Studio** (for AI functionality)
   - Download from [lmstudio.ai](https://lmstudio.ai/)
   - Install and download at least one language model
   - Configure to run on `localhost:1234` (default)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd chat-bot
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/chatbot
# For MongoDB Atlas, use: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/chatbot

# Server Configuration
PORT=3001
NODE_ENV=development

# LM Studio Configuration
LM_STUDIO_URL=http://localhost:1234
```

### 5. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: `net start MongoDB`
   - **macOS**: `brew services start mongodb/brew/mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Get connection string and update `MONGODB_URI` in `.env`
4. Whitelist your IP address in Atlas dashboard

### 6. LM Studio Setup

1. **Download and Install LM Studio**
   - Visit [lmstudio.ai](https://lmstudio.ai/) and download
   - Install the application

2. **Download AI Models**
   - Open LM Studio
   - Browse and download models (recommended: Gemma, Llama, or similar)
   - Popular choices: `microsoft/DialoGPT-medium`, `huggingface/CodeBERTa-small-v1`

3. **Configure Server**
   - In LM Studio, go to "Local Server" tab
   - Set port to `1234` (default)
   - Enable CORS for `http://localhost:3001`
   - Load your preferred model
   - Start the server

## 🚀 Running the Application

### Method 1: Using Startup Scripts (Recommended)

#### Windows
```bash
# Run the Windows startup script
start.bat
```

#### macOS/Linux
```bash
# Make script executable and run
chmod +x start.sh
./start.sh
```

### Method 2: Manual Startup

#### Terminal 1 - Backend Server
```bash
cd backend
npm start
```
The backend will start on `http://localhost:3001`

#### Terminal 2 - Frontend Development Server
```bash
# In the root directory (chat-bot)
npm run dev
```
The frontend will start on `http://localhost:5173`

### Method 3: Production Build

```bash
# Build the frontend
npm run build

# Preview the production build
npm run preview
```

## 🌐 Accessing the Application

1. **Frontend**: Open your browser and navigate to `http://localhost:5173`
2. **Backend API**: Available at `http://localhost:3001`
3. **Health Check**: Visit `http://localhost:3001/health` to verify backend status

## 🎮 Usage

### Starting a Conversation
1. Open the application in your browser
2. Ensure LM Studio is running with a loaded model
3. Select an AI model from the dropdown (if available)
4. Type your message in the input field
5. Press Enter or click Send to start chatting

### Features Guide
- **Theme Toggle**: Click the theme icon in the sidebar to switch between dark/light modes
- **Sidebar Navigation**: Access different chat sessions and settings
- **Model Selection**: Choose from available LM Studio models in the input footer
- **Responsive Design**: The interface adapts to different screen sizes
- **Chat History**: Previous conversations are stored and can be accessed

## 🔧 Configuration

### Frontend Configuration

#### Tailwind CSS (`tailwind.config.js`)
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: []
}
```

#### Vite Configuration (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
```

### Backend Configuration

#### Server Settings (`server.js`)
- **Port**: 3001 (configurable via environment)
- **CORS**: Enabled for frontend ports
- **MongoDB**: Auto-connection with retry logic
- **Health Endpoint**: `/health` for status monitoring

#### API Endpoints
- `GET /health` - Server health check
- `GET /api/models` - Available AI models
- `POST /api/chat` - Send chat message
- `GET /api/chat/history` - Chat history

## 🐛 Troubleshooting

### Common Issues

#### 1. Frontend Not Loading/Blank Page
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 2. Tailwind CSS Not Working
```bash
# Rebuild Tailwind
npm run build
# Or restart dev server
npm run dev
```

#### 3. Backend Connection Error
- Verify MongoDB is running
- Check `.env` configuration
- Ensure port 3001 is not in use
- Check MongoDB URI format

#### 4. LM Studio Connection Failed
- Ensure LM Studio is running on port 1234
- Load a model in LM Studio
- Enable CORS in LM Studio settings
- Check firewall/antivirus settings

#### 5. Model Selection Not Working
```bash
# Test LM Studio endpoint
curl http://localhost:1234/v1/models

# Check backend proxy
curl http://localhost:3001/api/models
```

#### 6. MongoDB Connection Issues
```bash
# Test MongoDB connection
cd backend
node test-mongodb.js
```

### Debug Mode

Enable detailed logging by setting environment variables:

```bash
# In backend/.env
NODE_ENV=development
DEBUG=true

# Run with verbose logging
npm run dev
```

### Performance Issues

1. **Large Bundle Size**
   ```bash
   # Analyze bundle
   npm run build
   npx vite-bundle-analyzer dist
   ```

2. **Slow API Responses**
   - Check LM Studio model size
   - Monitor MongoDB query performance
   - Review network configuration

## 📝 API Documentation

### Chat Endpoints

#### Send Message
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Hello, how are you?",
  "model": "gemma-2b-it"
}
```

#### Get Available Models
```http
GET /api/models
```

#### Health Check
```http
GET /health
```

### Response Format
```json
{
  "success": true,
  "data": {
    "response": "AI response message",
    "model": "used-model-name"
  }
}
```

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env` files
- **CORS Configuration**: Restrict to necessary origins in production
- **Input Validation**: Implement on both frontend and backend
- **Rate Limiting**: Consider implementing for production use
- **Model Access**: Secure LM Studio endpoint in production

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
# Build for production
npm run build

# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment (Heroku/Railway)
```bash
# Ensure environment variables are set
# Deploy the 'backend' folder to your hosting service
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=<production-mongodb-url>
PORT=3001
LM_STUDIO_URL=<production-lm-studio-url>
CORS_ORIGIN=<frontend-production-url>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LM Studio](https://lmstudio.ai/) for local AI model hosting
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React.js](https://reactjs.org/) for the UI framework
- [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) for the backend
- [MongoDB](https://www.mongodb.com/) for data storage

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed correctly
3. Ensure LM Studio is running with a loaded model
4. Check that MongoDB is accessible
5. Review the console for error messages

For additional support, please check the project's issue tracker or create a new issue with detailed information about your problem.

---
