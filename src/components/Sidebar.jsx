import React from 'react';
import { HiMenu, HiX, HiPlus, HiClock, HiUser, HiSparkles } from 'react-icons/hi';

const Sidebar = ({ onNewChat, recentChats, currentChatId, onSelectChat, isDarkMode, isCollapsed, setIsCollapsed }) => {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarClass = `
    fixed top-0 left-0 z-40 w-80 h-full transition-all duration-300 ease-in-out
    ${isCollapsed ? '-translate-x-full md:-translate-x-full' : 'translate-x-0'}
    ${isDarkMode 
      ? 'bg-gray-900/95 border-gray-700' 
      : 'bg-white/95 border-gray-200'
    }
    backdrop-blur-xl border-r shadow-2xl flex flex-col
  `;

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-3 rounded-xl transition-all duration-300 shadow-lg ${
          isDarkMode
            ? 'bg-gray-800/90 hover:bg-gray-700 text-white border-gray-700'
            : 'bg-white/90 hover:bg-gray-50 text-gray-600 border-gray-200'
        } backdrop-blur-xl border`}
      >
        {isCollapsed ? <HiMenu size={20} /> : <HiX size={20} />}
      </button>

      {/* Sidebar */}
      <div className={sidebarClass}>
        {/* Header */}
        <div className={`p-6 border-b ${
          isDarkMode 
            ? 'border-gray-700 bg-gradient-to-r from-blue-900/20 to-purple-900/20' 
            : 'border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50'
        }`}>
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold flex items-center gap-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <HiSparkles className="text-blue-500" size={28} />
              AI Chat
            </h1>
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <HiX size={20} />
            </button>
          </div>
          <p className={`text-sm mt-2 opacity-80 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Powered by LM Studio
          </p>
        </div>

        {/* New Chat Button */}
        <div className="p-6">
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) setIsCollapsed(true);
            }}
            className="w-full flex items-center gap-3 px-6 py-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            <HiPlus size={20} />
            New Conversation
          </button>
        </div>

        {/* Recent Chats */}
        <div className="flex-1 px-6 overflow-hidden">
          <div className={`flex items-center gap-2 text-sm px-2 py-3 mb-4 border-b ${
            isDarkMode 
              ? 'text-gray-300 border-gray-700' 
              : 'text-gray-600 border-gray-200'
          }`}>
            <HiClock size={18} className="text-blue-500" />
            <span className="font-medium">Recent Conversations</span>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-full custom-scrollbar">
            {recentChats.length === 0 ? (
              <div className={`text-sm text-center py-8 opacity-60 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No conversations yet.<br />Start your first chat!
              </div>
            ) : (
              recentChats.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => {
                    onSelectChat(chat._id);
                    if (window.innerWidth < 768) setIsCollapsed(true);
                  }}
                  className={`
                    w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-300
                    truncate overflow-hidden whitespace-nowrap font-medium border
                    ${currentChatId === chat._id 
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border-blue-500/50 shadow-lg' 
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-800 border-transparent hover:border-gray-700'
                        : 'text-gray-700 hover:bg-gray-100 border-transparent hover:border-gray-300'
                    }
                    backdrop-blur-sm
                  `}
                  title={chat.title || 'Untitled Chat'}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      currentChatId === chat._id ? 'bg-blue-400' : isDarkMode ? 'bg-gray-500' : 'bg-gray-400'
                    }`}></div>
                    {chat.title || 'Untitled Chat'}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className={`p-6 border-t backdrop-blur-sm ${
          isDarkMode 
            ? 'border-gray-700 bg-gray-800/50' 
            : 'border-gray-200 bg-gray-50/50'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              <HiUser size={20} />
            </div>
            <div>
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>User</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Free Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
        }
      `}</style>
    </>
  );
};

export default Sidebar;
