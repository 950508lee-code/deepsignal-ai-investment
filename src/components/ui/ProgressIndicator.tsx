interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
}

export default function ProgressIndicator({ currentStep, totalSteps, stepTitles }: ProgressIndicatorProps) {
  const stepIcons = ['👨‍💼', '🤖', '📊', '⚖️', '🔬', '📈', '💼', '⚡']
  
  return (
    <div className="w-full mb-8">


      {/* 진행 단계 표시 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        
        {/* 프로그레스 바 */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
        
        {/* 단계별 아이콘과 제목 */}
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
          {stepTitles.map((title, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-md' 
                  : index < currentStep 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`text-2xl mb-1 ${
                index === currentStep 
                  ? 'animate-bounce' 
                  : index < currentStep 
                    ? 'opacity-70' 
                    : 'opacity-40'
              }`}>
                {stepIcons[index]}
              </div>
              <div className={`text-xs text-center font-medium leading-tight ${
                index === currentStep 
                  ? 'text-blue-700' 
                  : index < currentStep 
                    ? 'text-green-700' 
                    : 'text-gray-400'
              }`}>
                {title.split(' ')[0]}
              </div>
              <div className={`w-6 h-1 rounded-full mt-1 ${
                index === currentStep 
                  ? 'bg-blue-500' 
                  : index < currentStep 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
              }`} />
            </div>
          ))}
        </div>
        
        {/* 다음 단계 미리보기 */}
        {currentStep < totalSteps - 1 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{stepIcons[currentStep + 1]}</div>
              <div>
                <div className="text-sm font-medium text-blue-800">다음 단계</div>
                <div className="text-blue-700">{stepTitles[currentStep + 1]}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}