
import { useState, useEffect, useRef, useCallback } from 'react';
import { CognitiveData, CognitiveState, FeatureImpact } from '../types';
import { COGNITIVE_STATES, STATE_METADATA } from '../constants';

const HISTORY_LENGTH = 120; // Keep 2 minutes of data (120 seconds)

const getRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;

const generateDummyExplanations = (): FeatureImpact[] => {
    const features = ['theta_power', 'beta_power', 'alpha_power', 'gamma_power', 'theta_beta_ratio'];
    return features.map(feature => ({
        feature,
        impact: getRandomValue(-0.3, 0.3)
    }));
};

export const useCognitiveDataSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [latestData, setLatestData] = useState<CognitiveData | null>(null);
  const [history, setHistory] = useState<CognitiveData[]>([]);
  const intervalRef = useRef<number | null>(null);

  const generateNewDataPoint = useCallback(() => {
    const randomState = COGNITIVE_STATES[Math.floor(Math.random() * COGNITIVE_STATES.length)];
    const metadata = STATE_METADATA[randomState];

    const newData: CognitiveData = {
      timestamp: Date.now(),
      cognitive_state: randomState,
      focus_score: getRandomValue(metadata.baseMetrics.focus_score[0], metadata.baseMetrics.focus_score[1]),
      cognitive_load: getRandomValue(metadata.baseMetrics.cognitive_load[0], metadata.baseMetrics.cognitive_load[1]),
      confidence: getRandomValue(metadata.baseMetrics.confidence[0], metadata.baseMetrics.confidence[1]),
      band_powers: {
        delta: getRandomValue(0.1, 1.5),
        theta: getRandomValue(0.2, 2.0),
        alpha: getRandomValue(0.3, 2.5),
        beta: getRandomValue(0.2, 2.2),
        gamma: getRandomValue(0.1, 1.0),
      },
      xai_explanations: {
        feature_impacts: generateDummyExplanations(),
        summary: metadata.xaiSummary,
      },
      interventions: metadata.interventions,
    };

    setLatestData(newData);
    setHistory(prevHistory => {
        const newHistory = [...prevHistory, newData];
        if (newHistory.length > HISTORY_LENGTH) {
            return newHistory.slice(newHistory.length - HISTORY_LENGTH);
        }
        return newHistory;
    });
  }, []);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      // Generate first point immediately
      generateNewDataPoint();
      intervalRef.current = window.setInterval(generateNewDataPoint, 1000);
    }
  }, [isRunning, generateNewDataPoint]);

  const stop = useCallback(() => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }, [isRunning]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { isRunning, latestData, history, start, stop };
};
