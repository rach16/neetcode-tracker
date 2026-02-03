import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Simple syntax highlighting for Python
  const highlightCode = (code: string): React.ReactElement[] => {
    const lines = code.split('\n');
    return lines.map((line, lineIndex) => {
      // Very basic Python syntax highlighting
      let highlightedLine = line;

      // Comments
      const commentIndex = line.indexOf('#');
      let commentPart = '';
      if (commentIndex !== -1) {
        commentPart = line.slice(commentIndex);
        highlightedLine = line.slice(0, commentIndex);
      }

      // Keywords
      const keywords = ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'try', 'except', 'finally', 'with', 'as', 'lambda', 'yield', 'break', 'continue', 'pass'];

      // Built-in functions
      const builtins = ['len', 'range', 'print', 'int', 'str', 'list', 'dict', 'set', 'tuple', 'sorted', 'reversed', 'enumerate', 'zip', 'map', 'filter', 'min', 'max', 'sum', 'abs', 'all', 'any', 'float', 'ord', 'chr'];

      const tokens: React.ReactElement[] = [];
      let remaining = highlightedLine;
      let tokenIndex = 0;

      while (remaining.length > 0) {
        let matched = false;

        // Check for strings
        const stringMatch = remaining.match(/^(["'])((?:\\.|[^\\])*?)\1/);
        if (stringMatch) {
          tokens.push(<span key={`${lineIndex}-${tokenIndex++}`} className="token-string">{stringMatch[0]}</span>);
          remaining = remaining.slice(stringMatch[0].length);
          matched = true;
          continue;
        }

        // Check for numbers
        const numberMatch = remaining.match(/^\d+\.?\d*/);
        if (numberMatch && (tokenIndex === 0 || /[\s\[\]\(\)\{\},:=+\-*/<>!]$/.test(highlightedLine.slice(0, highlightedLine.length - remaining.length)))) {
          tokens.push(<span key={`${lineIndex}-${tokenIndex++}`} className="token-number">{numberMatch[0]}</span>);
          remaining = remaining.slice(numberMatch[0].length);
          matched = true;
          continue;
        }

        // Check for keywords and builtins
        const wordMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
        if (wordMatch) {
          const word = wordMatch[0];
          if (keywords.includes(word)) {
            tokens.push(<span key={`${lineIndex}-${tokenIndex++}`} className="token-keyword">{word}</span>);
          } else if (builtins.includes(word)) {
            tokens.push(<span key={`${lineIndex}-${tokenIndex++}`} className="token-builtin">{word}</span>);
          } else {
            tokens.push(<span key={`${lineIndex}-${tokenIndex++}`}>{word}</span>);
          }
          remaining = remaining.slice(word.length);
          matched = true;
          continue;
        }

        // Check for operators
        const operatorMatch = remaining.match(/^[+\-*/%=<>!&|^~]+/);
        if (operatorMatch) {
          tokens.push(<span key={`${lineIndex}-${tokenIndex++}`} className="token-operator">{operatorMatch[0]}</span>);
          remaining = remaining.slice(operatorMatch[0].length);
          matched = true;
          continue;
        }

        // Default: add single character
        if (!matched) {
          tokens.push(<span key={`${lineIndex}-${tokenIndex++}`}>{remaining[0]}</span>);
          remaining = remaining.slice(1);
        }
      }

      // Add comment
      if (commentPart) {
        tokens.push(<span key={`${lineIndex}-comment`} className="token-comment">{commentPart}</span>);
      }

      return (
        <div key={lineIndex} className="leading-relaxed">
          {tokens}
        </div>
      );
    });
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-[var(--color-bg-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity touch-target"
        aria-label="Copy code"
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      <pre className="code-block overflow-x-auto">
        <code className="text-sm">{highlightCode(code)}</code>
      </pre>
    </div>
  );
};
