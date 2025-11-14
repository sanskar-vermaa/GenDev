import React, { useState } from 'react';
import { Code2, AlertCircle } from 'lucide-react';
import { generateCodeFromPrompt } from './services/geminiService';
import { GeneratedCode, GenerationStatus } from './types';
import { PromptInput } from './components/PromptInput';
import { LoadingState } from './components/LoadingState';
import { CodePreview } from './components/CodePreview';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    setStatus(GenerationStatus.LOADING);
    setError(null);
    setGeneratedCode(null);

    try {
      const { html, css, javascript } = await generateCodeFromPrompt(prompt);
      setGeneratedCode({
        html,
        css,
        javascript,
        prompt,
        timestamp: Date.now(),
      });
      setStatus(GenerationStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while generating the code.");
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(GenerationStatus.IDLE);
    setGeneratedCode(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-brand-500 to-purple-600 p-2 rounded-lg">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              DevGen
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-brand-900/20 border border-brand-800/50 text-brand-300">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
               Gemini 2.5 Flash
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Intro Text (only show when idle or loading initial) */}
        {!generatedCode && (
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Build web apps with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-500">AI</span>.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Describe a tool, form, or interface, and Gemini will write the HTML, CSS, and JS to build it instantly.
            </p>
          </div>
        )}

        <div className="space-y-8">
          {/* Input Section */}
          {status !== GenerationStatus.SUCCESS && (
             <PromptInput onGenerate={handleGenerate} status={status} />
          )}

          {/* Error Display */}
          {status === GenerationStatus.ERROR && error && (
            <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-200 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Build Failed</h3>
                <p className="text-sm opacity-80">{error}</p>
                <button 
                  onClick={() => setStatus(GenerationStatus.IDLE)}
                  className="mt-2 text-xs font-semibold hover:underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {status === GenerationStatus.LOADING && (
            <LoadingState />
          )}

          {/* Success State / Code Display */}
          {status === GenerationStatus.SUCCESS && generatedCode && (
            <CodePreview code={generatedCode} onReset={handleReset} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 mt-auto border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-600 text-sm">
          <p>Powered by Sanskar Verma GenAI Series @2025</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
