
import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle } from 'lucide-react';

const CodeAnimation: React.FC = () => {
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  
  // Code lines with sensitive data clearly marked
  const codeLines = [
    'import requests',
    'from django.conf import settings',
    '',
    'def get_weather_data(city):',
    '    api_key = "84f7db6afb1a23bc0a632923bfc3"',
    '    url = f"https://api.weather.com/data/{api_key}"',
    '    response = requests.get(url)',
    '    return response.json()',
    '',
    'AWS_SECRET = "AKIAIOSFODNN7EXAMPLE"',
    'DATABASE_URL = "postgres://user:password@localhost/db"'
  ];

  // Define which lines contain sensitive data and what type
  const sensitiveLines = [
    { lineIndex: 4, type: "API Key", value: "84f7db6afb1a23bc0a632923bfc3" },
    { lineIndex: 9, type: "AWS Secret", value: "AKIAIOSFODNN7EXAMPLE" },
    { lineIndex: 10, type: "Database Credentials", value: "postgres://user:password@localhost/db" }
  ];

  // Simulate code scanning animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Only flag sensitive lines
      const randomSensitiveLine = sensitiveLines[Math.floor(Math.random() * sensitiveLines.length)];
      setHighlightLine(randomSensitiveLine.lineIndex);
      
      // Show alert after a short delay
      setTimeout(() => {
        setShowAlert(true);
        
        // Hide alert after a few seconds
        setTimeout(() => {
          setShowAlert(false);
          setHighlightLine(null);
        }, 3000);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Get sensitive data info for currently highlighted line
  const getSensitiveInfo = () => {
    if (highlightLine === null) return null;
    return sensitiveLines.find(line => line.lineIndex === highlightLine);
  };

  const sensitiveInfo = getSensitiveInfo();

  return (
    <div className="relative">
      <div className="card-raised p-5 w-full md:w-[500px] font-mono text-sm text-gray-300 shadow-lg">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-white/70">code_sample.py</span>
        </div>
        
        <div className="overflow-x-auto">
          {codeLines.map((line, index) => (
            <div 
              key={index}
              className={`flex gap-4 py-1 ${highlightLine === index ? 'bg-red-500/20 border-l-4 border-red-500' : ''}`}
            >
              <span className="text-gray-500 select-none">{index + 1}</span>
              <code className="flex-1">{line}</code>
            </div>
          ))}
        </div>
      </div>
      
      {/* Alert popup with specific sensitive data details */}
      {showAlert && sensitiveInfo && (
        <div className="absolute -top-4 -right-4 bg-credping-black border border-red-500 shadow-lg p-4 rounded-lg animate-fade-in w-64">
          <div className="flex items-start gap-2">
            <AlertCircle className="text-red-500 shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium text-red-500">{sensitiveInfo.type} Exposed!</p>
              <p className="text-sm text-gray-300 mt-1">Found credentials at line {sensitiveInfo.lineIndex + 1}</p>
              <div className="bg-red-950/30 p-2 rounded mt-2 text-xs">
                <code className="text-red-400">
                  Replace with environment variable: {`${'{'}process.env.${sensitiveInfo.type.replace(/\s+/g, '_').toUpperCase()}{'}'}`}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Shield protection animation */}
      <div className="absolute -bottom-6 -right-6 bg-credping-green text-credping-black p-3 rounded-full shadow-lg shadow-credping-green/20">
        <Shield size={28} />
      </div>
    </div>
  );
};

export default CodeAnimation;
