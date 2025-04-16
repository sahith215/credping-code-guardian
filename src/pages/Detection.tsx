
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, X, AlertTriangle, Check, Copy, Download, Github, ExternalLink, ChevronDown } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type Result = {
  line: number;
  type: string;
  severity: 'low' | 'medium' | 'high';
  snippet: string;
  suggestion: string;
};

const Detection = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);
  const [results, setResults] = useState<Result[]>([]);
  const [scanCompleted, setScanCompleted] = useState<boolean>(false);

  const handleClearCode = () => {
    setCode('');
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const handleLoadRepository = () => {
    if (!repoUrl.trim()) {
      toast.error('Please enter a valid GitHub repository URL');
      return;
    }

    // In a real implementation, this would connect to a GitHub API
    // For now we'll simulate with a toast notification
    toast.success('Repository loaded successfully');
    setCode('// Example code loaded from GitHub\nconst apiKey = "84f7db6afb1a23bc0a632923bfc3";\nconst password = "admin123456";');
  };

  const handleScan = () => {
    if (!code.trim() && !repoUrl.trim()) {
      toast.error('Please paste code or provide a GitHub repository URL');
      return;
    }

    setScanning(true);
    setScanCompleted(false);
    setResults([]);

    // Simulate processing delay
    setTimeout(() => {
      // Simple regex patterns to find potential secrets
      const patterns = [
        { type: 'API Key', regex: /api[_-]?key.{0,10}[=:]\s*["']([^"']{8,})["']/i, severity: 'high' as const },
        { type: 'AWS Key', regex: /AKIA[0-9A-Z]{16}/i, severity: 'high' as const },
        { type: 'Password', regex: /(password|passwd|pwd).{0,10}[=:]\s*["']([^"']{6,})["']/i, severity: 'medium' as const },
        { type: 'Token', regex: /(token|secret).{0,10}[=:]\s*["']([^"']{8,})["']/i, severity: 'high' as const },
        { type: 'Private Key', regex: /-----BEGIN [A-Z]+ PRIVATE KEY-----/i, severity: 'high' as const }
      ];
      
      const lines = code.split('\n');
      const detectedResults: Result[] = [];
      
      lines.forEach((line, index) => {
        patterns.forEach(pattern => {
          if (pattern.regex.test(line)) {
            detectedResults.push({
              line: index + 1,
              type: pattern.type,
              severity: pattern.severity,
              snippet: line.trim(),
              suggestion: pattern.type === 'API Key' || pattern.type === 'Token' 
                ? 'Move to environment variables (.env file)'
                : pattern.type === 'Password' 
                ? 'Use a password manager or vault service'
                : pattern.type === 'Private Key' 
                ? 'Store in a secure location, never in code'
                : 'Move to a secrets manager'
            });
          }
        });
      });
      
      setResults(detectedResults);
      setScanning(false);
      setScanCompleted(true);
      
      if (detectedResults.length > 0) {
        toast.error(`Found ${detectedResults.length} credential issues in your code`);
      } else if (code.trim()) {
        toast.success('No credentials detected in your code');
      }
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'border-yellow-400 bg-yellow-500/10';
      case 'medium':
        return 'border-orange-400 bg-orange-500/10';
      case 'high':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-gray-400 bg-gray-500/10';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <AlertTriangle className="text-yellow-400" size={18} />;
      case 'medium':
        return <AlertTriangle className="text-orange-400" size={18} />;
      case 'high':
        return <AlertTriangle className="text-red-500" size={18} />;
      default:
        return null;
    }
  };

  const examplePlaceholder = `// Paste your code here to scan for credentials
// Example of what we can detect:

const apiKey = "84f7db6afb1a23bc0a632923bfc3";
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const password = "admin123456";`;

  return (
    <div className="min-h-screen bg-credping-black text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-credping-green">Credential</span> Detection
          </h1>
          <p className="text-gray-400 text-center mb-10">
            Scan your code for exposed credentials and secret keys
          </p>

          <div className="card-raised p-6 md:p-8 mb-8">
            {/* Step 1: Language Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Select Programming Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full bg-credping-black border-credping-green/50 hover:border-credping-green focus:border-credping-green transition-colors">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent className="bg-credping-black border-credping-green/30">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Step 2: Code Paste Area */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium mb-2">Paste Your Code</label>
              <div className="relative">
                <Textarea 
                  className="min-h-[200px] bg-credping-black border-credping-gray font-mono resize-none focus:border-credping-green focus:ring-1 focus:ring-credping-green/50 transition-all"
                  placeholder={examplePlaceholder}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {code && (
                  <button 
                    className="absolute top-3 right-3 p-1 rounded-full bg-credping-gray hover:bg-credping-gray/80 transition-colors"
                    onClick={handleClearCode}
                    aria-label="Clear code"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-credping-green/20"></div>
              <span className="px-4 text-sm text-gray-400">OR</span>
              <div className="flex-grow h-px bg-credping-green/20"></div>
            </div>

            {/* Step 3: GitHub Repository */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">GitHub Repository</label>
              <div className="flex gap-3">
                <Input
                  className="flex-grow bg-credping-black border-credping-gray focus:border-credping-green focus:ring-1 focus:ring-credping-green/50 transition-all"
                  placeholder="Enter your GitHub repository URL"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
                <Button 
                  className="bg-credping-black border border-credping-green/50 text-credping-green hover:bg-credping-green/10"
                  onClick={handleLoadRepository}
                >
                  <Github size={16} className="mr-2" />
                  Load
                </Button>
              </div>
            </div>

            {/* Step 4: Scan Button */}
            <Button 
              className="w-full cta-button mt-4 flex justify-center items-center gap-2"
              onClick={handleScan}
              disabled={scanning}
            >
              {scanning ? 'Scanning...' : 'Scan Now'} 
              <Search size={20} />
            </Button>
          </div>

          {/* Scan Results Panel */}
          {scanCompleted && (
            <div className="card-raised p-6 md:p-8 animate-fade-in">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Search size={20} />
                Scan Results
              </h2>

              {/* Scan Summary */}
              {results.length > 0 ? (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {results.map((result, idx) => (
                      <div 
                        key={idx} 
                        className={`border-l-4 p-4 rounded-md ${getSeverityColor(result.severity)}`}
                      >
                        <div className="flex gap-2 items-start">
                          {getSeverityIcon(result.severity)}
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <p className="font-medium">
                                {result.type} found at line {result.line}
                                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-credping-black/40">
                                  {result.severity.toUpperCase()} RISK
                                </span>
                              </p>
                              <button 
                                className="text-gray-400 hover:text-white p-1 transition-colors"
                                onClick={() => handleCopyToClipboard(result.snippet)}
                                aria-label="Copy code"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                            <div className="bg-credping-black/50 p-2 rounded my-2 text-xs font-mono">
                              <code>{result.snippet}</code>
                            </div>
                            <Collapsible>
                              <div className="flex items-center gap-1 mt-2 text-credping-green text-sm">
                                <Check size={14} />
                                <p>Suggested Fix</p>
                                <CollapsibleTrigger className="ml-auto">
                                  <ChevronDown size={14} />
                                </CollapsibleTrigger>
                              </div>
                              <CollapsibleContent>
                                <div className="pl-5 pt-2 pb-1 text-sm border-l border-credping-green/30 mt-1">
                                  <p>{result.suggestion}</p>
                                  {result.type === 'API Key' && (
                                    <div className="bg-credping-black/50 p-2 rounded mt-2 font-mono text-xs">
                                      <code># Store in .env file instead<br/>
                                      API_KEY=your_api_key_here<br/><br/>
                                      # Then in your code<br/>
                                      api_key = os.environ.get('API_KEY')</code>
                                    </div>
                                  )}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Download Safe Version Button */}
                  <Button className="w-full bg-credping-black border border-credping-green/50 text-credping-green hover:bg-credping-green/10">
                    <Download size={16} className="mr-2" />
                    Download Safe Version
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="bg-green-500/20 p-3 rounded-full mb-3">
                    <Check className="text-green-500" size={24} />
                  </div>
                  <p className="text-green-400 font-medium">No credentials detected!</p>
                  <p className="text-sm text-gray-400 mt-2">Your code looks clean. Keep it secure!</p>
                </div>
              )}
            </div>
          )}
          
          {/* Learn More Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Want to learn more about securing your credentials?
              <Button variant="link" className="text-credping-green ml-1">
                Check our guide <ExternalLink size={12} className="ml-1" />
              </Button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detection;
