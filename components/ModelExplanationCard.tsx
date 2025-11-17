
import React from 'react';
import { CognitiveData } from '../types';

interface ModelExplanationCardProps {
    data: CognitiveData | null;
}

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);

const ModelExplanationCard: React.FC<ModelExplanationCardProps> = ({ data }) => {
    const formatFeatureName = (feature: string) => {
        return feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };
    
    return (
        <div className="bg-slate-800 rounded-lg p-4 shadow-lg h-full">
            <div className="flex items-center gap-3 mb-4">
                <InfoIcon />
                <h3 className="text-lg font-semibold text-slate-100">AI Model Explanation (XAI)</h3>
            </div>
             {!data ? (
                 <div className="animate-pulse">
                    <div className="h-10 bg-slate-700 rounded mb-4"></div>
                    <div className="space-y-2">
                        <div className="h-6 bg-slate-700 rounded"></div>
                        <div className="h-6 bg-slate-700 rounded"></div>
                        <div className="h-6 bg-slate-700 rounded"></div>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-sm text-slate-400 bg-slate-900/50 p-3 rounded-md mb-4">
                        {data.xai_explanations.summary}
                    </p>
                    <ul className="space-y-2">
                        {data.xai_explanations.feature_impacts.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm p-2 bg-slate-700/50 rounded">
                                <span className="text-slate-300">{formatFeatureName(item.feature)}</span>
                                <span className={`font-semibold px-2 py-0.5 rounded text-xs ${item.impact > 0 ? 'text-green-300 bg-green-500/20' : 'text-red-300 bg-red-500/20'}`}>
                                    {item.impact > 0 ? '+' : ''}{item.impact.toFixed(3)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ModelExplanationCard;
