export interface GremllmConfig {
  openaiApiKey?: string;
  anthropicApiKey?: string;
  defaultProvider?: 'openai' | 'anthropic';
  model?: string;
  cacheDir?: string;
}

export interface GeneratedComponent {
  code: string;
  hash: string;
  prompt: string;
  timestamp: number;
}

export interface LLMResponse {
  code: string;
}

export interface OpenAIMessage {
  content: string;
}

export interface OpenAIChoice {
  message: OpenAIMessage;
}

export interface OpenAIResponse {
  choices: OpenAIChoice[];
}

export interface AnthropicContent {
  text: string;
}

export interface AnthropicResponse {
  content: AnthropicContent[];
}