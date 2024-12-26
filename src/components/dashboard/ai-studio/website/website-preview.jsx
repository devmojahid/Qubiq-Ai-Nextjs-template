"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, Eye, Monitor, Smartphone, Tablet,
  Sparkles, Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"

function LivePreview({ code, viewMode, settings }) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeHeight, setIframeHeight] = useState('500px');

  useEffect(() => {
    if (!code || !iframeRef.current) return;

    try {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;

      // Enhanced HTML content with better styling
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              ${code.css}
              /* Enhanced responsive container */
              body {
                margin: 0;
                min-height: 100vh;
                overflow-x: hidden;
                font-family: system-ui, -apple-system, sans-serif;
              }
              /* Add smooth scrolling */
              html {
                scroll-behavior: smooth;
              }
              /* Ensure proper box sizing */
              *, *::before, *::after {
                box-sizing: border-box;
              }
              /* Improve image handling */
              img {
                max-width: 100%;
                height: auto;
                display: block;
              }
            </style>
          </head>
          <body>
            ${code.html}
            <script>
              ${code.js}
              // Add resize observer to handle iframe height
              const resizeObserver = new ResizeObserver(entries => {
                window.parent.postMessage({ 
                  type: 'resize',
                  height: document.body.scrollHeight
                }, '*');
              });
              resizeObserver.observe(document.body);
            </script>
          </body>
        </html>
      `;

      doc.open();
      doc.write(htmlContent);
      doc.close();

      // Handle iframe messages for height adjustments
      const handleMessage = (event) => {
        if (event.data?.type === 'resize') {
          setIframeHeight(`${event.data.height}px`);
        }
      };
      window.addEventListener('message', handleMessage);

      // Handle iframe load
      iframe.onload = () => {
        setIsLoading(false);
        setError(null);
      };

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    } catch (err) {
      setError('Failed to render preview');
      setIsLoading(false);
    }
  }, [code, viewMode]);

  return (
    <div className="relative h-full">
      <div 
        className={cn(
          "relative transition-all duration-300",
          "mx-auto overflow-hidden",
          viewMode === 'mobile' ? 'w-[375px]' : 
          viewMode === 'tablet' ? 'w-[768px]' : 
          'w-full'
        )}
      >
        <iframe
          ref={iframeRef}
          className={cn(
            "w-full border-0 bg-white transition-all duration-300",
            viewMode !== 'desktop' && "rounded-[2rem] shadow-2xl"
          )}
          style={{ height: iframeHeight }}
          sandbox="allow-scripts allow-same-origin"
        />

        {/* Device Frame */}
        {viewMode !== 'desktop' && (
          <div className={cn(
            "absolute inset-0 pointer-events-none",
            "border-[12px] border-gray-800 rounded-[2rem]"
          )}>
            <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 rounded-t-2xl" />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-destructive/10">
            <p className="text-destructive bg-background/90 px-4 py-2 rounded-lg">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function WebsitePreview({ 
  websites, 
  isGenerating, 
  selectedWebsite,
  onSelectWebsite,
  viewMode,
  onViewModeChange,
  settings 
}) {
  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Live Preview
          </div>
        </div>
        
        {/* Device Controls for Desktop */}
        <div className="hidden md:flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-1.5 border shadow-sm">
          <button
            onClick={() => onViewModeChange('mobile')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'mobile' ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"
            )}
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('tablet')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'tablet' ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"
            )}
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('desktop')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              viewMode === 'desktop' ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"
            )}
          >
            <Monitor className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="relative rounded-xl border bg-background/50 backdrop-blur-sm overflow-hidden">
        {selectedWebsite ? (
          <div className="relative">
            {/* Preview Toolbar */}
            <div className="absolute top-0 inset-x-0 h-10 bg-background/95 border-b backdrop-blur-sm z-10 flex items-center px-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="h-6 w-[200px] rounded-md bg-background ml-4 px-3 text-xs flex items-center text-muted-foreground">
                  {selectedWebsite.prompt.substring(0, 30)}...
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="pt-10 p-4 min-h-[500px] bg-white">
              <LivePreview 
                code={selectedWebsite.code}
                viewMode={viewMode}
                settings={settings}
              />
            </div>

            {/* Mobile Device Controls */}
            <div className="md:hidden absolute bottom-4 right-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-1.5 border shadow-sm">
              <button
                onClick={() => onViewModeChange('mobile')}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === 'mobile' ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"
                )}
              >
                <Smartphone className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange('tablet')}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === 'tablet' ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"
                )}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange('desktop')}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === 'desktop' ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"
                )}
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No website generated yet
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Generated Variations */}
      {websites.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Generated Variations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {websites.map((website) => (
              <motion.button
                key={website.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectWebsite(website)}
                className={cn(
                  "relative aspect-video rounded-lg overflow-hidden",
                  "border-2 transition-all duration-200",
                  selectedWebsite?.id === website.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-primary/50"
                )}
              >
                <img
                  src={website.preview.desktop}
                  alt={website.prompt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 