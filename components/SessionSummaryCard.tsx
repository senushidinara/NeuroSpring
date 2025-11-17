import React, { useMemo } from 'react';
import { CognitiveData, CognitiveState } from '../types';
import { STATE_METADATA } from '../constants';

interface SessionSummaryCardProps {
    history: CognitiveData[];
}

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);


const SessionSummaryCard: React.FC<SessionSummaryCardProps> = ({ history }) => {
    const summary = useMemo(() => {
        if (history.length === 0) return null;

        const totalDurationSeconds = history.length;
        const totalFocus = history.reduce((acc, d) => acc + d.focus_score, 0);
        const totalLoad = history.reduce((acc, d) => acc + d.cognitive_load, 0);
        
        const stateCounts = history.reduce((acc, d) => {
            acc[d.cognitive_state] = (acc[d.cognitive_state] || 0) + 1;
            return acc;
        }, {} as Record<CognitiveState, number>);

        const stateDistribution = Object.entries(stateCounts).map(([state, count]) => ({
            state: state as CognitiveState,
            // FIX: Cast count to number. Object.entries can infer values as unknown.
            percentage: ((count as number) / totalDurationSeconds) * 100,
        })).sort((a,b) => b.percentage - a.percentage);

        return {
            duration: `${Math.floor(totalDurationSeconds / 60)}m ${totalDurationSeconds % 60}s`,
            avgFocus: totalFocus / totalDurationSeconds,
            avgLoad: totalLoad / totalDurationSeconds,
            stateDistribution
        };
    }, [history]);

    if (!summary) return null;

    return (
        <div className="bg-slate-800 rounded-lg p-4 shadow-lg transition-transform duration-200 hover:scale-[1.01] cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
                <ChartBarIcon />
                <h3 className="text-lg font-semibold text-slate-100">Session Summary</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Key Metrics */}
                <div className="flex flex-col justify-center items-center bg-slate-700/50 p-4 rounded-lg">
                    <span className="text-sm text-slate-400">Duration</span>
                    <span className="text-2xl font-bold text-slate-100">{summary.duration}</span>
                </div>
                <div className="flex flex-col justify-center items-center bg-slate-700/50 p-4 rounded-lg">
                    <span className="text-sm text-slate-400">Avg. Focus Score</span>
                    <span className="text-2xl font-bold text-cyan-400">{summary.avgFocus.toFixed(0)}%</span>
                </div>
                <div className="flex flex-col justify-center items-center bg-slate-700/50 p-4 rounded-lg">
                    <span className="text-sm text-slate-400">Avg. Cognitive Load</span>
                    <span className="text-2xl font-bold text-orange-400">{summary.avgLoad.toFixed(0)}%</span>
                </div>

                {/* State Distribution */}
                <div className="md:col-span-3">
                     <h4 className="text-sm font-medium text-slate-300 mb-2">Time in Cognitive States</h4>
                     <div className="space-y-2">
                        {summary.stateDistribution.map(({ state, percentage }) => {
                            const meta = STATE_METADATA[state];
                            return (
                                <div key={state}>
                                    <div className="flex justify-between items-center text-xs mb-1">
                                        <span className="text-slate-300">{meta.label}</span>
                                        <span className="font-semibold text-slate-200">{percentage.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                                        <div className={`${meta.color} h-2.5 rounded-full`} style={{width: `${percentage}%`}}></div>
                                    </div>
                                </div>
                            );
                        })}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default SessionSummaryCard;