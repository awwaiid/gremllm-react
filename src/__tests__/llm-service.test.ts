import { describe, it, expect } from 'vitest';
import { LLMService } from '../llm-service';

describe('LLMService', () => {
  it('should generate a consistent hash for the same prompt', () => {
    const llmService = new LLMService();
    const prompt = 'A simple calculator';
    
    const hash1 = llmService.generateHash(prompt);
    const hash2 = llmService.generateHash(prompt);
    
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(8);
  });

  it('should generate different hashes for different prompts', () => {
    const llmService = new LLMService();
    
    const hash1 = llmService.generateHash('A simple calculator');
    const hash2 = llmService.generateHash('A todo list');
    
    expect(hash1).not.toBe(hash2);
  });

  it('should create service with default config', () => {
    const llmService = new LLMService();
    expect(llmService).toBeInstanceOf(LLMService);
  });

  it('should create service with custom config', () => {
    const llmService = new LLMService({
      defaultProvider: 'anthropic',
      model: 'claude-3-5-sonnet-20241022',
      cacheDir: 'custom-cache'
    });
    expect(llmService).toBeInstanceOf(LLMService);
  });
});