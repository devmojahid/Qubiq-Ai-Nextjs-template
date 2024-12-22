"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, Eye, Code2, Layout,
  Smartphone, Laptop, Monitor, Desktop,
  Download, Share2, Copy, Check,
  RefreshCcw, FileCode, Browser, Blocks,
  Maximize2, Minimize2, Tablet, Phone,
  ArrowLeft, ArrowRight, RotateCcw,
  Loader2, Sparkles, Palette, XCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

export function WebsitePreview({ 
  websites, 
  isGenerating, 
  selectedWebsite,
  onSelectWebsite,
  viewMode,
  onViewModeChange,
  settings 
}) {
  const [showCode, setShowCode] = useState(false)
  const [activeTab, setActiveTab] = useState("preview") // preview, code, responsive
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [currentView, setCurrentView] = useState("desktop")
  const previewRef = useRef(null)
  const codeRef = useRef(null)

  const deviceFrames = {
    mobile: {
      width: 320,
      height: 568,
      frame: "iphone-frame.png"
    },
    tablet: {
      width: 768,
      height: 1024,
      frame: "ipad-frame.png"
    },
    desktop: {
      width: "100%",
      height: "auto",
      frame: null
    }
  }

  const [highlightedComponent, setHighlightedComponent] = useState(null)

  const [customCSS, setCustomCSS] = useState("")

  const [metrics, setMetrics] = useState({
    fcp: null, // First Contentful Paint
    lcp: null, // Largest Contentful Paint
    cls: null  // Cumulative Layout Shift
  })

  const [generatedCode, setGeneratedCode] = useState(null);

  useEffect(() => {
    if (selectedWebsite?.code) {
      setGeneratedCode(selectedWebsite.code);
    } else if (!isGenerating && websites.length > 0) {
      const initialCode = generateInitialCode(settings);
      setGeneratedCode(initialCode);
    }
  }, [selectedWebsite, isGenerating, websites, settings]);

  const handleCopyCode = async () => {
    if (!selectedWebsite?.code) return

    try {
      await navigator.clipboard.writeText(
        typeof selectedWebsite.code === 'string' 
          ? selectedWebsite.code 
          : JSON.stringify(selectedWebsite.code, null, 2)
      )
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const handleDownload = async () => {
    if (!selectedWebsite?.code) return;

    try {
      // Create a zip file
      const zip = new JSZip();
      
      // Add files
      zip.file('index.html', `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Generated Website</title>
            <link rel="stylesheet" href="styles.css">
          </head>
          <body>
            ${selectedWebsite.code.html}
            <script src="script.js"></script>
          </body>
        </html>
      `);
      
      zip.file('styles.css', selectedWebsite.code.css);
      zip.file('script.js', selectedWebsite.code.js);

      // Generate and download
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'website.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download. Please try again.');
    }
  }

  const handleShare = async () => {
    if (!selectedWebsite) return;

    try {
      // Create shareable content
      const shareData = {
        title: 'Generated Website',
        text: 'Check out this AI-generated website!',
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copy link
        await navigator.clipboard.writeText(window.location.href);
        // Show success message
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      alert('Failed to share. Please try again.');
    }
  }

  const toggleFullscreen = () => {
    try {
      const previewElement = previewRef.current;
      if (!previewElement) return;

      if (!document.fullscreenElement) {
        if (previewElement.requestFullscreen) {
          previewElement.requestFullscreen();
        } else if (previewElement.webkitRequestFullscreen) {
          previewElement.webkitRequestFullscreen();
        } else if (previewElement.msRequestFullscreen) {
          previewElement.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen failed:', error);
      alert('Fullscreen mode not supported');
    }
  }

  const generateInitialCode = (settings) => {
    return {
      html: `
        <div class="website-container">
          <header class="site-header">
            <nav class="container">
              <div class="logo">Brand Logo</div>
              <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
              </div>
            </nav>
          </header>

          <main>
            <section class="hero">
              <div class="container">
                <h1>Welcome to Your Website</h1>
                <p>Create stunning websites with AI assistance</p>
                <button class="cta-button">Get Started</button>
              </div>
            </section>

            <section class="features">
              <div class="container">
                <h2>Our Features</h2>
                <div class="feature-grid">
                  <div class="feature-card">
                    <h3>Feature 1</h3>
                    <p>Description of feature 1</p>
                  </div>
                  <div class="feature-card">
                    <h3>Feature 2</h3>
                    <p>Description of feature 2</p>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer class="site-footer">
            <div class="container">
              <p>&copy; 2024 Your Website. All rights reserved.</p>
            </div>
          </footer>
        </div>
      `,
      css: `
        /* Base styles */
        :root {
          --primary: ${settings?.theme === 'dark' ? '#8b5cf6' : '#6366f1'};
          --background: ${settings?.theme === 'dark' ? '#1f2937' : '#ffffff'};
          --text: ${settings?.theme === 'dark' ? '#f9fafb' : '#111827'};
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: system-ui, sans-serif;
          color: var(--text);
          background: var(--background);
          line-height: 1.5;
        }

        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Header */
        .site-header {
          background: var(--background);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .site-header nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 4rem;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: var(--text);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: var(--primary);
        }

        /* Hero Section */
        .hero {
          padding: 6rem 0;
          text-align: center;
          background: linear-gradient(to right, var(--primary), rgba(99, 102, 241, 0.8));
          color: white;
        }

        .hero h1 {
          font-size: clamp(2rem, 5vw, 4rem);
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: clamp(1rem, 2vw, 1.25rem);
          opacity: 0.9;
        }

        .cta-button {
          margin-top: 2rem;
          padding: 0.75rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--primary);
          background: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-2px);
        }

        /* Features */
        .features {
          padding: 6rem 0;
        }

        .features h2 {
          text-align: center;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          margin-bottom: 3rem;
        }

        .feature-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .feature-card {
          padding: 2rem;
          border-radius: 0.5rem;
          background: var(--background);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }

        /* Footer */
        .site-footer {
          background: var(--background);
          padding: 2rem 0;
          text-align: center;
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `,
      js: `
        // Interactive features
        document.addEventListener('DOMContentLoaded', () => {
          // Smooth scrolling
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
              e.preventDefault();
              const target = document.querySelector(anchor.getAttribute('href'));
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            });
          });

          // Button interactions
          const ctaButton = document.querySelector('.cta-button');
          if (ctaButton) {
            ctaButton.addEventListener('click', () => {
              ctaButton.style.transform = 'scale(0.98)';
              setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
              }, 100);
            });
          }

          // Add scroll animations
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
              }
            });
          }, { threshold: 0.1 });

          document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
          });
        });
      `
    };
  };

  const LivePreview = ({ code, viewMode, settings }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef(null);

    useEffect(() => {
      const loadPreview = async () => {
        if (!iframeRef.current) return;

        try {
          const iframe = iframeRef.current;
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          
          // Generate code if none provided
          const previewCode = code || generateInitialCode(settings);
          
          doc.open();
          doc.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                  ${previewCode.css}
                  /* Base styles */
                  body { 
                    margin: 0; 
                    padding: 0;
                    min-height: 100vh;
                  }
                  .preview-wrapper { 
                    min-height: 100vh;
                    overflow-x: hidden;
                  }
                </style>
              </head>
              <body>
                <div class="preview-wrapper">
                  ${previewCode.html}
                </div>
                <script>
                  // Error handling
                  window.onerror = function(msg, url, line) {
                    window.parent.postMessage({ 
                      type: 'error', 
                      data: { message: msg, line }
                    }, '*');
                    return true;
                  };

                  // Initialize
                  document.addEventListener('DOMContentLoaded', function() {
                    window.parent.postMessage({ type: 'loaded' }, '*');
                    ${previewCode.js}
                  });
                </script>
              </body>
            </html>
          `);
          doc.close();

          // Handle messages from iframe
          const handleMessage = (event) => {
            if (event.data.type === 'loaded') {
              setIsLoading(false);
            } else if (event.data.type === 'error') {
              setError(event.data.data);
            }
          };

          window.addEventListener('message', handleMessage);
          return () => window.removeEventListener('message', handleMessage);

        } catch (err) {
          console.error('Preview error:', err);
          setError(err);
          setIsLoading(false);
        }
      };

      loadPreview();
    }, [code, viewMode, settings]);

    // Show loading state
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full bg-secondary/20">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading preview...</p>
          </div>
        </div>
      )
    }

    // Enhanced error display
    if (error) {
      return (
        <div className="flex items-center justify-center h-full bg-red-50/10 p-4">
          <div className="max-w-md w-full space-y-4">
            <div className="text-center space-y-2">
              <XCircle className="h-12 w-12 text-red-500 mx-auto" />
              <h3 className="text-lg font-medium text-red-500">Preview Error</h3>
              <p className="text-sm text-red-400">
                {error.message || "Failed to render preview"}
              </p>
              {error.line && (
                <p className="text-xs text-red-400">
                  Line: {error.line}
                </p>
              )}
            </div>
            <div className="flex justify-center gap-2">
              <button 
                onClick={() => setError(null)}
                className="px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 
                           bg-red-50/10 hover:bg-red-50/20 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Enhanced preview with responsive container
    return (
      <div className="relative w-full h-full">
        <iframe
          ref={iframeRef}
          className={cn(
            "w-full h-full border-0 transition-all duration-300",
            deviceFrames[viewMode].frame && "rounded-[3rem] shadow-2xl"
          )}
          style={{
            width: deviceFrames[viewMode].width,
            height: deviceFrames[viewMode].height,
            backgroundImage: deviceFrames[viewMode].frame 
              ? `url(/frames/${deviceFrames[viewMode].frame})` 
              : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Responsive overlay */}
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 
                      rounded-lg shadow-lg backdrop-blur-sm p-1 text-xs">
          {viewMode === 'mobile' ? '📱 Mobile' : 
           viewMode === 'tablet' ? '📱 Tablet' : '🖥️ Desktop'}
        </div>
      </div>
    )
  }

  const ComponentInspector = ({ components, onHighlight }) => {
    return (
      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg backdrop-blur-sm p-2">
        <div className="space-y-1">
          {components.map(component => (
            <button
              key={component.id}
              onClick={() => onHighlight(component.id)}
              className={cn(
                "flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm",
                "transition-colors hover:bg-secondary/80"
              )}
            >
              <component.icon className="h-4 w-4" />
              <span>{component.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const PerformanceMetrics = ({ metrics }) => {
    return (
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg backdrop-blur-sm p-2">
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="text-muted-foreground">FCP</div>
            <div className="font-medium">{metrics.fcp?.toFixed(2)}s</div>
          </div>
          <div>
            <div className="text-muted-foreground">LCP</div>
            <div className="font-medium">{metrics.lcp?.toFixed(2)}s</div>
          </div>
          <div>
            <div className="text-muted-foreground">CLS</div>
            <div className="font-medium">{metrics.cls?.toFixed(3)}</div>
          </div>
        </div>
      </div>
    )
  }

  const CSSEditor = ({ css, onChange }) => {
    const [isValid, setIsValid] = useState(true)

    const validateCSS = (value) => {
      try {
        const style = document.createElement('style')
        style.textContent = value
        document.head.appendChild(style)
        document.head.removeChild(style)
        setIsValid(true)
        return true
      } catch (error) {
        setIsValid(false)
        return false
      }
    }

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Custom CSS</label>
          <div className={cn(
            "text-xs",
            isValid ? "text-green-500" : "text-red-500"
          )}>
            {isValid ? "Valid CSS" : "Invalid CSS"}
          </div>
        </div>
        <textarea
          value={css}
          onChange={(e) => {
            const value = e.target.value
            if (validateCSS(value)) {
              onChange(value)
            }
          }}
          className={cn(
            "w-full rounded-lg bg-secondary/50 p-3 font-mono text-sm",
            "focus:outline-none focus:ring-2",
            isValid 
              ? "focus:ring-primary/20" 
              : "focus:ring-red-500/20"
          )}
          placeholder=".custom-styles { ... }"
        />
      </div>
    )
  }

  const ResponsiveControls = ({ viewMode, onViewModeChange }) => {
    const presetSizes = [
      { label: "Mobile S", width: 320 },
      { label: "Mobile L", width: 425 },
      { label: "Tablet", width: 768 },
      { label: "Laptop", width: 1024 },
      { label: "Desktop", width: 1440 }
    ]

    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {Object.keys(deviceFrames).map(mode => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {mode === "mobile" && <Smartphone className="h-4 w-4" />}
              {mode === "tablet" && <Tablet className="h-4 w-4" />}
              {mode === "desktop" && <Monitor className="h-4 w-4" />}
            </button>
          ))}
        </div>
        <select
          value={viewMode}
          onChange={(e) => onViewModeChange(e.target.value)}
          className="rounded-lg bg-secondary/50 px-3 py-1.5 text-sm"
        >
          {presetSizes.map(size => (
            <option key={size.width} value={size.width}>
              {size.label} ({size.width}px)
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Preview Area */}
      <div className="relative rounded-xl overflow-hidden bg-card">
        {isGenerating ? (
          <div className="aspect-[16/9] flex flex-col items-center justify-center bg-secondary/20">
            <div className="space-y-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
                <div className="relative rounded-full bg-primary/10 p-4">
                  <Globe className="h-8 w-8 text-primary animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">Generating Website</h3>
                <p className="text-sm text-muted-foreground">
                  Building your website with AI...
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-primary">Processing components</span>
              </div>
            </div>
          </div>
        ) : websites.length > 0 ? (
          <div>
            {/* Tabs */}
            <div className="border-b">
              <div className="flex items-center justify-between p-2">
                <div className="flex gap-2">
                  {[
                    { id: "preview", label: "Preview", icon: Eye },
                    { id: "code", label: "Code", icon: Code2 },
                    { id: "responsive", label: "Responsive", icon: Layout }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1.5",
                        "text-sm transition-colors",
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {activeTab === "responsive" && (
                    <div className="flex gap-1">
                      {[
                        { id: "mobile", icon: Phone, width: "320px" },
                        { id: "tablet", icon: Tablet, width: "768px" },
                        { id: "desktop", icon: Monitor, width: "100%" }
                      ].map((view) => (
                        <button
                          key={view.id}
                          onClick={() => setCurrentView(view.id)}
                          className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            currentView === view.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <view.icon className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-1">
                    <button
                      onClick={handleShare}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {activeTab === "preview" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="aspect-[16/9]"
                  >
                    <LivePreview 
                      code={generatedCode} 
                      viewMode={viewMode}
                      settings={settings}
                    />
                  </motion.div>
                )}

                {activeTab === "code" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 space-y-4 bg-secondary/10 rounded-lg"
                  >
                    {/* Code display */}
                    {generatedCode ? (
                      <div className="space-y-6">
                        {/* HTML Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">HTML</h3>
                            <button
                              onClick={() => handleCopyCode('html')}
                              className="text-xs text-muted-foreground hover:text-foreground"
                            >
                              Copy HTML
                            </button>
                          </div>
                          <pre className="p-4 rounded-lg bg-secondary/20 overflow-x-auto">
                            <code className="text-sm">
                              {generatedCode.html}
                            </code>
                          </pre>
                        </div>

                        {/* CSS Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">CSS</h3>
                            <button
                              onClick={() => handleCopyCode('css')}
                              className="text-xs text-muted-foreground hover:text-foreground"
                            >
                              Copy CSS
                            </button>
                          </div>
                          <pre className="p-4 rounded-lg bg-secondary/20 overflow-x-auto">
                            <code className="text-sm">
                              {generatedCode.css}
                            </code>
                          </pre>
                        </div>

                        {/* JavaScript Section */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">JavaScript</h3>
                            <button
                              onClick={() => handleCopyCode('js')}
                              className="text-xs text-muted-foreground hover:text-foreground"
                            >
                              Copy JavaScript
                            </button>
                          </div>
                          <pre className="p-4 rounded-lg bg-secondary/20 overflow-x-auto">
                            <code className="text-sm">
                              {generatedCode.js}
                            </code>
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        No code generated yet
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "responsive" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="aspect-[16/9] bg-secondary/20 p-4"
                  >
                    <div 
                      className="h-full mx-auto overflow-auto"
                      style={{ width: currentView === "desktop" ? "100%" : currentView === "tablet" ? "768px" : "320px" }}
                    >
                      <iframe
                        src={selectedWebsite?.url}
                        className="w-full h-full border-0 rounded-lg"
                        title="Responsive Preview"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="aspect-[16/9] flex items-center justify-center bg-secondary/20">
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
      {websites.length > 1 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Generated Variations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {websites.map((website, index) => (
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
                  alt={`Variation ${index + 1}`}
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