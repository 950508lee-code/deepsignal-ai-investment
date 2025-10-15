interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
}

export default function ProgressIndicator({ currentStep, totalSteps, stepTitles }: ProgressIndicatorProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {stepTitles[currentStep]}
        </h2>
        <span className="text-sm text-gray-600">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        {stepTitles.map((title, index) => (
          <span 
            key={index}
            className={`${
              index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'
            }`}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  )
}