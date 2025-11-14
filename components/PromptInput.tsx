import React, { useState } from 'react';
import { Sparkles, Eraser, Terminal } from 'lucide-react';
import { GenerationStatus } from '../types';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  status: GenerationStatus;
}

const DEFAULT_PROMPT = "Create a personal expense tracker. It should have a form to add item name and cost, a list showing added items, and a total sum at the bottom. Use a modern, dark-themed design with green accents.";

export const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, status }) => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && status !== GenerationStatus.LOADING) {
      onGenerate(prompt);
    }
  };

  const handleClear = () => setPrompt('');

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-purple-600 rounded-xl opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
        <div className="relative bg-slate-900 rounded-xl p-1">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the web app you want to create (e.g., 'A calculator', 'A to-do list', 'A login form')..."
            className="w-full h-32 p-4 bg-slate-900 text-slate-100 placeholder-slate-500 rounded-lg border-none resize-none focus:ring-1 focus:ring-brand-500 focus:outline-none text-lg leading-relaxed font-mono"
            disabled={status === GenerationStatus.LOADING}
          />
          <div className="flex justify-between items-center px-2 pb-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
              disabled={status === GenerationStatus.LOADING}
            >
              <Eraser className="w-3 h-3" />
              Clear
            </button>
            <div className="text-xs text-slate-500">
              {prompt.length} chars
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!prompt.trim() || status === GenerationStatus.LOADING}
        className={`
          w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all duration-200
          ${!prompt.trim() || status === GenerationStatus.LOADING
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-lg shadow-brand-500/25 transform hover:scale-[1.01]'
          }
        `}
      >
        {status === GenerationStatus.LOADING ? (
          'Generating Code...'
        ) : (
          <>
            <Terminal className="w-5 h-5" />
            Generate App
          </>
        )}
      </button>
    </form>
  );
};