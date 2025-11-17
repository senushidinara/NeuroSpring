
import { CognitiveState } from './types';

interface StateMetadata {
  label: string;
  color: string;
  baseMetrics: {
    focus_score: [number, number];
    cognitive_load: [number, number];
    confidence: [number, number];
  };
  interventions: string[];
  xaiSummary: string;
}

export const STATE_METADATA: Record<CognitiveState, StateMetadata> = {
  [CognitiveState.HighFocus]: {
    label: 'High Focus',
    color: 'bg-green-500',
    baseMetrics: {
      focus_score: [80, 100],
      cognitive_load: [30, 60],
      confidence: [0.85, 0.98],
    },
    interventions: ['Maintain current workflow.', 'You are in the zone!'],
    xaiSummary: 'High alpha and beta wave activity strongly indicate a focused state.',
  },
  [CognitiveState.ModerateFocus]: {
    label: 'Moderate Focus',
    color: 'bg-blue-500',
    baseMetrics: {
      focus_score: [50, 79],
      cognitive_load: [50, 75],
      confidence: [0.70, 0.90],
    },
    interventions: ['Stay on task, minimize distractions.', 'Consider a short 2-minute stretch.'],
    xaiSummary: 'Balanced brainwave activity suggests stable but not peak concentration.',
  },
  [CognitiveState.Fatigue]: {
    label: 'Fatigue',
    color: 'bg-orange-500',
    baseMetrics: {
      focus_score: [20, 49],
      cognitive_load: [60, 85],
      confidence: [0.65, 0.88],
    },
    interventions: ['Take a 5-minute break.', 'Try the 20-20-20 rule for eye strain.', 'Hydrate with water.'],
    xaiSummary: 'Increased theta wave power is a key indicator of drowsiness or fatigue.',
  },
  [CognitiveState.Stress]: {
    label: 'Stress',
    color: 'bg-red-500',
    baseMetrics: {
      focus_score: [10, 35],
      cognitive_load: [70, 95],
      confidence: [0.75, 0.95],
    },
    interventions: ['Take a 5-minute break with deep breathing.', 'A short mindfulness exercise is recommended.', 'Listen to calming music.'],
    xaiSummary: 'High beta and gamma activity, combined with a high theta/beta ratio, points towards cognitive stress.',
  },
};

export const COGNITIVE_STATES = Object.values(CognitiveState);
