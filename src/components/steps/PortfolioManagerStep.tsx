interface PortfolioManagerStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function PortfolioManagerStep({ onNext, onPrevious, userData }: PortfolioManagerStepProps) {
  const selectedAssetAllocation = userData.selectedAssetAllocation
  const selectedStocks = userData.selectedStocks || []
  const investmentAmount = 10000000 // 1천만원 기본
  
  const createPortfolio = () => {
    const portfolio: {
      totalAmount: number
      allocations: Array<{
        category: string
        amount: number
        percentage: number
        stocks: any[]
      }>
      expectedReturn: number
      riskLevel: string
    } = {
      totalAmount: investmentAmount,
      allocations: [],
      expectedReturn: 0,
      riskLevel: selectedAssetAllocation?.risk || '보통'
    }
    
    // 자산배분에 따른 금액 배분
    if (selectedAssetAllocation?.allocation.includes('주식 80%')) {
      const stockAmount = investmentAmount * 0.8
      const bondAmount = investmentAmount * 0.15
      const cashAmount = investmentAmount * 0.05
      
      portfolio.allocations = [
        { category: '주식', amount: stockAmount, percentage: 80, stocks: selectedStocks },
        { category: '채권', amount: bondAmount, percentage: 15, stocks: [] },
        { category: '현금', amount: cashAmount, percentage: 5, stocks: [] }
      ]
      portfolio.expectedReturn = 12
    } else if (selectedAssetAllocation?.allocation.includes('주식 60%')) {
      const stockAmount = investmentAmount * 0.6
      const bondAmount = investmentAmount * 0.3
      const altAmount = investmentAmount * 0.1
      
      portfolio.allocations = [
        { category: '주식', amount: stockAmount, percentage: 60, stocks: selectedStocks },
        { category: '채권', amount: bondAmount, percentage: 30, stocks: [] },
        { category: '대안투자', amount: altAmount, percentage: 10, stocks: [] }
      ]
      portfolio.expectedReturn = 8
    } else {
      const stockAmount = investmentAmount * 0.3
      const bondAmount = investmentAmount * 0.5
      const cashAmount = investmentAmount * 0.2
      
      portfolio.allocations = [
        { category: '주식', amount: stockAmount, percentage: 30, stocks: selectedStocks },
        { category: '채권', amount: bondAmount, percentage: 50, stocks: [] },
        { category: '현금', amount: cashAmount, percentage: 20, stocks: [] }
      ]
      portfolio.expectedReturn = 5
    }
    
    return portfolio
  }

  const portfolio = createPortfolio()
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원'
  }

  const handleNext = () => {
    onNext({ finalPortfolio: portfolio })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">�</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">포트폴리오매니저 엠마</h2>
        <p className="text-teal-600 font-medium mb-2 italic">"완벽한 조화의 설계자"</p>
        <p className="text-gray-600 mb-4">안녕하세요! 저는 엠마입니다. 모든 투자 요소를 완벽하게 조합하는 포트폴리오 설계의 마에스트로서, 지금까지의 모든 분석을 종합하여 당신만의 최종 포트폴리오를 구성해드리겠습니다.</p>
        <div className="bg-indigo-50 rounded-lg p-4 text-sm text-indigo-800">
          <div className="font-medium mb-2">🛡️ 위험관리 전략:</div>
          <div className="text-xs space-y-1">
            <div>• VaR(Value at Risk) 모델을 통한 최대 손실 예측</div>
            <div>• 샤프 비율과 비율 대비 맥시멀 드로다운 분석</div>
            <div>• 상관계수 분석을 통한 분산투자 효과 극대화</div>
            <div>• 시나리오 분석을 통한 스트레스 테스트</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-green-900 mb-4">🎆 최종 포트폴리오</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">투자 개요</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>총 투자금액:</span>
                <span className="font-medium">{formatCurrency(portfolio.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>예상 수익률:</span>
                <span className="font-medium text-green-600">{portfolio.expectedReturn}%</span>
              </div>
              <div className="flex justify-between">
                <span>리스크 수준:</span>
                <span className="font-medium">{portfolio.riskLevel}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">자산 배분</h4>
            <div className="space-y-3">
              {portfolio.allocations.map((allocation, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className={`w-4 h-4 rounded mr-2 ${
                        allocation.category === '주식' ? 'bg-blue-500' :
                        allocation.category === '채권' ? 'bg-green-500' :
                        allocation.category === '현금' ? 'bg-yellow-500' : 'bg-purple-500'
                      }`}
                    />
                    <span className="text-sm">{allocation.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{allocation.percentage}%</div>
                    <div className="text-xs text-gray-500">{formatCurrency(allocation.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">선택된 주식 종목</h4>
          <div className="grid md:grid-cols-3 gap-3">
            {selectedStocks.map((stock: any, index: number) => (
              <div key={index} className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-900">{stock.symbol}</div>
                <div className="text-sm text-blue-700">{stock.name}</div>
                <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                  stock.rating === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {stock.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-3">📈 예상 성과</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>1년 후 예상가치:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(portfolio.totalAmount * (1 + portfolio.expectedReturn / 100))}
              </span>
            </div>
            <div className="flex justify-between">
              <span>3년 후 예상가치:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(portfolio.totalAmount * Math.pow(1 + portfolio.expectedReturn / 100, 3))}
              </span>
            </div>
            <div className="flex justify-between">
              <span>5년 후 예상가치:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(portfolio.totalAmount * Math.pow(1 + portfolio.expectedReturn / 100, 5))}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-3">⚠️ 리스크 분석</h4>
          <div className="space-y-2 text-sm text-yellow-800">
            <div>• 시장 변동성에 따른 원금 손실 가능</div>
            <div>• 금리 변동 리스크</div>
            <div>• 개별 종목 리스크</div>
            <div className="mt-2 text-xs">
              ℹ️ 정기적인 리밸런싱을 권장합니다.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="text-indigo-600 mr-3">🎯</div>
          <div>
            <h4 className="font-medium text-indigo-800 mb-1">마지막 단계: 매매 전략</h4>
            <p className="text-sm text-indigo-700">
              매매전략가가 이 포트폴리오에 맞는 최적의 매수 타이밍과 전략을 제시해드립니다.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
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
          매매 전략 받기 →
        </button>
      </div>
    </div>
  )
}