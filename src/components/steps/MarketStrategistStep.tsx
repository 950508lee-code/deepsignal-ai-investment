interface MarketStrategistStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function MarketStrategistStep({ onNext, onPrevious }: MarketStrategistStepProps) {
  const marketAnalysis = {
    currentMarket: '현재 주식시장은 고금리 지속과 인플레이션 우려로 인한 변동성이 확대되고 있습니다.',
    trends: [
      'AI 및 기술주 버블 지속',
      '에너지 전환 가속화',
      '중앙은행 금리 인하 기대',
      '신흥시장 대비 선진국 선호'
    ],
    risks: [
      '지정학적 리스크 지속',
      '경기침체 가능성',
      '금리 변동성'
    ],
    opportunities: [
      'AI 및 반도체 산업',
      '대체에너지 및 ESG',
      '중국 리오픈 관련 수혜'
    ]
  }

  const handleNext = () => {
    onNext({ marketAnalysis })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">📈</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">시장전략가</h2>
        <p className="text-gray-600 mb-4">현재 거시경제 분석과 시장 동향 해석</p>
        <div className="bg-green-50 rounded-lg p-4 text-sm text-green-800">
          <div className="font-medium mb-2">🔍 AI 시장 분석 방법론:</div>
          <div className="text-xs space-y-1">
            <div>• 실시간 경제 지표 분석 (금리, 인플레이션, 고용률)</div>
            <div>• 글로벌 시장 동향 및 지정학적 리스크 평가</div>
            <div>• 섹터별 성장성과 밸류에이션 분석</div>
            <div>• 기술적 분석을 통한 시장 모멘텀 파악</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">현재 시장 상황</h3>
          <p className="text-blue-800">{marketAnalysis.currentMarket}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-3">피 주요 트렌드</h4>
            <ul className="space-y-2">
              {marketAnalysis.trends.map((trend, index) => (
                <li key={index} className="text-sm text-green-800 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {trend}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-3">⚠️ 주요 리스크</h4>
            <ul className="space-y-2">
              {marketAnalysis.risks.map((risk, index) => (
                <li key={index} className="text-sm text-red-800 flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-3">🔍 투자 기회</h4>
            <ul className="space-y-2">
              {marketAnalysis.opportunities.map((opp, index) => (
                <li key={index} className="text-sm text-purple-800 flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-yellow-600 mr-3">💡</div>
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">AI 시장 분석 결과</h4>
              <p className="text-sm text-yellow-700">
                현재 시장 상황을 바탕으로 자산배분전문가가 각 자산군별 최적 비중을 제안합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          ← 이전
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          자산배분 최적화 →
        </button>
      </div>
    </div>
  )
}