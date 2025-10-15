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

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">시장전략가 소피아</h2>
        <p className="text-indigo-600 font-medium mb-2 italic">"글로벌 마켓 인텔리전스"</p>
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
            <button 
              onClick={() => toggleSection('equities')}
              className="ml-2 text-xs text-blue-600 hover:text-blue-800"
            >
              📎 근거 4개
            </button>
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
            <button 
              onClick={() => toggleSection('fx')}
              className="ml-2 text-xs text-blue-600 hover:text-blue-800"
            >
              📎 근거 7개
            </button>
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
            <button 
              onClick={() => toggleSection('commodities')}
              className="ml-2 text-xs text-blue-600 hover:text-blue-800"
            >
              📎 근거 4개
            </button>
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
            <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">{crypto.name}</span>
                <span className="text-lg">{crypto.icon}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{crypto.value}</div>
              <div className={`text-xs ${getTrendColor(crypto.trend)} mb-1`}>{crypto.change}</div>
              <div className="text-xs text-purple-700">{crypto.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 D — 변동성·스트레스 지표 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-gray-800 flex items-center">
            📊 변동성 & 스트레스
            <button 
              onClick={() => toggleSection('volatility')}
              className="ml-2 text-xs text-blue-600 hover:text-blue-800"
            >
              📎 근거 3개
            </button>
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
    </div>
  )
}