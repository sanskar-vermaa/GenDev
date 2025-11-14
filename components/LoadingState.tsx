import React from 'react';
import { Loader2, Code2, Cpu } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="w-full h-96 rounded-xl bg-slate-900/50 border border-slate-700 flex flex-col items-center justify-center text-slate-400 backdrop-blur-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative flex flex-col items-center z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-500 blur-xl opacity-20 animate-pulse"></div>
          <Loader2 className="w-12 h-12 mb-6 animate-spin text-brand-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">Building your Application</h3>
        <div className="flex flex-col gap-2 text-center text-sm text-slate-400">
          <span className="animate-[pulse_2s_ease-in-out_infinite]">Writing HTML structure...</span>
          <span className="animate-[pulse_2s_ease-in-out_0.5s_infinite]">Styling with CSS...</span>
          <span className="animate-[pulse_2s_ease-in-out_1s_infinite]">Compiling JavaScript logic...</span>
        </div>
      </div>
    </div>
  );
};