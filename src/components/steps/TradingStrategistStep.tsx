interface TradingStrategistStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function TradingStrategistStep({ onPrevious, userData }: TradingStrategistStepProps) {
  const finalPortfolio = userData.finalPortfolio
  const riskTolerance = userData.riskTolerance
  
  const getTradingStrategy = () => {
    if (riskTolerance === 'aggressive') {
      return {
        strategy: '성장 모멘텀 전략',
        approach: '적극적 매매',
        timing: [
          '월별 정액 분할 매수 (DCA)',
          '시장 조정 시 추가 매수 기회 포착',
          '기술적 병목 돌파 시 매수 강화'
        ],
        indicators: ['경기선행지수', 'RSI < 30', '거래량 돌파'],
        rebalancing: '분기별 리밸런싱',
        exitStrategy: '목표가 달성 시 20% 매도'
      }
    } else if (riskTolerance === 'moderate') {
      return {
        strategy: '균형 성장 전략',
        approach: '안정적 매매',
        timing: [
          '월별 정액 분할 매수',
          '시장 변동성 확대 시 매수 중단',
          '배당 지급일 고려 매수'
        ],
        indicators: ['이동평균선', 'P/E 비율', '배당수익률'],
        rebalancing: '반기별 리밸런싱',
        exitStrategy: '상한 10% 시 일부 매도'
      }
    } else {
      return {
        strategy: '안전 수익 전략',
        approach: '수비적 매매',
        timing: [
          '분기별 정액 매수',
          '고배당 시즌 최우선 매수',
          '원금보장 상품 비중 유지'
        ],
        indicators: ['배당수익률', 'PBR', '부채비율'],
        rebalancing: '연간 리밸런싱',
        exitStrategy: '매매 최소화, 장기 보유'
      }
    }
  }

  const tradingStrategy = getTradingStrategy()
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원'
  }

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">⚡</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">매매전략가 라이언</h2>
        <p className="text-violet-600 font-medium mb-2 italic">"타이밍의 마스터"</p>
        <p className="text-gray-600 mb-4">안녕하세요! 저는 라이언입니다. 완벽한 타이밍을 포착하는 매매의 달인으로서, 엠마가 구성한 포트폴리오를 실제 투자로 실행하기 위한 구체적인 매매 전략을 제공해드리겠습니다.</p>
        <div className="bg-emerald-50 rounded-lg p-4 text-sm text-emerald-800">
          <div className="font-medium mb-2">🤖 알고리즘 트레이딩 전략:</div>
          <div className="text-xs space-y-1">
            <div>• DCA(달러 코스트 애버리징) 기반 정액 분할 매수</div>
            <div>• 기술적 신호 기반 매매 타이밍 최적화</div>
            <div>• 리밸런싱 알고리즘을 통한 자동 리스크 관리</div>
            <div>• 변동성 지표 기반 포지션 사이징 전략</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 mb-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-green-900 mb-2">🎉 딥시그널 AI 상담 완료!</h3>
          <p className="text-green-700">축하합니다! 7명의 AI 전문가가 협업하여 맞춤형 투자 전략을 완성했습니다.</p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-bold text-blue-900 mb-4">🎯 {tradingStrategy.strategy}</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-blue-800 mb-3">매수 타이밍</h5>
              <ul className="space-y-2">
                {tradingStrategy.timing.map((timing, index) => (
                  <li key={index} className="text-sm text-blue-700 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {timing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-blue-800 mb-3">주요 지표</h5>
              <ul className="space-y-2">
                {tradingStrategy.indicators.map((indicator, index) => (
                  <li key={index} className="text-sm text-blue-700 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-blue-800">리밸런싱: </span>
                <span className="text-sm text-blue-700">{tradingStrategy.rebalancing}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-blue-800">출구 전략: </span>
                <span className="text-sm text-blue-700">{tradingStrategy.exitStrategy}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h4 className="text-lg font-bold text-purple-900 mb-4">📈 투자 시작 가이드</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded p-4">
              <h5 className="font-semibold text-purple-800 mb-2">1단계: 계좌 개설</h5>
              <p className="text-sm text-purple-700">증권계좌 개설 및 초기 자금 입금</p>
            </div>
            <div className="bg-white rounded p-4">
              <h5 className="font-semibold text-purple-800 mb-2">2단계: 점진적 매수</h5>
              <p className="text-sm text-purple-700">월 {formatCurrency(finalPortfolio?.totalAmount / 12 || 0)} 정액 분할 매수</p>
            </div>
            <div className="bg-white rounded p-4">
              <h5 className="font-semibold text-purple-800 mb-2">3단계: 모니터링</h5>
              <p className="text-sm text-purple-700">월간 성과 리뷰 및 전략 조정</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-800 mb-3">⚠️ 주요 주의사항</h4>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• 모든 투자는 원금 손실 위험이 있습니다</li>
            <li>• 시장 상황에 따라 전략 수정이 필요할 수 있습니다</li>
            <li>• 정기적인 포트폴리오 리밸런싱을 권장합니다</li>
            <li>• 전문가와의 상담을 고려해보세요</li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">🚀 딥시그널과 함께 시작하세요!</h4>
          <p className="text-gray-600">성공적인 투자를 위한 첫 걸음을 내디디셨습니다.</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={onPrevious}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← 이전
          </button>
          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            🔄 새로운 상담 시작
          </button>
        </div>
      </div>
    </div>
  )
}