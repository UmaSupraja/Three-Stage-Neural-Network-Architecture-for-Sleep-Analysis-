# A Multi-Model Three-Stage Deep Learning Architecture for Automated Sleep Disorder Diagnosis 🌙

[cite_start]An advanced medical informatics application that implements a hierarchical neural network framework for automated, scalable sleep screening and personalized clinical recommendations using multimodal physiological and lifestyle parameters[cite: 41, 78]. 

[cite_start]Traditional clinical sleep evaluation is expensive, time-consuming, and widely inaccessible[cite: 40, 73]. [cite_start]Simplistic single-stage machine learning approaches fail by oversimplifying the biological hierarchy of sleep, resulting in high validation error and problematic label leakage[cite: 61, 62, 74]. [cite_start]This framework mitigates those flaws by mapping clinical diagnostic reasoning into three clear, isolated processing tiers[cite: 64, 79].

🔗 **Production Deployment:** [Launch SleepGuard AI Portal](https://three-stage-neural-network-architecture-for-sleep-ewypo63ci.vercel.app/)

---

## 🧬 Hierarchical Three-Stage System Architecture

[cite_start]The pipeline processes continuous data streams sequentially through three decoupled operational layers[cite: 167]:

### 🧱 Stage 1: Sleep Stage Classification
[cite_start]Establishes baseline physiological contexts by classifying baseline macro-states into **REM** or **Non-REM** phases using key signal inputs like EEG, ECG, and EMG data[cite: 42, 65, 80].
* [cite_start]**Network Blueprint:** Binary Feed Forward Neural Network (FFNN)[cite: 42, 80].
* [cite_start]**Layer Configurations:** Input Layer ($N$ features) ➡️ Hidden Layer 1 (Dense 32 neurons, ReLU activation) ➡️ Hidden Layer 2 (Dense 16 neurons, ReLU activation) ➡️ Dropout Layer (0.2 regularization) ➡️ Output Layer (Dense 1 neuron, Sigmoid activation)[cite: 175].
* **Validated Performance:** * **Accuracy:** 92.4% 
  * **F1-Score:** 0.91 
  * **Precision:** 0.93 
  * **Recall:** 0.89 

### 🩺 Stage 2: Sleep Disorder Classification
[cite_start]Utilizes contextual classification maps from Stage 1 alongside patient profile variables to detect specific pathological states without introducing architectural data or label leakage[cite: 43, 66, 81, 82].
* [cite_start]**Network Blueprint:** Multiclass Softmax Neural Network Framework[cite: 43, 81].
* [cite_start]**Layer Configurations:** Input Layer (Physiological Features + Lifestyle + Stage 1 Sleep Type Prediction) ➡️ Hidden Layer 1 (Dense 64 neurons) ➡️ Hidden Layer 2 (Dense 32 neurons) ➡️ Dropout Layer ➡️ Output Layer (Softmax Multi-Class Activation)[cite: 183].
* [cite_start]**Target Diagnostic Output Classes:** Insomnia, Sleep Apnea, Narcolepsy, REM Behavior Disorder (RBD), or No Disorder Detected[cite: 43, 183].
* **Validated Performance:**
  * **Accuracy:** 88.7% 
  * **F1-Score:** 0.86 
  * **Precision:** 0.85 
  * **Recall:** 0.87 

### 💡 Stage 3: Generative Advisory Engine
[cite_start]Translates analytical predictions, biometric thresholds, and life factors into actionable, user-friendly behavioral hygiene strategies, mimicking real clinician advice[cite: 44, 67, 83, 200, 201].
* [cite_start]**Blueprint:** Rule-Based Expert Decision Logic coupled with secure environmental configurations via the Gemini Pro API[cite: 44, 167].
* [cite_start]**Advice Categories:** Diet & Nutrition, Sleep Routine & Hygiene, Physical Activity & Lifestyle, and Sleep Environment & Habits[cite: 202].

---

## 📊 Dataset Specifications

* [cite_start]**Source Repository:** Kaggle [Sleep Health and Bio-Signal Dataset](https://www.kaggle.com/datasets/ajithdari/sleep-health-and-bio-signal-dataset)[cite: 220].
* [cite_start]**Data Volume:** 5,000 total complete patient records containing 22 individual clinical parameters with no missing values[cite: 214, 222, 223, 224].
* **Target Cohort Distribution:** None/Healthy (46%), Insomnia (16%), Sleep Apnea (16%), REM Behavior Disorder (12%), and Narcolepsy (9%).
* [cite_start]**Clinical Vectors Collected:** * *Demographics & Behavior:* Gender, Age (27 to 59 years), Professional Occupation, BMI Category, and Physical Activity Rating[cite: 227].
  * [cite_start]*Sleep & Vitals:* Daily Sleep Duration (~7.1-hour average), Sleep Quality Score (4-9 scale), Stress Index (3-8 scale), Daily Walking Steps, Heart Rate, and Blood Pressure Metrics (`Systolic/Diastolic`)[cite: 228].

---

## ⚙️ Repository Installation & Core Setups

Follow these three separate setup pipelines to run the complete diagnostic framework locally:

### 🖥️ Setup 1: Frontend User Interface (React & Vite)
This runs the web interface including the clinical application diagnostics dashboard, data charts, and validation visualization environments.

1. Ensure [Node.js](https://nodejs.org/) (v18 or higher) is configured on your workstation.
2. Open your terminal in the root directory and install dependencies:
   ```bash
   npm install
