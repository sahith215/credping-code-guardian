
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowRight, Key, FileCode, Database, Lock } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          The <span className="text-credping-green">Impact</span> of Credential Leaks
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Chart */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Common Exposed Credentials</h3>
            <div className="card-raised p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Frequency']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Right Side - Process Flow */}
          <div>
            <h3 className="text-xl font-semibold mb-6">How CredPing Works</h3>
            <div className="space-y-8">
              {flowSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-credping-green text-credping-black rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="text-credping-green" />
                      <h4 className="text-lg font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                    
                    {index < flowSteps.length - 1 && (
                      <div className="flex justify-center my-4">
                        <ArrowRight className="text-credping-green animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Additional Stats Section */}
        <div className="mt-20">
          <h3 className="text-xl font-semibold mb-6 text-center">Security Incidents by Year</h3>
          <div className="card-raised p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ background: '#1C1C1C', border: '1px solid #34FF85', borderRadius: '8px' }}
                  formatter={(value) => [`${value}`, 'Incidents']} 
                />
                <Bar dataKey="value" fill="#34FF85" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

const pieData = [
  { name: 'API Keys', value: 35, color: '#34FF85' },
  { name: 'Passwords', value: 25, color: '#3498db' },
  { name: 'Auth Tokens', value: 20, color: '#e74c3c' },
  { name: 'Database Creds', value: 15, color: '#f39c12' },
  { name: 'Private Keys', value: 5, color: '#9b59b6' },
];

const barData = [
  { name: '2020', value: 850 },
  { name: '2021', value: 1340 },
  { name: '2022', value: 1840 },
  { name: '2023', value: 2250 },
  { name: '2024', value: 2840 },
];

const flowSteps = [
  {
    icon: FileCode,
    title: 'Paste Your Code',
    description: 'Simply paste your code snippet, file, or logs into our secure scanner.'
  },
  {
    icon: Key,
    title: 'Intelligent Scanning',
    description: 'Our AI-powered detection system searches for over 50 types of credential patterns.'
  },
  {
    icon: Database,
    title: 'Identify Vulnerabilities',
    description: 'Get detailed information about what credentials were found and where.'
  },
  {
    icon: Lock,
    title: 'Secure Your Code',
    description: 'Follow our recommendations to properly secure your sensitive information.'
  }
];

export default StatsSection;
