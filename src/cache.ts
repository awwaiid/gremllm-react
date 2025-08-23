import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import type { GeneratedComponent } from './types.js';

export class ComponentCache {
  private cacheDir: string;

  constructor(cacheDir: string = '.gremllm-cache') {
    this.cacheDir = cacheDir;
    this.ensureCacheDir();
  }

  private ensureCacheDir(): void {
    if (!existsSync(this.cacheDir)) {
      mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  get(hash: string): GeneratedComponent | null {
    const cachePath = join(this.cacheDir, `${hash}.json`);
    
    if (!existsSync(cachePath)) {
      return null;
    }

    try {
      const cached = JSON.parse(readFileSync(cachePath, 'utf-8'));
      return cached;
    } catch {
      return null;
    }
  }

  set(component: GeneratedComponent): void {
    const cachePath = join(this.cacheDir, `${component.hash}.json`);
    writeFileSync(cachePath, JSON.stringify(component, null, 2));
  }

  has(hash: string): boolean {
    return existsSync(join(this.cacheDir, `${hash}.json`));
  }
}