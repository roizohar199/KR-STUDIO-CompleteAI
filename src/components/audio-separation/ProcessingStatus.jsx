import React from "react";
import { Music, FileAudio, Zap, CheckCircle, AlertCircle } from "lucide-react";

export default function ProcessingStatus({ step, progress, error }) {
  const getStepIcon = (step) => {
    switch (step) {
      case 'uploading':
        return <FileAudio className="w-8 h-8 text-blue-400" />;
      case 'processing':
        return <Music className="w-8 h-8 text-purple-400" />;
      case 'separating':
        return <Zap className="w-8 h-8 text-green-400" />;
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-8 h-8 text-red-400" />;
      default:
        return <Music className="w-8 h-8 text-purple-400" />;
    }
  };

  const getStepColor = (step) => {
    switch (step) {
      case 'uploading':
        return 'from-blue-500 to-blue-600';
      case 'processing':
        return 'from-purple-500 to-purple-600';
      case 'separating':
        return 'from-green-500 to-green-600';
      case 'completed':
        return 'from-green-500 to-green-600';
      case 'error':
        return 'from-red-500 to-red-600';
      default:
        return 'from-purple-500 to-purple-600';
    }
  };

  const getStepText = (step) => {
    switch (step) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing audio...';
      case 'separating':
        return 'Separating tracks...';
      case 'completed':
        return 'Completed successfully!';
      case 'error':
        return 'Processing error';
      default:
        return 'Processing...';
    }
  };

  const getStepDescription = (step) => {
    switch (step) {
      case 'uploading':
        return 'Uploading file to server';
      case 'processing':
        return 'Analyzing audio and preparing for processing';
      case 'separating':
        return 'Separating audio into 5 individual tracks';
      case 'completed':
        return 'Audio separated successfully';
      case 'error':
        return 'An error occurred while processing the file';
      default:
        return 'Processing your audio';
    }
  };

  if (error) {
    return (
      <div className="bg-gray-900 rounded-xl p-8 border border-red-500/30">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Processing Error</h2>
          <p className="text-red-400 mb-6">{error}</p>
          
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm">
              Please try again or contact support if the issue persists
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
      <div className="text-center">
        <div className={`w-16 h-16 bg-gradient-to-r ${getStepColor(step)} rounded-full flex items-center justify-center mx-auto mb-4 ${
          step === 'processing' || step === 'separating' ? 'animate-spin' : ''
        }`}>
          {getStepIcon(step)}
        </div>
        
        <h2 className="text-2xl font-semibold text-white mb-2">
          {getStepText(step)}
        </h2>
        <p className="text-gray-400 mb-6">{getStepDescription(step)}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className={`bg-gradient-to-r ${getStepColor(step)} h-3 rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400">{Math.round(progress)}% completed</p>
        
        {/* Processing Steps */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: 'uploading', label: 'Upload' },
            { step: 'processing', label: 'Process' },
            { step: 'separating', label: 'Separate' }
          ].map((item, index) => (
            <div key={index} className={`flex items-center gap-2 p-3 rounded-lg ${
              step === item.step 
                ? 'bg-purple-500/20 border border-purple-500/30' 
                : step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step))
                  ? 'bg-green-500/20 border border-green-500/30'
                  : 'bg-gray-700/50 border border-gray-600/30'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                step === item.step 
                  ? 'bg-purple-500 text-white' 
                  : step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step))
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 text-gray-400'
              }`}>
                {step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step)) ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <span className={`text-sm font-medium ${
                step === item.step 
                  ? 'text-purple-400' 
                  : step === 'completed' || (index < ['uploading', 'processing', 'separating'].indexOf(step))
                    ? 'text-green-400'
                    : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 