'use client'

import { useState } from 'react'

interface MarketStrategistStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function MarketStrategistStep({ onNext, onPrevious, userData }: MarketStrategistStepProps) {
  const [showData, setShowData] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    trends: false,
    risks: false,
    opportunities: false
  })
  const [evidenceModal, setEvidenceModal] = useState<{
    isOpen: boolean
    title: string
    details: string
    sources: string[]
  }>({ isOpen: false, title: '', details: '', sources: [] })
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null)

  // 글로벌 멀티에셋 브리핑 데이터
  const globalMarketData = {
    // AI 종합 판단
    aiSummary: "완화 기대 우세, 변동성은 중간. 위험자산 선별적 강세.",
    position: "Risk-on", // Risk-on / Neutral / Risk-off
    positionScore: 2, // -2 ~ +2 점수
    
    // 주식 지역 4대장
    equities: [
      { 
        region: 'KR', 
        name: '코스피', 
        value: '2,654', 
        change1D: '+0.8%', 
        change1W: '+2.1%', 
        trend: 'up',
        topSectors: ['반도체 +2.1%', 'IT서비스 +1.8%', '2차전지 +1.5%'],
        bottomSectors: ['조선 -1.2%', '철강 -0.8%', '화학 -0.6%']
      },
      { 
        region: 'US', 
        name: 'S&P 500', 
        value: '4,789', 
        change1D: '+0.5%', 
        change1W: '+1.8%', 
        trend: 'up',
        topSectors: ['Technology +2.5%', 'Energy +1.9%', 'Healthcare +1.2%'],
        bottomSectors: ['Utilities -1.1%', 'REITs -0.9%', 'Consumer Staples -0.4%']
      },
      { 
        region: 'JP', 
        name: '닛케이', 
        value: '39,480', 
        change1D: '+0.3%', 
        change1W: '+1.2%', 
        trend: 'up',
        topSectors: ['자동차 +2.8%', '전자 +1.6%', '기계 +1.1%'],
        bottomSectors: ['은행 -1.5%', '부동산 -1.0%', '통신 -0.7%']
      },
      { 
        region: 'HK', 
        name: 'HSI', 
        value: '20,380', 
        change1D: '-0.2%', 
        change1W: '+0.8%', 
        trend: 'neutral',
        topSectors: ['테크 +1.5%', '소비재 +0.9%', '헬스케어 +0.7%'],
        bottomSectors: ['부동산 -2.1%', '금융 -1.3%', '에너지 -0.8%']
      }
    ],
    
    // 환율 & 금리
    fxRates: [
      { name: 'USD/KRW', value: '1,328', change: '-8 (-0.6%)', trend: 'down', label: '원화 강세' },
      { name: 'USD/JPY', value: '149.8', change: '-0.9 (-0.6%)', trend: 'down', label: '엔화 강세' },
      { name: 'DXY', value: '102.8', change: '-0.8 (-0.8%)', trend: 'down', label: '달러 약세' }
    ],
    
    bonds: [
      { name: '미10Y', value: '4.15%', change: '-8bp', trend: 'down', label: '성장주 우호' },
      { name: '미2Y', value: '4.58%', change: '-12bp', trend: 'down', label: '완화 기대' },
      { name: '한10Y', value: '3.45%', change: '-5bp', trend: 'down', label: '안정적' },
      { name: '2s10s', value: '-43bp', change: '+4bp', trend: 'up', label: '역전 축소' }
    ],
    
    // 원자재 & 크립토
    commodities: [
      { name: '금(XAU)', value: '$2,018', change: '+$8 (+0.4%)', trend: 'up', label: '리스크 헤지', icon: '🛡️' },
      { name: 'WTI', value: '$86.2', change: '+$1.2 (+1.4%)', trend: 'up', label: '수급 타이트', icon: '⚡' }
    ],
    
    crypto: [
      { name: 'BTC', value: '$67,420', change: '+$1,240 (+1.9%)', trend: 'up', label: '위험자산 선호', icon: '🚀' },
      { name: 'ETH', value: '$2,680', change: '+$82 (+3.1%)', trend: 'up', label: '알트코인 강세', icon: '📈' }
    ],
    
    // 변동성 & 스트레스 지표
    volatility: [
      { name: 'VIX', value: '16.2', status: '보통', range: '15~25', color: 'yellow', label: '단기 랠리 지속성 점검' },
      { name: 'MOVE', value: '95.8', status: '낮음', range: '<100', color: 'green', label: '채권 안정' },
      { name: 'CDX IG', value: '58bp', status: '낮음', range: '<70', color: 'green', label: '신용 양호' }
    ],
    
    // AI 종합 인사이트
    insights: [
      { category: '금리', text: '미10Y 하락세 둔화 → 멀티플 확장 여지 축소' },
      { category: '환율', text: 'DXY 약세 + USD/KRW 1,3,5일 하락 → EM/코스피 우호' },
      { category: '변동성', text: 'VIX 14~16 박스 → 단기 랠리 지속성 점검 구간' },
      { category: '크립토', text: 'BTC 200D 상회 → 위험자산 온기, 단 정책 리스크 주의' },
      { category: '결론', text: 'Risk: Neutral~On (선별 베타 노출 유효)' }
    ]
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const openEvidenceModal = (title: string, details: string, sources: string[]) => {
    setEvidenceModal({ isOpen: true, title, details, sources })
  }

  const closeEvidenceModal = () => {
    setEvidenceModal({ isOpen: false, title: '', details: '', sources: [] })
  }

  const handleNext = () => {
    onNext({ 
      marketAnalysis: globalMarketData,
      marketTimestamp: new Date().toISOString()
    })
  }

  const userProfile = userData.investmentProfile?.mbtiProfile || { type: '균형형 투자자' }
  const aiLevel = userData.aiInvolvementLevel || 'collaboration'

  // 포지션 배지 색상
  const getPositionBadgeColor = (position: string) => {
    switch(position) {
      case 'Risk-on': return 'bg-green-500 text-white'
      case 'Risk-off': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }
    e.stopPropagation()
  }

  const handleNext = () => {
    onNext({ 
      marketAnalysis,
      marketTimestamp: new Date().toISOString()
    })
  }

  const userProfile = userData.investmentProfile?.mbtiProfile || { type: '균형형 투자자' }
  const aiLevel = userData.aiInvolvementLevel || 'collaboration'

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">시장전략가 소피아</h2>
        <p className="text-indigo-600 font-medium mb-2 italic">"날카로운 시장 감각의 전략가"</p>
        <p className="text-gray-600 mb-4">안녕하세요! 저는 소피아입니다. 글로벌 시장의 흐름을 읽는 예리한 통찰력을 바탕으로 현재 경제 상황과 시장 트렌드를 분석하여 투자 방향을 제시해드리겠습니다.</p>
      </div>

      {/* AI 시장 내러티브 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">💡 AI 시장 핵심 진단</h3>
        <p className="text-blue-800 text-sm sm:text-base leading-relaxed mb-4">
          {marketAnalysis.headline}
        </p>
        <div className="text-xs text-blue-600 italic">
          "경제기사 한 페이지를 30초 안에 이해하는 느낌"
        </div>
      </div>

      {/* 거시흐름 방향 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-gray-800">📈 거시흐름 방향</h4>
          {/* 데이터 토글 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">상세데이터</span>
            <button
              onClick={() => setShowData(!showData)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showData ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showData ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        {/* 방향 지표들 */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          {marketAnalysis.macroFlow.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-gray-800 mb-2">{item.label}</div>
              <div className="flex items-center justify-center mb-2">
                {item.direction === 'up' && <span className="text-red-500 text-xl">⬆️</span>}
                {item.direction === 'down' && <span className="text-green-500 text-xl">⬇️</span>}
                {item.direction === 'neutral' && <span className="text-blue-500 text-xl">➡️</span>}
              </div>
              <div className={`text-xs ${
                item.color === 'green' ? 'text-green-700' : 
                item.color === 'blue' ? 'text-blue-700' : 'text-red-700'
              }`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
        
        {/* 상세 데이터 (토글시만 표시) */}
        {showData && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-3">상세 경제 지표</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {kpiData.map((kpi, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-medium text-gray-800 text-sm">{kpi.name}</h6>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      kpi.trend === 'up' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {kpi.trend === 'up' ? '↗' : '↘'} {kpi.change}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-xs text-gray-500">
                    {kpi.source} · {kpi.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI 해석 */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-6">
        <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
          🤖 AI 해석
          <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            소피아의 시장 분석
          </span>
        </h4>
        <div className="space-y-3">
          {marketAnalysis.interpretation.map((insight, index) => (
            <div key={index} className="flex items-start">
              <span className="text-purple-500 mr-3 mt-1">•</span>
              <p className="text-purple-800 text-sm leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-purple-200">
          <p className="text-xs text-purple-600 italic">
            "숫자를 몰라도 경제 흐름을 이해할 수 있도록 AI가 번역해드립니다."
          </p>
        </div>
      </div>

      {/* 심화 분석 (선택적) */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-800 mb-4">🔍 심화 분석 (선택사항)</h4>
        
        {/* 간소화된 트렌드 */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('trends')}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
          >
            <h5 className="font-semibold text-gray-800">📈 주요 트렌드 요약</h5>
            <span className={`transform transition-transform ${expandedSections.trends ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.trends && (
            <div className="px-4 pb-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-800 text-sm leading-relaxed">
                  • AI·반도체 실적 상향 사이클 진입<br/>
                  • 에너지 전환 정책 드라이브 지속<br/>
                  • 달러 약세 시 신흥국 자금 유입 가능성
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 간소화된 리스크 */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('risks')}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
          >
            <h5 className="font-semibold text-gray-800">⚠️ 핵심 리스크 요약</h5>
            <span className={`transform transition-transform ${expandedSections.risks ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.risks && (
            <div className="px-4 pb-4">
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-orange-800 text-sm leading-relaxed">
                  • 정책 피벗 지연 시 밸류에이션 압박<br/>
                  • 지정학 리스크로 인한 원자재 변동성<br/>
                  • 방어 전략: 현금 15% + 원자재 헤지 5%
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 간소화된 기회 */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('opportunities')}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
          >
            <h5 className="font-semibold text-gray-800">💎 투자 기회 요약</h5>
            <span className={`transform transition-transform ${expandedSections.opportunities ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.opportunities && (
            <div className="px-4 pb-4">
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-purple-800 text-sm leading-relaxed">
                  • AI·반도체: 50/30/20 분할 진입<br/>
                  • 에너지 전환: 배당+성장 하이브리드<br/>
                  • 고배당 ESG: 배당수익률 4%+ 안정주
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 사용자 연결 - 성향 반영 */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
        <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center">
          🤝 당신의 투자 성향과의 연결
        </h4>
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="text-center mb-3">
            <span className="text-2xl">{userProfile.type === '균형형 투자자' ? '⚖️' : userProfile.type.includes('성장') ? '🚀' : '🛡️'}</span>
            <h5 className="font-semibold text-gray-800 mt-2">{userProfile.type}</h5>
          </div>
          <p className="text-green-800 text-sm leading-relaxed text-center">
            {userProfile.type === '균형형 투자자' ? 
              "지금은 **방어 60 / 성장 40** 비중의 전략이 유효합니다." :
            userProfile.type.includes('성장') ?
              "지금은 **성장 70 / 방어 30** 비중으로 기회를 포착하세요." :
              "지금은 **방어 80 / 성장 20** 비중으로 안정성을 우선하세요."
            }
          </p>
        </div>
        <div className="text-center">
          <p className="text-green-700 text-sm mb-2">
            AI 자산배분가 '데이비드'가 구체적인 비중을 곧 제시합니다.
          </p>
          <div className="text-xs text-green-600">
            AI 개입 수준: {aiLevel === 'reference' ? '참고형' : aiLevel === 'collaboration' ? '협업형' : '가이드형'}
          </div>
        </div>
      </div>

      {/* 하단 고정 CTA - 모바일 최적화 */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
        >
          ← 이전
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 w-full sm:w-auto font-semibold"
        >
          자산배분으로 이동 →
        </button>
      </div>

      {/* 근거 모달 */}
      {evidenceModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 배경 오버레이 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeEvidenceModal}
          />
          
          {/* 모달 컨텐츠 */}
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                📎 {evidenceModal.title}
              </h3>
              <button
                onClick={closeEvidenceModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-2">상세 내용</h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {evidenceModal.details}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-2">데이터 출처</h4>
                <div className="flex flex-wrap gap-1">
                  {evidenceModal.sources.map((source, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={closeEvidenceModal}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}