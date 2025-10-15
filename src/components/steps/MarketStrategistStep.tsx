'use client'

import { useState } from 'react'

interface MarketStrategistStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function MarketStrategistStep({ onNext, onPrevious, userData }: MarketStrategistStepProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [selectedEquity, setSelectedEquity] = useState<string | null>(null)
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null)
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean, indicator: string, content: any }>({ isOpen: false, indicator: '', content: {} })

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
    
    // AI 종합 인사이트 (대화체 브리핑)
    insights: [
      { category: '금리', text: '미국 장기금리가 잠시 멈췄습니다. 금리가 더 이상 빠지지 않으면, 주식의 밸류에이션이 더 올라가긴 어렵겠어요.' },
      { category: '환율', text: '달러가 약해지고 원화가 강해지면서 외국인 자금이 코스피로 들어오기 좋은 환경입니다.' },
      { category: '변동성', text: '시장이 안정적이지만, 너무 안심하긴 이른 단계예요. 단기 랠리가 얼마나 이어질지 확인이 필요합니다.' },
      { category: '크립토', text: '비트코인이 장기 추세선 위에서 움직이고 있습니다. 투자심리는 살아있지만, 정책 변수엔 여전히 주의가 필요합니다.' },
      { category: '결론', text: '종합적으로 보면 **"조심스럽게 긍정적"**입니다. 지금은 전면 투자보다는 기회가 있는 분야에 선택적으로 참여하는 시기로 보입니다.' }
    ],
    
    // 지표 설명 데이터베이스 (AI 해석 툴팁)
    indicatorExplanations: {
      'VIX': {
        oneLine: '주식시장의 불안도를 보여주는 지수예요. 20 아래면 시장이 비교적 안정적이라는 뜻입니다.',
        detailed: '옵션시장 변동성을 기준으로 측정된 공포지수입니다. 지금 수준은 "평온하지만, 약간의 긴장감은 남아있는" 단계로 해석됩니다.'
      },
      'MOVE': {
        oneLine: '채권시장의 변동성을 나타내는 지표예요. 낮을수록 채권시장이 안정적입니다.',
        detailed: '채권 옵션 변동성 지수로, 금리 변화에 대한 시장의 불안감을 측정합니다. 100 이하는 채권시장이 비교적 차분한 상태를 의미합니다.'
      },
      'CDX IG': {
        oneLine: '회사들의 부도 위험도를 나타내는 지표예요. 낮을수록 기업 신용이 좋다는 뜻입니다.',
        detailed: '투자등급 기업들의 신용위험 프리미엄입니다. 70bp 이하는 기업 부도 위험이 낮고, 신용시장이 건전한 상태를 나타냅니다.'
      },
      'USD/KRW': {
        oneLine: '원-달러 환율이에요. 숫자가 낮아지면 원화가 강해지는 것으로, 외국인 투자에 유리합니다.',
        detailed: '환율 하락은 한국 자산의 달러 기준 가치 상승을 의미하며, 외국인 자금 유입과 코스피 상승에 긍정적 영향을 줍니다.'
      },
      'DXY': {
        oneLine: '달러의 전반적인 강약을 나타내는 지표예요. 수치가 낮아지면 달러 약세로, 신흥국·코스피엔 좋은 환경입니다.',
        detailed: '주요 6개국 통화 대비 달러의 가치를 나타냅니다. 최근 DXY 하락은 미국 금리 인하 기대와 함께 위험자산으로의 자금 이동 가능성을 높입니다.'
      },
      '미10Y': {
        oneLine: '미국의 10년 만기 국채금리예요. 이 수치가 내려가면 주식시장은 보통 긍정적으로 반응합니다.',
        detailed: '장기금리는 시장이 미래 금리를 어떻게 예상하는지를 보여줍니다. 최근 금리 하락은 "경기 둔화+금리 인하 기대"가 반영된 흐름이에요. 주식·특히 성장주엔 우호적 신호입니다.'
      },
      'BTC': {
        oneLine: '비트코인은 위험자산의 "심리 온도계" 역할을 합니다. 오를 때는 시장에 "위험 감수 의지"가 커졌다는 뜻이에요.',
        detailed: '금리와 달리 "미래 성장 기대"에 반응하는 자산입니다. 최근 상승은 유동성 회복 기대와 연관이 있습니다.'
      }
    }
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

  // 트렌드 색상
  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // 변동성 상태 색상
  const getVolatilityColor = (color: string) => {
    switch(color) {
      case 'green': return 'bg-green-100 text-green-800'
      case 'yellow': return 'bg-yellow-100 text-yellow-800'
      case 'red': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // 지표 설명 툴팁 함수
  const showTooltip = (indicator: string) => {
    setTooltipVisible(indicator)
  }

  const hideTooltip = () => {
    setTooltipVisible(null)
  }

  // 상세 모달 열기
  const openDetailModal = (indicator: string) => {
    const content = (globalMarketData.indicatorExplanations as any)[indicator]
    if (content) {
      setDetailModal({ isOpen: true, indicator, content })
    }
  }

  const closeDetailModal = () => {
    setDetailModal({ isOpen: false, indicator: '', content: {} })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">시장전략가 소피아</h2>
        <p className="text-indigo-600 font-medium mb-2 italic">&quot;글로벌 마켓 인텔리전스&quot;</p>
        <p className="text-gray-600 mb-4">실시간 글로벌 시장을 종합 분석하여 AI가 공부 대신 요약해드립니다.</p>
      </div>

      {/* 상단: AI 한줄 결론 + 포지션 배지 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-0">🧠 AI 시장 핵심 진단</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getPositionBadgeColor(globalMarketData.position)}`}>
            {globalMarketData.position}
          </span>
        </div>
        <p className="text-blue-800 text-sm sm:text-base leading-relaxed">
          {globalMarketData.aiSummary}
        </p>
      </div>

      {/* 섹션 A — 주식: 지역 4대장 스냅샷 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-gray-800 flex items-center">
            📈 글로벌 주식
          </h4>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {globalMarketData.equities.map((equity, index) => (
            <div 
              key={index}
              className={`bg-white border rounded-lg p-3 cursor-pointer transition-all ${
                selectedEquity === equity.region ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedEquity(selectedEquity === equity.region ? null : equity.region)}
            >
              <div className="text-center">
                <div className="text-xs font-bold text-gray-500 mb-1">{equity.region}</div>
                <div className="text-sm font-semibold text-gray-800 mb-1">{equity.name}</div>
                <div className="text-lg font-bold text-gray-900">{equity.value}</div>
                <div className="flex justify-center gap-2 text-xs mt-2">
                  <span className={getTrendColor(equity.trend)}>{equity.change1D}</span>
                  <span className={getTrendColor(equity.trend)}>{equity.change1W}</span>
                </div>
              </div>
              
              {/* 섹터 상위/하위 (터치 시 표시) */}
              {selectedEquity === equity.region && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <div className="text-xs font-semibold text-green-700 mb-1">상위 섹터</div>
                      {equity.topSectors.map((sector, idx) => (
                        <div key={idx} className="text-xs text-green-600">{sector}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-red-700 mb-1">하위 섹터</div>
                      {equity.bottomSectors.map((sector, idx) => (
                        <div key={idx} className="text-xs text-red-600">{sector}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 B — 환율 & 금리 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-gray-800 flex items-center">
            💱 환율 & 금리
          </h4>
        </div>
        
        <div className="space-y-4">
          {/* 환율 */}
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-2">환율</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {globalMarketData.fxRates.map((fx, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-semibold text-gray-800">{fx.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {fx.label}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{fx.value}</div>
                  <div className={`text-xs ${getTrendColor(fx.trend)}`}>{fx.change}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 금리 */}
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-2">금리</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {globalMarketData.bonds.map((bond, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-semibold text-gray-800">{bond.name}</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {bond.label}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{bond.value}</div>
                  <div className={`text-xs ${getTrendColor(bond.trend)}`}>{bond.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 C — 원자재 & 크립토 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-gray-800 flex items-center">
            🏗️ 원자재 & 크립토
          </h4>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* 원자재 */}
          {globalMarketData.commodities.map((comm, index) => (
            <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">{comm.name}</span>
                <span className="text-lg">{comm.icon}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{comm.value}</div>
              <div className={`text-xs ${getTrendColor(comm.trend)} mb-1`}>{comm.change}</div>
              <div className="text-xs text-yellow-700">{comm.label}</div>
            </div>
          ))}
          
          {/* 크립토 */}
          {globalMarketData.crypto.map((crypto, index) => (
            <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-3 relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-gray-800">{crypto.name}</span>
                  {crypto.name === 'BTC' && (
                    <button
                      onMouseEnter={() => showTooltip('BTC')}
                      onMouseLeave={hideTooltip}
                      onClick={() => openDetailModal('BTC')}
                      className="text-purple-500 hover:text-purple-700 text-xs"
                    >
                      ⓘ
                    </button>
                  )}
                </div>
                <span className="text-lg">{crypto.icon}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{crypto.value}</div>
              <div className={`text-xs ${getTrendColor(crypto.trend)} mb-1`}>{crypto.change}</div>
              <div className="text-xs text-purple-700">{crypto.label}</div>
              
              {/* BTC 툴팁 */}
              {tooltipVisible === 'BTC' && crypto.name === 'BTC' && (
                <div className="absolute z-10 bg-black text-white text-xs rounded p-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64">
                  <div className="font-semibold mb-1">BTC 설명</div>
                  <div>{(globalMarketData.indicatorExplanations as any)['BTC']?.oneLine}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 D — 변동성·스트레스 지표 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-gray-800 flex items-center">
            📊 변동성 & 스트레스
          </h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {globalMarketData.volatility.map((vol, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-gray-800">{vol.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getVolatilityColor(vol.color)}`}>
                  {vol.status}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{vol.value}</div>
              <div className="text-xs text-gray-500 mb-2">{vol.range}</div>
              <div className="text-xs text-gray-600">{vol.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 E — AI 요약 인사이트 */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
        <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
          🤖 AI 종합 인사이트
        </h4>
        <div className="space-y-3">
          {globalMarketData.insights.map((insight, index) => (
            <div key={index} className="flex items-start">
              <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${
                insight.category === '결론' ? 'bg-purple-500' : 'bg-blue-500'
              }`}></span>
              <div>
                <span className="font-semibold text-purple-800 text-sm">{insight.category}: </span>
                <span className="text-purple-700 text-sm">{insight.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white text-center mb-6">
        <div className="text-2xl mb-3">⚖️</div>
        <h3 className="text-xl font-bold mb-2">자산배분으로 반영하기</h3>
        <p className="text-green-100 mb-4">
          글로벌 시장 분석을 바탕으로 데이비드가<br />
          맞춤형 자산배분 전략을 제시합니다.
        </p>
        <div className="flex justify-center gap-2 mb-4">
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            {userProfile.type}
          </span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            {aiLevel === 'reference' ? '참고형' : aiLevel === 'collaboration' ? '협업형' : '가이드형'}
          </span>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
        >
          ← 이전
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 w-full sm:w-auto font-semibold"
        >
          자산배분 받기 →
        </button>
      </div>

      {/* AI 지표 설명 상세 모달 */}
      {detailModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeDetailModal}
          />

          {/* 모달 컨텐츠 */}
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                📈 {detailModal.indicator} 설명
              </h3>
              <button
                onClick={closeDetailModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">한줄 요약</h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  {detailModal.content.oneLine}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">조금 더 자세히</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {detailModal.content.detailed}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={closeDetailModal}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                닫기
              </button>
            </div>
            
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500 italic">
                &quot;AI가 복잡한 지표를 쉬운 말로 설명해드립니다&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}