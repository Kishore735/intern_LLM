// Available AI Models Configuration
// Add new models here and they will automatically appear in the frontend

export const AI_MODELS = [
  {
    id: 'google/gemma-3-4b',
    name: 'Google Gemma 3B',
    description: 'Fast and efficient model for general conversations',
    icon: '🧠',
    provider: 'Google',
    maxTokens: 4096,
    isDefault: true
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    description: 'Powerful model for complex reasoning',
    icon: '⚡',
    provider: 'Mistral AI',
    maxTokens: 8192,
    isDefault: false
  },
  {
    id: 'llama-2-7b',
    name: 'LLaMA 2 7B',
    description: 'Meta\'s advanced language model',
    icon: '🦙',
    provider: 'Meta',
    maxTokens: 4096,
    isDefault: false
  },
  {
    id: 'codellama-7b',
    name: 'Code Llama 7B',
    description: 'Specialized for code generation and programming',
    icon: '💻',
    provider: 'Meta',
    maxTokens: 4096,
    isDefault: false
  },
  {
    id: 'openchat-7b',
    name: 'OpenChat 7B',
    description: 'Open-source conversational AI',
    icon: '💬',
    provider: 'OpenChat',
    maxTokens: 4096,
    isDefault: false
  }
];

// Get default model
export const getDefaultModel = () => {
  return AI_MODELS.find(model => model.isDefault) || AI_MODELS[0];
};

// Get model by ID
export const getModelById = (id) => {
  return AI_MODELS.find(model => model.id === id);
};

// Get all available models
export const getAllModels = () => {
  return AI_MODELS;
};
