import React from 'react';
import { CognitiveData } from '../types';
import { STATE_METADATA } from '../constants';

interface CognitiveMetricsCardProps {
  data: CognitiveData | null;
  onRequestNewIntervention: () => void;
}

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.44.82 2.73 2 3.52V15a3.5 3.5 0 0 0-3.5 3.5c0 .35.07.68.18.99A4.5 4.5 0 0 0 12 22a4.5 4.5 0 0 0 5.32-3.51c.11-.31.18-.64.18-.99a3.5 3.5 0 0 0-3.5-3.5V10.02c1.18-.79 2-2.08 2-3.52A4.5 4.5 0 0 0 12 2Z"/></svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9L12 21l1.9-4.8 4.8-1.9-4.8-1.9L12 3z"/><path d="M5 8h2"/><path d="M17 16h2"/><path d="M8 5v2"/><path d="M16 17v2"/></svg>
);

const MetricItem: React.FC<{ icon: React.ReactNode; label: string; value: string; progress: number; progressColor: string; }> = ({ icon, label, value, progress, progressColor }) => (
    <div>
        <div className="flex justify-between items-center mb-1 text-sm">
            <div className="flex items-center gap-2">
                {icon}
                <span className="font-medium text-slate-300">{label}</span>
            </div>
            <span className="font-semibold text-slate-100">{value}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
            <div className={`${progressColor} h-2 rounded-full transition-all duration-500`} style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);

const CognitiveMetricsCard: React.FC<CognitiveMetricsCardProps> = ({ data, onRequestNewIntervention }) => {
  if (!data) {
    return (
        <div className="bg-slate-800 rounded-lg p-4 shadow-lg animate-pulse">
             <div className="h-6 bg-slate-700 rounded w-3/4 mb-6"></div>
             <div className="space-y-6">
                <div className="h-8 bg-slate-700 rounded"></div>
                <div className="h-8 bg-slate-700 rounded"></div>
                <div className="h-8 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2 mt-8 mb-4"></div>
                <div className="h-6 bg-slate-700 rounded"></div>
                <div className="h-6 bg-slate-700 rounded"></div>
             </div>
        </div>
    );
  }

  const { cognitive_state, focus_score, cognitive_load, confidence, band_powers } = data;
  const stateMeta = STATE_METADATA[cognitive_state];

  const getLoadColor = (load: number) => {
    if (load < 50) return 'bg-green-500';
    if (load < 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg flex flex-col gap-5 transition-transform duration-200 hover:scale-[1.02] cursor-pointer">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-slate-100">Cognitive Metrics</h3>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full text-white ${stateMeta.color}`}>{stateMeta.label}</span>
      </div>

      <MetricItem icon={<BrainIcon />} label="Focus Score" value={`${focus_score.toFixed(0)}%`} progress={focus_score} progressColor="bg-cyan-500" />
      <MetricItem icon={<ActivityIcon />} label="Cognitive Load" value={`${cognitive_load.toFixed(0)}%`} progress={cognitive_load} progressColor={getLoadColor(cognitive_load)} />
      <MetricItem icon={<ZapIcon />} label="Model Confidence" value={`${(confidence * 100).toFixed(0)}%`} progress={confidence * 100} progressColor="bg-purple-500" />

      <div>
        <h4 className="text-sm font-medium text-slate-300 mb-3">EEG Frequency Bands</h4>
        <div className="space-y-3">
          {Object.entries(band_powers).map(([band, power]) => {
            const bandPower = power as number;
            const MAX_POWER = 3.0; 
            const percentage = Math.min((bandPower / MAX_POWER) * 100, 100);
            
            const BAND_COLORS: Record<string, string> = {
                delta: 'bg-indigo-500',
                theta: 'bg-sky-500',
                alpha: 'bg-emerald-500',
                beta: 'bg-amber-500',
                gamma: 'bg-red-500',
            };

            return (
              <div key={band} className="grid grid-cols-6 gap-2 items-center text-xs">
                <span className="col-span-1 capitalize text-slate-400 font-medium">{band}</span>
                <div className="col-span-4 w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`${BAND_COLORS[band] || 'bg-slate-500'} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="col-span-1 font-mono text-slate-300 text-right font-semibold">{bandPower.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-1">
        <button
          onClick={onRequestNewIntervention}
          disabled={!data}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-cyan-200 bg-cyan-600/20 rounded-lg hover:bg-cyan-600/40 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Suggest a new intervention"
        >
          <SparklesIcon />
          New Suggestion
        </button>
      </div>

    </div>
  );
};

export default CognitiveMetricsCard;