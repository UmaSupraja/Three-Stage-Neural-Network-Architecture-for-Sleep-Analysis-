import React from 'react';
import { FileText, Copy } from 'lucide-react';

const PYTHON_CODE = `import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import classification_report
import joblib

# ==========================================
# 1. DATA LOADING
# ==========================================
def load_data(filepath):
    """Loads dataset from CSV."""
    df = pd.read_csv(filepath)
    return df

# ==========================================
# 2. FEATURE ENGINEERING (STAGE 1 PREP)
# ==========================================
def prepare_stage1_targets(df):
    """
    Creates target variable for Stage 1: Sleep Type
    REM (1): REM Behavior Disorder, Narcolepsy
    Non-REM (0): Insomnia, Sleep Apnea, None
    """
    def map_sleep_type(disorder):
        if disorder in ['REM Behavior Disorder', 'Narcolepsy']:
            return 1
        return 0

    df['Sleep_Type_Target'] = df['Sleep Disorder'].apply(map_sleep_type)
    return df

# ==========================================
# 3. PREPROCESSING PIPELINE
# ==========================================
def get_preprocessor(numeric_features, categorical_features):
    """Creates a scikit-learn preprocessor."""
    numeric_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(handle_unknown='ignore')

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    return preprocessor

# ... (Full code as defined in the solution)`;

const PythonCodeViewer: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-700">
      <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-teal-400" />
          <span className="text-white font-mono text-sm">backend_pipeline.py</span>
        </div>
        <button 
          onClick={() => navigator.clipboard.writeText(PYTHON_CODE)}
          className="text-slate-400 hover:text-white transition-colors"
          title="Copy Code"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-slate-300 leading-relaxed">
          <code>{PYTHON_CODE}</code>
        </pre>
      </div>
      <div className="bg-slate-800 p-3 text-xs text-slate-400 text-center border-t border-slate-700">
        This code is designed to be run in a Google Colab or local Python 3.8+ environment with TensorFlow and Scikit-Learn installed.
      </div>
    </div>
  );
};

export default PythonCodeViewer;