const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-400'
            }`}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`h-0.5 w-8 ${
                index + 1 < currentStep ? 'bg-blue-500' : 'bg-slate-700'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;