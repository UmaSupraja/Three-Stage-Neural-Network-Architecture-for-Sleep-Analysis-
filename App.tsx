import React, { useState } from 'react';
import { Activity, Brain, LayoutDashboard, Stethoscope } from 'lucide-react';
import InputForm from './src/components/InputForm';
import Dashboard from './src/components/Dashboard';
import ModelEvaluation from './src/components/ModelEvaluation';

enum Tab {
  PREDICT = 'PREDICT',
  DASHBOARD = 'DASHBOARD',
  EVALUATION = 'EVALUATION',
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PREDICT);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.PREDICT:
        return <InputForm />;
      case Tab.DASHBOARD:
        return <Dashboard />;
      case Tab.EVALUATION:
        return <ModelEvaluation />;
      default:
        return <InputForm />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-blue-900 text-white flex-shrink-0">
        <div className="p-6 flex items-center space-x-3 border-b border-blue-800">
          <Brain className="w-8 h-8 text-blue-300" />
          <span className="text-xl font-bold tracking-tight">SleepGuard AI</span>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab(Tab.PREDICT)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === Tab.PREDICT ? 'bg-blue-800 text-white shadow-sm' : 'text-blue-100 hover:bg-blue-800/50'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            <span className="font-medium">Prediction</span>
          </button>
          <button
            onClick={() => setActiveTab(Tab.DASHBOARD)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === Tab.DASHBOARD ? 'bg-blue-800 text-white shadow-sm' : 'text-blue-100 hover:bg-blue-800/50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Data Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab(Tab.EVALUATION)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === Tab.EVALUATION ? 'bg-blue-800 text-white shadow-sm' : 'text-blue-100 hover:bg-blue-800/50'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-medium">Model Evaluation</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
