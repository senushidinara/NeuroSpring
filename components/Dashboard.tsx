
import React from 'react';
import { useCognitiveDataSimulator } from '../hooks/useCognitiveDataSimulator';
import CognitiveMetricsCard from './CognitiveMetricsCard';
import InterventionsCard from './InterventionsCard';
import ModelExplanationCard from './ModelExplanationCard';
import RealTimeChart from './RealTimeChart';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);
const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
);
const BrainWaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
    <path d="M2 12h3l3-9 4 18 4-12 3 6h3"/>
  </svg>
);


const Dashboard: React.FC = () => {
  const { isRunning, latestData, history, start, stop } = useCognitiveDataSimulator();

  return (
    <div className="container mx-auto">
      <div className="flex justify-end mb-6">
        <button
          onClick={isRunning ? stop : start}
          className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-600/30"
        >
          {isRunning ? <PauseIcon /> : <PlayIcon />}
          {isRunning ? 'Stop Simulation' : 'Start Simulation'}
        </button>
      </div>
      
      {!latestData && !isRunning ? (
        <div className="text-center py-20 flex flex-col items-center justify-center">
            <BrainWaveIcon />
            <h2 className="text-2xl font-bold mt-4 text-slate-100">Welcome to NeuroSpring</h2>
            <p className="text-slate-400 mt-2 max-w-md">Click 'Start Simulation' to begin receiving real-time cognitive analysis and personalized recommendations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="lg:col-span-2 xl:col-span-3">
            <RealTimeChart data={history} />
          </div>
          <div className="flex flex-col gap-6">
            <CognitiveMetricsCard data={latestData} />
          </div>
          <div className="lg:col-span-3 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InterventionsCard data={latestData} />
            <ModelExplanationCard data={latestData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
