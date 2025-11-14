import React, { useState, useEffect } from 'react';
    import { Code, Eye, Download, RefreshCw, Copy, Check } from 'lucide-react';
    import { GeneratedCode } from '../types';
    
    interface CodePreviewProps {
      code: GeneratedCode;
      onReset: () => void;
    }
    
    export const CodePreview: React.FC<CodePreviewProps> = ({ code, onReset }) => {
      const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
      const [copied, setCopied] = useState(false);
    
      // Construct the full HTML document for the iframe
      const srcDoc = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body { 
                margin: 0; 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #ffffff;
                color: #1f2937;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
                box-sizing: border-box;
              }
              /* Inject generated CSS */
              ${code.css}
            </style>
          </head>
          <body>
            <!-- Inject generated HTML -->
            ${code.html}
            
            <!-- Inject generated JS -->
            <script>
              try {
                ${code.javascript}
              } catch (err) {
                console.error('Generated App Error:', err);
                document.body.innerHTML += '<div style="color:red; padding:10px; border:1px solid red; margin-top:20px;">Runtime Error: ' + err.message + '</div>';
              }
            </script>
          </body>
        </html>
      `;
    
      const handleCopyCode = () => {
        const fullCode = `<!-- HTML -->\n${code.html}\n\n/* CSS */\n<style>\n${code.css}\n</style>\n\n// JS\n<script>\n${code.javascript}\n</script>`;
        navigator.clipboard.writeText(fullCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };
    
      const handleDownload = () => {
        const blob = new Blob([srcDoc], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'generated-app.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
    
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'preview' 
                      ? 'bg-brand-900/50 text-brand-300 border border-brand-800/50' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Live Preview
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'code' 
                      ? 'bg-brand-900/50 text-brand-300 border border-brand-800/50' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  Source Code
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Download HTML"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
    
            {/* Content */}
            <div className="h-[600px] bg-slate-950 relative">
              {activeTab === 'preview' ? (
                <iframe
                  title="Preview"
                  srcDoc={srcDoc}
                  className="w-full h-full bg-white"
                  sandbox="allow-scripts allow-modals"
                />
              ) : (
                <div className="h-full overflow-auto p-4 font-mono text-sm">
                  <div className="mb-6">
                    <div className="text-slate-500 mb-2 text-xs uppercase tracking-wider">HTML</div>
                    <pre className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-blue-300 overflow-x-auto">
                      <code>{code.html}</code>
                    </pre>
                  </div>
                  <div className="mb-6">
                    <div className="text-slate-500 mb-2 text-xs uppercase tracking-wider">CSS</div>
                    <pre className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-teal-300 overflow-x-auto">
                      <code>{code.css}</code>
                    </pre>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-2 text-xs uppercase tracking-wider">JavaScript</div>
                    <pre className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-yellow-300 overflow-x-auto">
                      <code>{code.javascript}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
    
          {/* Action Buttons */}
          <div className="flex justify-center mt-6">
             <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-medium transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Create Something Else
            </button>
          </div>
        </div>
      );
    };
    