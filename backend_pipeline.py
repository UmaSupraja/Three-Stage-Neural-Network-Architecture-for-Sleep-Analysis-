import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import classification_report, confusion_matrix
import joblib

# ==========================================
# 1. CONFIGURATION & SETUP
# ==========================================
SEED = 42
np.random.seed(SEED)
tf.random.set_seed(SEED)

CATEGORICAL_FEATURES = ['Gender', 'Occupation', 'BMI Category']
NUMERIC_FEATURES = [
    'Age', 'Sleep Duration', 'Quality of Sleep',
    'Physical Activity Level', 'Stress Level',
    'Heart Rate', 'Daily Steps',
    'Systolic_BP', 'Diastolic_BP'
]

# ==========================================
# 2. DATA LOADING & PREPARATION
# ==========================================
def load_and_preprocess_data(filepath):
    df = pd.read_csv(filepath)

    # Split Blood Pressure column
    df[['Systolic_BP', 'Diastolic_BP']] = (
        df['Blood Pressure'].str.split('/', expand=True).astype(int)
    )
    df.drop('Blood Pressure', axis=1, inplace=True)

    return df


def prepare_stage1_targets(df):
    rem_disorders = ['REM Behavior Disorder', 'Narcolepsy']
    df['Stage1_Target'] = df['Sleep Disorder'].apply(
        lambda x: 1 if x in rem_disorders else 0
    )
    return df


def prepare_stage2_targets(df):
    label_map = {
        'None': 0,
        'Insomnia': 1,
        'Sleep Apnea': 2,
        'Narcolepsy': 3,
        'REM Behavior Disorder': 4
    }
    df['Stage2_Target'] = df['Sleep Disorder'].map(label_map)
    return df, label_map

# ==========================================
# 3. PIPELINE DEFINITION
# ==========================================
def build_preprocessor():
    numeric_transformer = StandardScaler()
    categorical_transformer = OneHotEncoder(
        handle_unknown='ignore',
        sparse=False  # FIXED (no logic change)
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, NUMERIC_FEATURES),
            ('cat', categorical_transformer, CATEGORICAL_FEATURES)
        ]
    )
    return preprocessor


def build_neural_network(input_dim, output_dim, output_activation='softmax'):
    model = keras.Sequential([
        layers.Dense(64, activation='relu', input_shape=(input_dim,)),
        layers.Dropout(0.3),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(16, activation='relu'),
        layers.Dense(output_dim, activation=output_activation)
    ])

    loss_fn = (
        'binary_crossentropy'
        if output_dim == 1
        else 'sparse_categorical_crossentropy'
    )

    model.compile(
        optimizer='adam',
        loss=loss_fn,
        metrics=['accuracy']
    )
    return model

# ==========================================
# 4. TRAINING EXECUTION
# ==========================================
def run_training_pipeline(data_path='sleep_health_dataset.csv'):
    print("Loading Data...")
    df = load_and_preprocess_data(data_path)
    df = prepare_stage1_targets(df)
    df, label_map = prepare_stage2_targets(df)

    X = df.drop(
        ['Person ID', 'Sleep Disorder', 'Stage1_Target', 'Stage2_Target'],
        axis=1,
        errors='ignore'
    )
    y_stage1 = df['Stage1_Target']
    y_stage2 = df['Stage2_Target']

    X_train, X_test, y1_train, y1_test, y2_train, y2_test = train_test_split(
        X, y_stage1, y_stage2,
        test_size=0.2,
        random_state=SEED
    )

    print("Preprocessing Data...")
    preprocessor = build_preprocessor()
    X_train_processed = preprocessor.fit_transform(X_train)
    X_test_processed = preprocessor.transform(X_test)

    input_dim = X_train_processed.shape[1]
 
    # -------- STAGE 1 --------
    print("\n--- Training Stage 1 ---")
    model_stage1 = build_neural_network(input_dim, 1, 'sigmoid')
    model_stage1.fit(
        X_train_processed, y1_train,
        epochs=50,
        batch_size=32,
        validation_split=0.2,
        verbose=0
    )

    loss, acc = model_stage1.evaluate(X_test_processed, y1_test, verbose=0)
    print(f"Stage 1 Accuracy: {acc:.4f}")

    # -------- STAGE 2 --------
    print("\n--- Training Stage 2 ---")
    model_stage2 = build_neural_network(input_dim, len(label_map), 'softmax')
    model_stage2.fit(
        X_train_processed, y2_train,
        epochs=60,
        batch_size=32,
        validation_split=0.2,
        verbose=0
    )

    loss, acc = model_stage2.evaluate(X_test_processed, y2_test, verbose=0)
    print(f"Stage 2 Accuracy: {acc:.4f}")

    # -------- SAVE --------
    os.makedirs('models', exist_ok=True)
    model_stage1.save('models/sleep_stage_classifier.h5')
    model_stage2.save('models/disorder_classifier.h5')
    joblib.dump(preprocessor, 'models/preprocessor.pkl')

    print("Pipeline Complete.")

# ==========================================
# ENTRY POINT
# ==========================================
if __name__ == "__main__":
    run_training_pipeline()
