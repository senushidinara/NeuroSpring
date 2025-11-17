
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CognitiveData } from '../types';

interface RealTimeChartProps {
  data: CognitiveData[];
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ data }) => {
  const formattedData = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString(),
    Focus: d.focus_score.toFixed(0),
    Load: d.cognitive_load.toFixed(0)
  }));

  return (
    <div className="bg-slate-800 rounded-lg p-4 h-96 shadow-lg">
       <h3 className="text-lg font-semibold text-slate-100 mb-4">Real-Time Cognitive Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="time" 
            stroke="#94a3b8" 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value, index) => index % 15 === 0 ? value : ''}
            />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }} 
            labelStyle={{ color: '#94a3b8' }}
          />
          <Legend wrapperStyle={{ color: '#e2e8f0' }} />
          <Line 
            type="monotone" 
            dataKey="Focus" 
            stroke="#22d3ee" 
            strokeWidth={2} 
            dot={false} 
            isAnimationActive={false}
          />
          <Line 
            type="monotone" 
            dataKey="Load" 
            stroke="#f97316" 
            strokeWidth={2} 
            dot={false} 
            isAnimationActive={false}
            />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeChart;
