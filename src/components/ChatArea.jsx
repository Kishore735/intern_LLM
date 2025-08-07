import React, { useRef, useEffect } from 'react';
import { HiSparkles, HiUser } from 'react-icons/hi';

const ChatArea = ({ messages, isLoading, isDarkMode }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={`flex-1 overflow-y-auto relative ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="relative z-10 p-6 flex flex-col gap-6 min-h-full">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-2xl animate-pulse">
              <HiSparkles size={32} />
            </div>
            <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
              Welcome to AI Chat
            </h2>
            <p className={`max-w-md leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience the power of AI conversation. Ask anything, explore ideas, or get help with your tasks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <div className={`px-4 py-2 backdrop-blur-sm border rounded-full text-sm ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-gray-300' 
                  : 'bg-white/50 border-gray-200 text-gray-600'
              }`}>
                💡 Ask questions
              </div>
              <div className={`px-4 py-2 backdrop-blur-sm border rounded-full text-sm ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-gray-300' 
                  : 'bg-white/50 border-gray-200 text-gray-600'
              }`}>
                🚀 Get creative
              </div>
              <div className={`px-4 py-2 backdrop-blur-sm border rounded-full text-sm ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 text-gray-300' 
                  : 'bg-white/50 border-gray-200 text-gray-600'
              }`}>
                📝 Write content
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`flex items-start gap-4 max-w-4xl ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg
                    ${message.role === 'user' 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                      : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                    }
                  `}>
                    {message.role === 'user' ? (
                      <HiUser size={18} className="text-white" />
                    ) : (
                      <HiSparkles size={18} className="text-white" />
                    )}
                  </div>
                  
                  {/* Message bubble */}
                  <div className={`
                    max-w-2xl rounded-2xl p-4 shadow-lg border
                    ${message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500/30' 
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-100 border-gray-700'
                        : 'bg-white text-gray-900 border-gray-200'
                    }
                  `}>
                    <div className="whitespace-pre-wrap break-words leading-relaxed">
                      {message.content}
                    </div>
                    {message.timestamp && (
                      <div className="text-xs opacity-60 mt-2 flex items-center gap-1">
                        <div className="w-1 h-1 bg-current rounded-full"></div>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start gap-4 max-w-4xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <HiSparkles size={18} className="text-white animate-pulse" />
                  </div>
                  <div className={`max-w-2xl rounded-2xl p-4 shadow-lg border ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      <span className={`text-sm ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
