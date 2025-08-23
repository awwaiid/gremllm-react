import { createHash } from 'node:crypto';
import type { 
  GremllmConfig, 
  LLMResponse, 
  OpenAIResponse, 
  AnthropicResponse 
} from './types.js';

export class LLMService {
  private config: GremllmConfig;

  constructor(config: GremllmConfig = {}) {
    this.config = {
      defaultProvider: 'openai',
      model: 'gpt-4o-mini',
      cacheDir: '.gremllm-cache',
      ...config
    };
    
    // Load from environment if not provided
    this.config.openaiApiKey = this.config.openaiApiKey || process.env.OPENAI_API_KEY;
    this.config.anthropicApiKey = this.config.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
  }

  async generateComponent(prompt: string): Promise<LLMResponse> {
    const provider = this.config.defaultProvider || 'openai';
    
    try {
      if (provider === 'openai' && this.config.openaiApiKey) {
        return await this.callOpenAI(prompt);
      } else if (provider === 'anthropic' && this.config.anthropicApiKey) {
        return await this.callAnthropic(prompt);
      } else {
        throw new Error(`No API key available for provider: ${provider}`);
      }
    } catch (error) {
      console.error(`[GremllmLLM] ${provider} API call failed:`, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  private async callOpenAI(prompt: string): Promise<LLMResponse> {
    const systemPrompt = this.getSystemPrompt();
    const userMessage = `Generate a React component for: ${prompt}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as OpenAIResponse;
    let code = data.choices[0].message.content.trim();
    
    // Clean up code blocks if present
    code = this.cleanupCode(code);
    
    return { code };
  }

  private async callAnthropic(prompt: string): Promise<LLMResponse> {
    const systemPrompt = this.getSystemPrompt();
    const userMessage = `Generate a React component for: ${prompt}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.config.anthropicApiKey!,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.config.model || 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as AnthropicResponse;
    let code = data.content[0].text.trim();
    
    // Clean up code blocks if present
    code = this.cleanupCode(code);
    
    return { code };
  }

  private getSystemPrompt(): string {
    return `You are a React component generator that creates production-ready components.

CRITICAL REQUIREMENTS:
1. Return ONLY a JavaScript arrow function expression (props) => { ... } that returns a React element - do NOT declare it as a const variable
2. Use JSX/TSX syntax with proper React patterns
3. Components should be functional, accessible, and well-styled
4. Use React hooks (useState, useEffect, etc.) when needed for interactivity
5. Include basic styling using inline styles or className props
6. Make components self-contained and reusable

EXAMPLE:
(props) => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Count: {count}
      </button>
    </div>
  );
}

Focus on creating useful, interactive components that fulfill the user's request.
Make sure the component is complete and functional without any external dependencies beyond React.`;
  }

  private cleanupCode(code: string): string {
    // Remove code block markers if present
    if (code.startsWith('```') && code.includes('\n')) {
      const lines = code.split('\n');
      code = lines.slice(1, -1).join('\n');
    }
    
    // Remove any extra whitespace
    return code.trim();
  }

  generateHash(prompt: string): string {
    return createHash('md5').update(prompt).digest('hex').substring(0, 8);
  }
}

export const llmService = new LLMService();