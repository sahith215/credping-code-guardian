
import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Search, AlertCircle, Check } from 'lucide-react';

const DetectionSection = () => {
  const [code, setCode] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [scanning, setScanning] = useState(false);

  type Result = {
    line: number;
    type: string;
    snippet: string;
    suggestion: string;
  };

  const handleScan = () => {
    if (!code.trim()) return;
    
    setScanning(true);
    
    // Simulate processing
    setTimeout(() => {
      const simulatedResults = [];
      
      // Simple regex patterns to find potential secrets
      const patterns = [
        { type: 'API Key', regex: /api[_-]?key.{0,10}[=:]\s*["']([^"']{8,})["']/i },
        { type: 'AWS Key', regex: /AKIA[0-9A-Z]{16}/i },
        { type: 'Password', regex: /(password|passwd|pwd).{0,10}[=:]\s*["']([^"']{6,})["']/i },
        { type: 'Token', regex: /(token|secret).{0,10}[=:]\s*["']([^"']{8,})["']/i }
      ];
      
      const lines = code.split('\n');
      
      lines.forEach((line, index) => {
        patterns.forEach(pattern => {
          if (pattern.regex.test(line)) {
            simulatedResults.push({
              line: index + 1,
              type: pattern.type,
              snippet: line.trim(),
              suggestion: `Move to environment variables or secrets manager`
            });
          }
        });
      });
      
      setResults(simulatedResults);
      setScanning(false);
    }, 1500);
  };

  const examplePlaceholder = `// Paste your code here to scan for credentials
// Example of what we can detect:

const apiKey = "84f7db6afb1a23bc0a632923bfc3";
AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const password = "admin123456";`;

  return (
    <section id="detection" className="py-24 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-credping-green">Detect</span> Credentials in Your Code
        </h2>
        
        <div className="card-raised p-6 md:p-8 grid md:grid-cols-2 gap-8">
          {/* Left Side - Code Input */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Paste Your Code</h3>
            <Textarea 
              className="min-h-[300px] bg-credping-black border-credping-gray font-mono resize-none mb-4"
              placeholder={examplePlaceholder}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button 
              className="cta-button w-full flex justify-center items-center gap-2"
              onClick={handleScan}
              disabled={scanning || !code.trim()}
            >
              {scanning ? 'Scanning...' : 'Scan Now'} 
              <Search size={20} />
            </Button>
          </div>
          
          {/* Right Side - Results */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Scan Results</h3>
            <div className="bg-credping-black rounded-lg border border-credping-gray min-h-[300px] p-4">
              {scanning ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-ping mr-2 h-4 w-4 rounded-full bg-credping-green opacity-75"></div>
                  <p>Scanning your code...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result, idx) => (
                    <div key={idx} className="bg-red-500/10 border-l-4 border-red-500 p-3 rounded">
                      <div className="flex gap-2 items-start">
                        <AlertCircle className="text-red-500 shrink-0 mt-1" size={18} />
                        <div>
                          <p className="font-medium text-red-400">{result.type} found at line {result.line}</p>
                          <div className="bg-red-950/30 p-2 rounded mt-2 text-xs">
                            <code className="text-white">{result.snippet}</code>
                          </div>
                          <p className="text-sm mt-2 text-gray-300">
                            <span className="text-credping-green">Suggestion:</span> {result.suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : code ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-green-500/20 p-3 rounded-full mb-3">
                    <Check className="text-green-500" size={24} />
                  </div>
                  <p className="text-green-400 font-medium">No credentials detected!</p>
                  <p className="text-sm text-gray-400 mt-2">Your code looks clean. Keep it secure!</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-gray-400">Paste your code and click "Scan Now" to check for exposed credentials</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetectionSection;
