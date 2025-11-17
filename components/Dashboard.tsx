import React, { useState } from 'react';
import { useCognitiveDataSimulator } from '../hooks/useCognitiveDataSimulator';
import { CognitiveData } from '../types';
import CognitiveMetricsCard from './CognitiveMetricsCard';
import InterventionsCard from './InterventionsCard';
import ModelExplanationCard from './ModelExplanationCard';
import RealTimeChart from './RealTimeChart';
import SessionSummaryCard from './SessionSummaryCard';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);
const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
);
const BrainWaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 animate-pulse">
    <path d="M2 12h3l3-9 4 18 4-12 3 6h3"/>
  </svg>
);

const Dashboard: React.FC = () => {
  const { isRunning, latestData, history, start, stop } = useCognitiveDataSimulator();
  const [sessionSummaryData, setSessionSummaryData] = useState<CognitiveData[] | null>(null);

  const handleStart = () => {
    setSessionSummaryData(null);
    start();
  };

  const handleStop = () => {
    // Pass a copy of the history at the moment of stopping
    setSessionSummaryData([...history]);
    stop();
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-end mb-6">
        <button
          onClick={isRunning ? handleStop : handleStart}
          className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-all duration-300 shadow-lg shadow-cyan-600/30 transform hover:scale-105"
        >
          {isRunning ? <PauseIcon /> : <PlayIcon />}
          {isRunning ? 'Stop Simulation' : 'Start Simulation'}
        </button>
      </div>
      
      {!latestData && !isRunning ? (
        <div className="text-center py-20 flex flex-col items-center justify-center">
            <BrainWaveIcon />
            <h2 className="text-3xl font-bold mt-6 text-slate-100 tracking-tight">Welcome to NeuroSpring</h2>
            <p className="text-slate-400 mt-3 max-w-md">Your real-time cognitive load optimizer. Click 'Start Simulation' to begin analysis and receive personalized recommendations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RealTimeChart data={history} />
          </div>
          <div className="flex flex-col gap-6">
            <CognitiveMetricsCard data={latestData} />
            <InterventionsCard data={latestData} />
            <ModelExplanationCard data={latestData} />
          </div>
          {sessionSummaryData && !isRunning && (
            <div className="lg:col-span-3">
              <SessionSummaryCard history={sessionSummaryData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;