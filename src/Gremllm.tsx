import React from 'react';

export interface GremllmProps {
  prompt: string;
  fallback?: React.ReactNode;
  [key: string]: unknown; // Allow additional props to be passed through
}

/**
 * Gremllm React Component
 * 
 * This component gets replaced at build time with LLM-generated components.
 * In development or when the plugin is disabled, it shows a placeholder.
 * 
 * @param prompt - The prompt describing what component to generate
 * @param fallback - Optional fallback content to show if generation fails
 */
export const Gremllm: React.FC<GremllmProps> = ({ prompt, fallback, ...props }) => {
  // This component should be replaced at build time by the Vite plugin
  // If we're seeing this, it means the plugin isn't running or failed
  
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        style={{
          border: '2px dashed #646cff',
          borderRadius: '8px',
          padding: '1rem',
          margin: '0.5rem 0',
          backgroundColor: '#f9f9f9',
          color: '#333',
          fontFamily: 'monospace'
        }}
        {...props}
      >
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          🧬 Gremllm Component (Build Time)
        </div>
        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          <strong>Prompt:</strong> "{prompt}"
        </div>
        <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.6 }}>
          This will be replaced with generated code at build time
        </div>
      </div>
    );
  }

  // In production, if we reach here, something went wrong
  return fallback || (
    <div 
      style={{
        border: '1px solid #ff6b6b',
        borderRadius: '4px',
        padding: '0.5rem',
        backgroundColor: '#ffe0e0',
        color: '#d63031'
      }}
      {...props}
    >
      ⚠️ Gremllm component not generated: "{prompt}"
    </div>
  );
};

export default Gremllm;