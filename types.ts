
export enum CognitiveState {
  HighFocus = 'high_focus',
  ModerateFocus = 'moderate_focus',
  Fatigue = 'fatigue',
  Stress = 'stress',
}

export interface BandPowers {
  delta: number;
  theta: number;
  alpha: number;
  beta: number;
  gamma: number;
}

export interface FeatureImpact {
  feature: string;
  impact: number;
}

export interface CognitiveData {
  timestamp: number;
  cognitive_state: CognitiveState;
  confidence: number;
  focus_score: number;
  cognitive_load: number;
  band_powers: BandPowers;
  xai_explanations: {
    feature_impacts: FeatureImpact[];
    summary: string;
  };
  interventions: string[];
}
