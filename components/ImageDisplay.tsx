import React from 'react';
import { Download, ExternalLink, RefreshCw } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ImageDisplayProps {
  image: GeneratedImage;
  onReset: () => void;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.dataUrl;
    link.download = `lumina-gen-${image.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="group relative w-full overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-slate-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
        
        <img 
          src={image.dataUrl} 
          alt={image.prompt} 
          className="w-full h-auto object-contain max-h-[600px] mx-auto"
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 flex justify-between items-end">
          <p className="text-white/90 text-sm line-clamp-2 max-w-[70%] font-light drop-shadow-md">
            {image.prompt}
          </p>
          <div className="flex space-x-2">
             <button
              onClick={handleDownload}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors"
              title="Download Image"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-900/20 hover:shadow-brand-900/40"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-medium transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Generate New
        </button>
      </div>
    </div>
  );
};