import React, { useState } from 'react';
import { PatientData, PredictionResult } from './types'; // ✅ Corrected root path
import { predictSleepDisorder } from './inferenceEngine'; // ✅ Corrected root path
import { Activity, ArrowRight, CheckCircle2, AlertTriangle, Moon, Sun, Brain } from 'lucide-react';

const InputForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState<PatientData>({
    gender: 'Male',
    age: 35,
    occupation: 'Engineer',
    sleepDuration: 7,
    qualityOfSleep: 7,
    physicalActivityLevel: 50,
    stressLevel: 5,
    bmiCategory: 'Normal',
    bloodPressure: '120/80',
    heartRate: 72,
    dailySteps: 6000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' || name === 'occupation' || name === 'bmiCategory' || name === 'bloodPressure' 
        ? value 
        : Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loading(true);
    setResult(null);
    try {
      const prediction = await predictSleepDisorder(formData);
      setResult(prediction);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Shared input style classes for consistency and easy updates
  const inputClasses = "w-full rounded-lg border-blue-100 bg-blue-50/30 text-slate-800 shadow-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 p-2.5 border transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-slate-600 mb-1.5";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <Activity className="w-6 h-6 text-blue-600 mr-2" />
          Patient Diagnostics
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className={inputClasses}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Occupation</label>
              <select name="occupation" value={formData.occupation} onChange={handleChange} className={inputClasses}>
                <option value="Engineer">Engineer</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Teacher">Teacher</option>
                <option value="Salesperson">Salesperson</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Accountant">Accountant</option>
                <option value="Scientist">Scientist</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
             <div>
              <label className={labelClasses}>BMI Category</label>
              <select name="bmiCategory" value={formData.bmiCategory} onChange={handleChange} className={inputClasses}>
                <option value="Normal">Normal</option>
                <option value="Overweight">Overweight</option>
                <option value="Obese">Obese</option>
              </select>
            </div>
          </div>

          <div className="space-y-5 pt-5 border-t border-slate-100">
             <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-3">Vitals & Activity</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Sleep Duration (hrs)</label>
                  <input type="number" step="0.1" name="sleepDuration" value={formData.sleepDuration} onChange={handleChange} className={inputClasses} />
                </div>
                 <div>
                  <label className={labelClasses}>Quality of Sleep (1-10)</label>
                  <input type="number" max="10" min="1" name="qualityOfSleep" value={formData.qualityOfSleep} onChange={handleChange} className={inputClasses} />
                </div>
                 <div>
                  <label className={labelClasses}>Stress Level (1-10)</label>
                  <input type="number" max="10" min="1" name="stressLevel" value={formData.stressLevel} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Daily Steps</label>
                  <input type="number" name="dailySteps" value={formData.dailySteps} onChange={handleChange} className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Blood Pressure</label>
                  <input type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} placeholder="e.g. 120/80" className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Heart Rate</label>
                  <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} className={inputClasses} />
                </div>
             </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all shadow-blue-200/50"
          >
            {loading ? (
              <>Processing Clinical Data...</>
            ) : (
              <>
                Run Prediction <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {!result && !loading && (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <Activity className="w-16 h-16 mb-4 text-blue-200" />
            <h3 className="text-lg font-medium text-slate-600">No Prediction Yet</h3>
            <p className="max-w-xs mt-2 text-sm">Enter patient data and execute the ML pipeline to see stage-wise classification and recommendations.</p>
          </div>
        )}

        {loading && (
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full min-h-[400px] flex flex-col items-center justify-center p-8">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
             <p className="text-slate-600 font-medium animate-pulse">Running Neural Network...</p>
             <p className="text-slate-400 text-sm mt-2">Analyzing Vitals and Demographics</p>
           </div>
        )}

        {result && (
          <>
            {/* Stage 1 & 2 Results */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
               <div className="bg-blue-900 p-4 text-white flex justify-between items-center">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Brain className="w-5 h-5 mr-2" /> 
                    Diagnostic Results
                  </h3>
                  <span className="text-xs bg-blue-800 px-2 py-1 rounded">Confidence: {(result.stage2.confidence * 100).toFixed(1)}%</span>
               </div>
               <div className="p-6 grid grid-cols-2 gap-8">
                  <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Stage 1: Sleep Type</p>
                    <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-slate-800">
                       {result.stage1.sleepType === 'REM' ? <Moon className="w-6 h-6 text-indigo-500" /> : <Sun className="w-6 h-6 text-amber-500" />}
                       <span>{result.stage1.sleepType}</span>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Stage 2: Disorder</p>
                    
                    {/* Visual fix for 'None' disorder type */}
                    {result.stage2.disorder === 'None' ? (
                       <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-emerald-600">
                           <CheckCircle2 className="w-6 h-6" />
                           <span>No Disorder Detected</span>
                       </div>
                    ) : (
                       <div className="flex items-center justify-center space-x-2 text-2xl font-bold text-amber-600">
                           <AlertTriangle className="w-6 h-6" />
                           <span>{result.stage2.disorder}</span>
                       </div>
                    )}
                    
                  </div>
               </div>
            </div>

            {/* Stage 3 Recommendations */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
              <div className="bg-blue-50/50 p-4 border-b border-blue-100">
                <h3 className="font-semibold text-lg text-slate-800 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-blue-600" />
                  Stage 3: Advisory Engine
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {result.stage3.recommendations.map((rec, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold text-blue-900 mb-2">{rec.category}</h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm marker:text-blue-300">
                      {rec.advice.length > 0 ? (
                        rec.advice.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))
                      ) : (
                         <li className="text-slate-400 italic">No specific recommendations. Maintain healthy habits.</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InputForm;
