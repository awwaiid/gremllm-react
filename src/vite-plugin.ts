import type { Plugin } from 'vite';
import { LLMService } from './llm-service.js';
import { ComponentCache } from './cache.js';
import type { GremllmConfig } from './types.js';

export interface GremllmPluginOptions extends GremllmConfig {
  enabled?: boolean;
}

export function gremllmPlugin(options: GremllmPluginOptions = {}): Plugin {
  const llmService = new LLMService(options);
  const cache = new ComponentCache(options.cacheDir);
  const enabled = options.enabled !== false; // Default to true

  return {
    name: 'gremllm',
    enforce: 'pre',

    async transform(code: string, id: string) {
      // Only process .tsx and .jsx files
      if (!id.match(/\\.(tsx|jsx)$/)) {
        return null;
      }

      // Skip if plugin is disabled (useful for production builds where you want pre-generated components)
      if (!enabled) {
        return null;
      }

      // Look for Gremllm components in the code
      const gremllmRegex = /<Gremllm\\s+prompt=["']([^"']+)["'][^>]*\\/>/g;
      let match;
      let transformedCode = code;
      let hasTransformations = false;

      // Track imports we need to add
      const importsToAdd = new Set<string>();

      while ((match = gremllmRegex.exec(code)) !== null) {
        const [fullMatch, prompt] = match;
        
        console.log(`[Gremllm] Found component with prompt: "${prompt}"`);
        
        try {
          // Generate hash for caching
          const hash = llmService.generateHash(prompt);
          
          // Check cache first
          let component = cache.get(hash);
          
          if (!component) {
            console.log(`[Gremllm] Generating new component for: "${prompt}"`);
            const result = await llmService.generateComponent(prompt);
            
            component = {
              code: result.code,
              hash,
              prompt,
              timestamp: Date.now()
            };
            
            // Cache the result
            cache.set(component);
          } else {
            console.log(`[Gremllm] Using cached component for: "${prompt}"`);
          }

          // Create a unique component name
          const componentName = `GremllmGenerated_${hash}`;
          
          // Wrap the generated code in a proper component
          const wrappedCode = `
const ${componentName} = React.memo(${component.code});
${componentName}.displayName = 'Gremllm(${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''})';`;

          // Replace the Gremllm tag with the generated component
          transformedCode = transformedCode.replace(fullMatch, `<${componentName} />`);
          
          // Add the component definition before the first export or at the top of the file
          const exportIndex = transformedCode.search(/^export/m);
          if (exportIndex !== -1) {
            transformedCode = transformedCode.slice(0, exportIndex) + 
                             wrappedCode + '\\n\\n' + 
                             transformedCode.slice(exportIndex);
          } else {
            transformedCode = wrappedCode + '\\n\\n' + transformedCode;
          }

          // Ensure React is imported
          importsToAdd.add('React');
          
          hasTransformations = true;
          
        } catch (error) {
          console.error(`[Gremllm] Failed to generate component for "${prompt}":`, error);
          
          // Replace with error component
          const errorComponentName = `GremllmError_${Date.now()}`;
          const errorComponent = `
const ${errorComponentName} = () => (
  <div style={{
    color: 'red',
    padding: '1rem',
    border: '1px solid red',
    borderRadius: '4px',
    margin: '0.5rem 0'
  }}>
    <strong>Gremllm Generation Error:</strong><br />
    Prompt: "${prompt}"<br />
    Error: ${error instanceof Error ? error.message : String(error)}
  </div>
);`;
          
          transformedCode = transformedCode.replace(fullMatch, `<${errorComponentName} />`);
          transformedCode = errorComponent + '\\n\\n' + transformedCode;
          
          importsToAdd.add('React');
          hasTransformations = true;
        }
      }

      if (!hasTransformations) {
        return null;
      }

      // Add React import if needed and not already present
      if (importsToAdd.has('React') && !transformedCode.includes('import React')) {
        transformedCode = "import React from 'react';\\n" + transformedCode;
      }

      return {
        code: transformedCode,
        map: null // TODO: Add source map support
      };
    },

    buildStart() {
      if (enabled) {
        console.log('[Gremllm] Plugin enabled - will generate components at build time');
      } else {
        console.log('[Gremllm] Plugin disabled - expecting pre-generated components');
      }
    }
  };
}