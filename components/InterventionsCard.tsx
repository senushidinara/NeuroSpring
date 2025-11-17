
import React from 'react';
import { CognitiveData } from '../types';

interface InterventionsCardProps {
    data: CognitiveData | null;
}

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);

const InterventionsCard: React.FC<InterventionsCardProps> = ({ data }) => {
    return (
        <div className="bg-slate-800 rounded-lg p-4 shadow-lg h-full">
            <div className="flex items-center gap-3 mb-4">
                <LightbulbIcon />
                <h3 className="text-lg font-semibold text-slate-100">Personalized Interventions</h3>
            </div>
            {!data ? (
                <ul className="space-y-3 animate-pulse">
                   <li className="h-4 bg-slate-700 rounded w-full"></li>
                   <li className="h-4 bg-slate-700 rounded w-5/6"></li>
                   <li className="h-4 bg-slate-700 rounded w-3/4"></li>
                </ul>
            ) : (
                <ul className="space-y-2">
                    {data.interventions.map((item, index) => (
                        <li key={index} className="text-slate-300 text-sm p-2 bg-slate-700/50 rounded">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InterventionsCard;
