import React, { useEffect, useState } from 'react';
import { Brain, Cpu, Database, CheckCircle2 } from 'lucide-react';
import { ProcessingStage } from '../types';

interface Props {
  onComplete: () => void;
}

export const AnalysisSimulation: React.FC<Props> = ({ onComplete }) => {
  const [stage, setStage] = useState<ProcessingStage>('SVM');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // 4 seconds total

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 30) setStage('SVM');
    else if (progress < 60) setStage('XGBOOST');
    else if (progress < 90) setStage('DECISION_TREE');
    else if (progress < 100) setStage('AGGREGATING');
    else {
      setStage('COMPLETE');
      setTimeout(onComplete, 800);
    }
  }, [progress, onComplete]);

  const getStageLabel = () => {
    switch(stage) {
      case 'SVM': return 'Running Support Vector Machine (SVM)...';
      case 'XGBOOST': return 'Optimizing with XGBoost Classifier...';
      case 'DECISION_TREE': return 'Traversing Decision Trees...';
      case 'AGGREGATING': return 'Aggregating predictions...';
      case 'COMPLETE': return 'Analysis Complete';
      default: return 'Initializing...';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 animate-fade-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse-slow"></div>
        {stage === 'COMPLETE' ? (
          <CheckCircle2 className="w-20 h-20 text-accent relative z-10" />
        ) : (
          <Cpu className="w-20 h-20 text-accent relative z-10 animate-spin" style={{ animationDuration: '3s' }} />
        )}
      </div>

      <h2 className="text-2xl font-bold font-mono text-white mb-2">AI Career Analysis</h2>
      <p className="text-slate-400 mb-8 max-w-md h-6">{getStageLabel()}</p>

      {/* Terminal Output Simulation */}
      <div className="w-full max-w-md bg-black/50 rounded-lg border border-slate-800 p-4 font-mono text-xs text-left overflow-hidden h-32 flex flex-col-reverse">
        <div className="space-y-1">
          {progress > 90 && <p className="text-green-400">> Finalizing ranking weights...</p>}
          {progress > 75 && <p className="text-blue-400">> DecisionTree: Node split at "Interests"...</p>}
          {progress > 50 && <p className="text-purple-400">> XGBoost: Gradient boosting iteration 450...</p>}
          {progress > 25 && <p className="text-yellow-400">> SVM: Hyperplane optimization converged...</p>}
          {progress > 10 && <p className="text-slate-400">> Loading dataset: Academic Records...</p>}
          <p className="text-slate-500">> System initialized.</p>
        </div>
      </div>

      <div className="w-full max-w-md bg-surface2 h-2 mt-6 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-accent to-accent2 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
