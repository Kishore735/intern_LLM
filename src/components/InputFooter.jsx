import React, { useState, useEffect } from 'react';
import { HiPaperAirplane, HiChevronDown } from 'react-icons/hi';
import { fetchLoadedModels, getDefaultModel } from '../models';

const InputFooter = ({ onSendMessage, isLoading, isDarkMode, isSidebarCollapsed }) => {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState(getDefaultModel());
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(true);

  // Load models from LM Studio on component mount
  useEffect(() => {
    const loadModels = async () => {
      setModelsLoading(true);
      try {
        const loadedModels = await fetchLoadedModels();
        setAvailableModels(loadedModels);
        
        // Set the first loaded model as selected
        if (loadedModels.length > 0) {
          const defaultModel = loadedModels.find(m => m.isDefault) || loadedModels[0];
          setSelectedModel(defaultModel);
        }
      } catch (error) {
        console.error('Failed to load models:', error);
        // Fallback to default model
        setAvailableModels([getDefaultModel()]);
        setSelectedModel(getDefaultModel());
      } finally {
        setModelsLoading(false);
      }
    };

    loadModels();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim(), selectedModel);
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const selectModel = (model) => {
    setSelectedModel(model);
    setIsModelDropdownOpen(false);
  };

  return (
    <div className={`
      border-t p-4 transition-all duration-300 ease-in-out
      ${isDarkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
      }
      ${isSidebarCollapsed ? 'ml-0' : 'md:ml-80 ml-0'}
    `}>
      <div className="max-w-4xl mx-auto">
        {/* Model Selection */}
        <div className="relative mb-3">
          <button
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            disabled={modelsLoading}
            className={`
              w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 
              rounded-lg text-sm font-medium transition-colors border
              ${isDarkMode
                ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }
              ${modelsLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${modelsLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'}`}></div>
              <span className="truncate">
                {modelsLoading ? 'Loading models...' : selectedModel.name}
              </span>
            </div>
            <HiChevronDown 
              size={16} 
              className={`transition-transform ${isModelDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {isModelDropdownOpen && !modelsLoading && (
            <div className={`
              absolute bottom-full left-0 right-0 sm:right-auto sm:w-80 mb-2 
              rounded-lg shadow-xl border z-50 max-h-64 overflow-y-auto
              ${isDarkMode
                ? 'bg-gray-800 border-gray-600'
                : 'bg-white border-gray-200'
              }
            `}>
              {availableModels.length === 0 ? (
                <div className={`p-3 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No models loaded in LM Studio
                </div>
              ) : (
                availableModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => selectModel(model)}
                    className={`
                      w-full text-left p-3 hover:bg-opacity-80 transition-colors
                      ${selectedModel.id === model.id 
                        ? 'bg-blue-500 text-white' 
                        : isDarkMode
                          ? 'hover:bg-gray-700 text-gray-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-2 h-2 rounded-full
                        ${selectedModel.id === model.id ? 'bg-white' : 'bg-green-500'}
                      `}></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{model.name}</div>
                        <div className={`
                          text-xs truncate
                          ${selectedModel.id === model.id 
                            ? 'text-blue-100' 
                            : isDarkMode 
                              ? 'text-gray-400' 
                              : 'text-gray-500'
                          }
                        `}>
                          {model.description}
                        </div>
                        <div className={`
                          text-xs mt-1 flex items-center gap-2
                          ${selectedModel.id === model.id 
                            ? 'text-blue-100' 
                            : isDarkMode 
                              ? 'text-gray-400' 
                              : 'text-gray-500'
                          }
                        `}>
                          <span>by {model.provider}</span>
                          <span>•</span>
                          <span>{model.maxTokens.toLocaleString()} tokens</span>
                          <span>•</span>
                          <span className="text-green-500 font-medium">Loaded</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Shift+Enter for new line)"
              disabled={isLoading}
              rows={1}
              className={`
                w-full px-4 py-3 pr-12 rounded-xl border resize-none
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 min-h-[48px] max-h-32 
                ${isDarkMode
                  ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDarkMode ? '#374151 transparent' : '#d1d5db transparent'
              }}
            />
            
            {/* Character count */}
            <div className={`
              absolute bottom-1 right-12 text-xs
              ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
            `}>
              {inputText.length}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`
              px-4 py-3 rounded-xl font-medium transition-all duration-200 
              flex items-center justify-center min-w-[48px] h-[48px]
              ${!inputText.trim() || isLoading
                ? isDarkMode
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg'
              }
            `}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <HiPaperAirplane size={20} className="transform rotate-45" />
            )}
          </button>
        </form>

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setInputText("Explain quantum computing in simple terms")}
            disabled={isLoading}
            className={`
              px-3 py-1.5 text-xs rounded-full transition-colors border
              ${isDarkMode
                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            💡 Explain concept
          </button>
          <button
            onClick={() => setInputText("Write a creative story about")}
            disabled={isLoading}
            className={`
              px-3 py-1.5 text-xs rounded-full transition-colors border
              ${isDarkMode
                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            📝 Write story
          </button>
          <button
            onClick={() => setInputText("Help me debug this code:")}
            disabled={isLoading}
            className={`
              px-3 py-1.5 text-xs rounded-full transition-colors border
              ${isDarkMode
                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            🐛 Debug code
          </button>
        </div>

        {/* Status Info */}
        <div className={`
          mt-2 text-xs flex items-center justify-between
          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
        `}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span>Connected to {selectedModel.name}</span>
          </div>
          <div className="hidden sm:block">
            Press Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputFooter;
