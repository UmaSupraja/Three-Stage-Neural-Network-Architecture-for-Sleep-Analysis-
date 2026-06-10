import { PatientData, SleepStage, SleepDisorder, PredictionResult } from '../types';

/**
 * MOCK INFERENCE ENGINE
 * 
 * In a real-world scenario, this service would make an API call to the Python backend (FastAPI/Flask)
 * serving the trained Keras models.
 * 
 * For this fully frontend implementation, we simulate the model logic based on the patterns 
 * observed in the provided dataset.
 */

export const predictSleepDisorder = async (data: PatientData): Promise<PredictionResult> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));

  // --- STAGE 1: Sleep Stage Prediction (REM vs Non-REM) ---
  // Updated Logic without EEG:
  // Non-REM Disorders (Insomnia, Sleep Apnea): Strongly correlated with BMI (Obese), High BP, Low Sleep Duration.
  // REM Disorders (Narcolepsy, RBD): Correlated with Age (RBD > 50), Stress, and lack of physical health comorbidities.

  let sleepTypeScore = 0; // < 0 => Non-REM, > 0 => REM
  
  // Extract BP
  const [systolic, diastolic] = data.bloodPressure.split('/').map(Number);
  const isHighBP = systolic > 130 || diastolic > 85;

  // Factors pushing towards Non-REM (Apnea/Insomnia)
  if (data.bmiCategory === 'Obese' || data.bmiCategory === 'Overweight') sleepTypeScore -= 0.4;
  if (isHighBP) sleepTypeScore -= 0.2;
  if (data.sleepDuration < 6.2) sleepTypeScore -= 0.3; // Insomnia indicator

  // Factors pushing towards REM (RBD/Narcolepsy)
  // RBD often affects older males
  if (data.age > 50 && data.gender === 'Male') sleepTypeScore += 0.4;
  
  // Narcolepsy / Stress induced REM issues
  if (data.stressLevel > 6) sleepTypeScore += 0.3;
  if (data.age < 30 && data.qualityOfSleep < 6) sleepTypeScore += 0.2; // Young, poor sleep quality despite duration

  const stage1Prediction = sleepTypeScore > 0 ? SleepStage.REM : SleepStage.NON_REM;
  const stage1Confidence = 0.75 + (Math.random() * 0.2); // Random confidence 0.75-0.95

  // --- STAGE 2: Disorder Classification ---
  let disorder: SleepDisorder = SleepDisorder.NONE;
  
  if (stage1Prediction === SleepStage.REM) {
    // Decide between Narcolepsy and RBD based on Age/Gender/Stress
    if (data.age > 45 && data.gender === 'Male') {
      disorder = SleepDisorder.REM_BEHAVIOR_DISORDER;
    } else {
      // Younger or Female implies Narcolepsy in this synthetic distribution
      disorder = SleepDisorder.NARCOLEPSY;
    }
  } else {
    // Non-REM: Insomnia, Sleep Apnea, or None
    if (data.bmiCategory === 'Obese' || isHighBP || data.bmiCategory === 'Overweight') {
      disorder = SleepDisorder.SLEEP_APNEA;
    } else if (data.sleepDuration < 6.5 || data.qualityOfSleep < 6 || data.stressLevel > 6) {
      disorder = SleepDisorder.INSOMNIA;
    } else {
       // If healthy stats
       if (data.sleepDuration > 6.0 && data.stressLevel < 7) {
         disorder = SleepDisorder.NONE;
       } else {
         // Default fallback if stats are borderline bad
         disorder = SleepDisorder.INSOMNIA; 
       }
    }
  }

  const stage2Confidence = 0.8 + (Math.random() * 0.15);

  // --- STAGE 3: Advisory Engine ---
  const recommendations = generateRecommendations(data, disorder);

  return {
    stage1: {
      sleepType: stage1Prediction,
      confidence: stage1Confidence
    },
    stage2: {
      disorder: disorder,
      confidence: stage2Confidence
    },
    stage3: {
      recommendations
    }
  };
};

const generateRecommendations = (data: PatientData, disorder: SleepDisorder) => {
  const recs = [
    {
      category: "Diet & Nutrition",
      advice: [] as string[]
    },
    {
      category: "Sleep Routine & Hygiene",
      advice: [] as string[]
    },
    {
      category: "Physical Activity & Lifestyle",
      advice: [] as string[]
    },
    {
      category: "Sleep Environment & Habits",
      advice: [] as string[]
    }
  ];

  // 1. Diet & Nutrition
  if (data.bmiCategory === 'Obese' || data.bmiCategory === 'Overweight') {
    recs[0].advice.push("Consider a caloric deficit diet to manage BMI, which is a key factor in Sleep Apnea.");
    recs[0].advice.push("Avoid heavy meals at least 3 hours before bedtime.");
  }
  if (disorder === SleepDisorder.INSOMNIA) {
    recs[0].advice.push("Strictly limit caffeine intake after 2 PM.");
  }
  // Default advice if no specific issues
  if (recs[0].advice.length === 0) {
    recs[0].advice.push("Maintain a balanced diet rich in magnesium and zinc.");
    recs[0].advice.push("Hydrate well throughout the day, but reduce intake before bed.");
  }

  // 2. Sleep Routine
  if (data.sleepDuration < 7) {
    recs[1].advice.push("Aim to strictly adhere to a consistent bedtime, even on weekends.");
    recs[1].advice.push("Implement a 30-minute 'wind-down' routine without screens.");
  }
  // Default advice
  if (recs[1].advice.length === 0) {
    recs[1].advice.push("Continue your consistent sleep schedule.");
    recs[1].advice.push("Avoid blue light exposure 1 hour before sleep.");
  }

  // 3. Physical Activity
  if (data.dailySteps < 6000) {
    recs[2].advice.push("Increasing daily steps to at least 8,000 can improve sleep depth.");
    recs[2].advice.push("Try to get 20 minutes of sunlight exposure in the morning.");
  } else {
    // If active, give positive reinforcement or advanced advice
    recs[2].advice.push("Excellent activity level. Maintaining >6,000 steps helps regulate circadian rhythms.");
    recs[2].advice.push("Avoid high-intensity interval training (HIIT) within 2 hours of bedtime.");
  }
  
  if (disorder === SleepDisorder.NARCOLEPSY) {
    recs[2].advice.push("Schedule short, planned naps (15-20 mins) during the day to manage drowsiness.");
  }

  // 4. Environment
  if (data.stressLevel > 5) {
    recs[3].advice.push("High stress detected. Consider mindfulness meditation or progressive muscle relaxation before bed.");
  }
  if (disorder === SleepDisorder.SLEEP_APNEA) {
    recs[3].advice.push("Try sleeping on your side instead of your back to keep airways open.");
  }
  // Default advice
  if (recs[3].advice.length === 0) {
    recs[3].advice.push("Ensure bedroom is cool (around 18-20°C) and completely dark.");
    recs[3].advice.push("Use white noise if you are sensitive to sound.");
  }

  return recs;
};