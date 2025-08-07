// Available AI Models Configuration
export const AI_MODELS = [
  {
    id: 'google/gemma-3-4b',
    name: 'Google Gemma 3B',
    description: 'Google\'s efficient language model (Currently Loaded)',
    provider: 'Google',
    maxTokens: 8192,
    isDefault: true
  },
  {
    id: 'mistral/mistral-7b-instruct',
    name: 'Mistral 7B Instruct',
    description: 'Fast and efficient instruction-following model',
    provider: 'Mistral AI',
    maxTokens: 32768,
    isDefault: false
  },
  {
    id: 'meta/llama-3.1-8b-instruct',
    name: 'LLaMA 3.1 8B Instruct',
    description: 'Meta\'s powerful open-source model',
    provider: 'Meta',
    maxTokens: 128000,
    isDefault: false
  },
  {
    id: 'meta/code-llama-7b-instruct',
    name: 'Code Llama 7B',
    description: 'Specialized model for code generation and understanding',
    provider: 'Meta',
    maxTokens: 16384,
    isDefault: false
  },
  {
    id: 'openchat/openchat-3.5',
    name: 'OpenChat 3.5',
    description: 'Advanced conversational AI model',
    provider: 'OpenChat',
    maxTokens: 8192,
    isDefault: false
  }
];

// Fetch loaded models from LM Studio via backend
export const fetchLoadedModels = async () => {
  try {
    console.log('Fetching models from backend...');
    const response = await fetch('http://localhost:3001/api/models');
    const data = await response.json();
    console.log('Backend models response:', data);
    
    if (data.success && data.models.length > 0) {
      const loadedModels = data.models.map(model => ({
        ...model,
        isDefault: false
      }));

      // Set the first loaded model as default
      if (loadedModels.length > 0) {
        loadedModels[0].isDefault = true;
        console.log('Set default model:', loadedModels[0]);
      }

      console.log('Final loaded models:', loadedModels);
      return loadedModels;
    } else {
      console.warn('No models available from backend, using fallback');
      return AI_MODELS.filter(model => model.isDefault);
    }
  } catch (error) {
    console.error('Failed to fetch models from backend:', error);
    // Return fallback models if backend is not accessible
    console.warn('Using fallback models');
    return AI_MODELS.filter(model => model.isDefault);
  }
};

// Get the default model
export const getDefaultModel = () => {
  return AI_MODELS.find(model => model.isDefault) || AI_MODELS[0];
};

// Get a model by ID
export const getModelById = (id) => {
  return AI_MODELS.find(model => model.id === id) || getDefaultModel();
};

// Get all available models (static list)
export const getAllModels = () => {
  return AI_MODELS;
};

// Get models by provider
export const getModelsByProvider = (provider) => {
  return AI_MODELS.filter(model => model.provider === provider);
};
