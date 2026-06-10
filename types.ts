export interface PatientData {
  gender: 'Male' | 'Female';
  age: number;
  occupation: string;
  sleepDuration: number;
  qualityOfSleep: number;
  physicalActivityLevel: number;
  stressLevel: number;
  bmiCategory: string;
  bloodPressure: string; // Systolic/Diastolic
  heartRate: number;
  dailySteps: number;
}

export enum SleepStage {
  REM = 'REM',
  NON_REM = 'Non-REM',
}

export enum SleepDisorder {
  NONE = 'None',
  INSOMNIA = 'Insomnia',
  SLEEP_APNEA = 'Sleep Apnea',
  NARCOLEPSY = 'Narcolepsy',
  REM_BEHAVIOR_DISORDER = 'REM Behavior Disorder',
}

export interface PredictionResult {
  stage1: {
    sleepType: SleepStage;
    confidence: number;
  };
  stage2: {
    disorder: SleepDisorder;
    confidence: number;
  };
  stage3: {
    recommendations: {
      category: string;
      advice: string[];
    }[];
  };
}