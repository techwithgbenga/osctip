
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  { date: 'Jul 1', malware: 65, phishing: 42, ransomware: 23, ddos: 31 },
  { date: 'Jul 2', malware: 59, phishing: 38, ransomware: 28, ddos: 35 },
  { date: 'Jul 3', malware: 80, phishing: 43, ransomware: 31, ddos: 40 },
  { date: 'Jul 4', malware: 81, phishing: 51, ransomware: 35, ddos: 25 },
  { date: 'Jul 5', malware: 56, phishing: 39, ransomware: 30, ddos: 42 },
  { date: 'Jul 6', malware: 55, phishing: 52, ransomware: 24, ddos: 29 },
  { date: 'Jul 7', malware: 40, phishing: 57, ransomware: 28, ddos: 33 },
  { date: 'Jul 8', malware: 49, phishing: 62, ransomware: 19, ddos: 38 },
  { date: 'Jul 9', malware: 63, phishing: 60, ransomware: 22, ddos: 44 },
  { date: 'Jul 10', malware: 71, phishing: 53, ransomware: 29, ddos: 31 },
];

export function ThreatTrends() {
  return (
    <div className="cyber-card p-4 h-full">
      <h3 className="text-lg font-medium mb-4">Threat Trends</h3>
      
      <Tabs defaultValue="line">
        <TabsList className="mb-4">
          <TabsTrigger value="line">Line</TabsTrigger>
          <TabsTrigger value="area">Area</TabsTrigger>
        </TabsList>
        
        <TabsContent value="line" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a192f', 
                  borderColor: '#00b4d8', 
                  borderRadius: '0.375rem',
                  color: '#e6f1ff' 
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="malware" 
                stroke="#dc2626" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="phishing" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="ransomware" 
                stroke="#9333ea" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="ddos" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="area" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorMalware" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPhishing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRansomware" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDdos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a192f', 
                  borderColor: '#00b4d8', 
                  borderRadius: '0.375rem',
                  color: '#e6f1ff' 
                }} 
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="malware" 
                stroke="#dc2626" 
                fillOpacity={1} 
                fill="url(#colorMalware)" 
              />
              <Area 
                type="monotone" 
                dataKey="phishing" 
                stroke="#f59e0b" 
                fillOpacity={1} 
                fill="url(#colorPhishing)" 
              />
              <Area 
                type="monotone" 
                dataKey="ransomware" 
                stroke="#9333ea" 
                fillOpacity={1} 
                fill="url(#colorRansomware)" 
              />
              <Area 
                type="monotone" 
                dataKey="ddos" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorDdos)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
