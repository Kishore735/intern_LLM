import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HiSun, HiMoon } from 'react-icons/hi';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import InputFooter from './components/InputFooter';
import ApiService from './utils/api';
import { getDefaultModel, getAllModels } from './models';
import './App.css';

function App() {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [selectedModel, setSelectedModel] = useState(getDefaultModel().id);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => uuidv4());
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Load recent chats on component mount
  useEffect(() => {
    loadRecentChats();
  }, []);

  const loadRecentChats = async () => {
    try {
      const chats = await ApiService.getRecentChats();
      setRecentChats(chats);
    } catch (error) {
      console.error('Failed to load recent chats:', error);
    }
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setSessionId(uuidv4());
  };

  const handleSelectChat = async (chatId) => {
    try {
      const chat = await ApiService.getChatById(chatId);
      setCurrentChatId(chatId);
      setMessages(chat.messages || []);
      setSelectedModel(chat.model || 'mistral');
      setSessionId(chat.sessionId);
    } catch (error) {
      console.error('Failed to load chat:', error);
    }
  };

  const handleSendMessage = async (messageContent, selectedModelObj = null) => {
    if (!messageContent.trim() || isLoading) return;

    // Use the selected model from the parameter if provided, otherwise use the state
    const modelToUse = selectedModelObj ? selectedModelObj.id : selectedModel;

    console.log('Sending message:', messageContent);
    console.log('Current model:', modelToUse);
    console.log('Session ID:', sessionId);

    const userMessage = {
      role: 'user',
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      console.log('Calling API with:', { sessionId, model: modelToUse, messages: newMessages });
      const response = await ApiService.sendMessage(sessionId, modelToUse, newMessages);
      console.log('API Response:', response);
      
      if (response.success) {
        const assistantMessage = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString(),
        };
        
        setMessages([...newMessages, assistantMessage]);
        
        // Update current chat ID if it's a new chat
        if (!currentChatId && response.chatId) {
          setCurrentChatId(response.chatId);
        }
        
        // Refresh recent chats
        loadRecentChats();
      } else {
        throw new Error(response.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your message. Please make sure the LM Studio server is running on localhost:1234.',
        timestamp: new Date().toISOString(),
      };
      
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
            : 'bg-white hover:bg-gray-100 text-gray-600 shadow-lg border'
        }`}
      >
        {isDarkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
      </button>

      <Sidebar
        onNewChat={handleNewChat}
        recentChats={recentChats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        isDarkMode={isDarkMode}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-0' : 'md:ml-80'
      }`}>
        <ChatArea 
          messages={messages} 
          isLoading={isLoading} 
          isDarkMode={isDarkMode}
        />
        <InputFooter
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </div>
    </div>
  );
}

export default App;
