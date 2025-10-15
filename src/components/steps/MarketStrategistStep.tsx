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
    aiSummary: "중앙은행의 금리 인하 기대감이 높아지면서 시장 분위기가 좋아지고 있습니다. 시장 변동성은 적당한 수준이며, 주식 등 위험자산들이 선별적으로 상승하고 있는 상황입니다.",
    position: "위험자산 선호", // 위험자산 선호 / 관망 / 안전자산 선호
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
        name: '나스닥', 
        value: '15,240', 
        change1D: '+0.7%', 
        change1W: '+2.3%', 
        trend: 'up',
        topSectors: ['Technology +3.1%', 'Communication +2.4%', 'Consumer Disc +1.8%'],
        bottomSectors: ['Utilities -0.8%', 'Consumer Staples -0.5%', 'Real Estate -0.3%']
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
    ]
  }

  const handleNext = () => {
    onNext({ marketData: globalMarketData })
  }

  const getPositionBadgeColor = (position: string) => {
    switch(position) {
      case '위험자산 선호': return 'bg-green-500/20 text-green-300 border-green-400/30'
      case '안전자산 선호': return 'bg-red-500/20 text-red-300 border-red-400/30'
      default: return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30'
    }
  }

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  return (
    <div className="pt-16 pb-6 px-2 md:px-4">
      <div className="relative z-10 container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-4 md:p-8 border border-white/10 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-purple-500/5 rounded-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">🌍</div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">시장전략가 마쿠스</h2>
              <p className="text-emerald-400 font-medium mb-2 italic text-sm md:text-base">"글로벌 마켓 인사이트의 마스터"</p>
              <p className="text-purple-200 mb-4 text-sm md:text-base leading-relaxed">안녕하세요! 저는 마쿠스입니다. 복잡한 시장 데이터를 초보자도 이해하기 쉬운 인사이트로 풀어서 설명해드립니다. 지금 시장에서 일어나고 있는 일들이 여러분의 투자에 어떤 영향을 주는지 알려드릴게요.</p>
            </div>
          </div>

          {/* Global Equities */}
          <div className="relative bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-blue-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-base md:text-lg font-bold text-white mb-4">🌏 전 세계 주식 시장 동향</h3>
              <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-4 md:p-5 mb-4 border-l-4 border-cyan-400 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-3">
                  <div className="bg-cyan-500/20 rounded-full p-2 self-start">
                    <span className="text-cyan-300 text-lg">💡</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-cyan-100 font-bold text-base md:text-lg mb-3 flex items-center flex-wrap">
                      <span className="mr-2">🌍</span>
                      마쿠스의 글로벌 주식 인사이트
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-cyan-800/20 rounded-lg p-3 md:p-4 border border-cyan-500/30">
                        <div className="flex items-center mb-2 flex-wrap">
                          <span className="text-green-400 text-lg md:text-xl mr-2 md:mr-3">✅</span>
                          <span className="text-white font-semibold text-sm md:text-base">긴정적 신호</span>
                        </div>
                        <p className="text-cyan-100 text-xs md:text-sm leading-relaxed ml-0 md:ml-8">
                          전 세계 주식 시장이 대부분 상승 중입니다. 특히 <span className="text-cyan-300 font-medium">미국 나스닥(+2.3%)</span>과 <span className="text-cyan-300 font-medium">한국 코스피(+2.1%)</span>가 좋은 모습을 보이고 있어요.
                        </p>
                      </div>
                      <div className="bg-blue-800/20 rounded-lg p-3 md:p-4 border border-blue-500/30">
                        <div className="flex items-center mb-2 flex-wrap">
                          <span className="text-yellow-400 text-lg md:text-xl mr-2 md:mr-3">🚀</span>
                          <span className="text-white font-semibold text-sm md:text-base">주목 업종</span>
                        </div>
                        <p className="text-blue-100 text-xs md:text-sm leading-relaxed ml-0 md:ml-8">
                          <span className="text-green-300 font-medium">반도체</span>와 <span className="text-green-300 font-medium">IT 업종</span>이 전반적으로 좋은 성과를 보이고 있어 관련 주식에 주목해볼 만합니다.
                        </p>
                      </div>
                      <div className="bg-indigo-800/20 rounded-lg p-3 md:p-4 border border-indigo-500/30">
                        <div className="flex items-center mb-2 flex-wrap">
                          <span className="text-purple-400 text-lg md:text-xl mr-2 md:mr-3">📈</span>
                          <span className="text-white font-semibold text-sm md:text-base">투자 의미</span>
                        </div>
                        <p className="text-indigo-100 text-xs md:text-sm leading-relaxed ml-0 md:ml-8">
                          이러한 상승세는 <span className="text-purple-300 font-medium">글로벌 경기 회복 기대감</span>이 높아지고 있다는 신호로, 주식 투자에 유리한 환경입니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {globalMarketData.equities.map((equity, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-xl p-4 border border-blue-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{equity.name}</h4>
                      <span className="text-xs text-blue-300">{equity.region}</span>
                    </div>
                    <div className="text-xl font-bold text-blue-300 mb-1">{equity.value}</div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className={getTrendColor(equity.trend)}>1D: {equity.change1D}</span>
                      <span className={getTrendColor(equity.trend)}>1W: {equity.change1W}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-green-300">상승: {equity.topSectors[0]}</div>
                      <div className="text-xs text-red-300">하락: {equity.bottomSectors[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FX & Bonds */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="relative bg-gradient-to-br from-slate-800/80 to-green-900/80 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-green-500/5 rounded-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-bold text-white mb-4">💱 환율 동향</h3>
                <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-3 md:p-4 mb-4 border-l-4 border-emerald-400">
                  <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-3">
                    <div className="bg-emerald-500/20 rounded-full p-2 self-start">
                      <span className="text-emerald-300 text-lg">💰</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-emerald-100 font-bold mb-3 text-sm md:text-base">환율 동향이 주는 시사점</h4>
                      <div className="grid gap-3">
                        <div className="bg-emerald-800/20 rounded-lg p-3 border border-emerald-500/20">
                          <div className="flex items-center mb-1 flex-wrap">
                            <span className="text-green-400 mr-2">📉</span>
                            <span className="text-white font-medium text-xs md:text-sm">달러 약세 진행</span>
                          </div>
                          <p className="text-emerald-200 text-xs leading-relaxed">
                            우리나라 <span className="text-emerald-300 font-medium">수출 기업</span>들에게 좋은 소식이에요
                          </p>
                        </div>
                        <div className="bg-green-800/20 rounded-lg p-3 border border-green-500/20">
                          <div className="flex items-center mb-1 flex-wrap">
                            <span className="text-yellow-400 mr-2">🌍</span>
                            <span className="text-white font-medium text-xs md:text-sm">해외투자 유리</span>
                          </div>
                          <p className="text-green-200 text-xs leading-relaxed">
                            외국 주식 투자시 <span className="text-green-300 font-medium">환율 리스크 감소</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {globalMarketData.fxRates.map((fx, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border border-green-400/20">
                      <div>
                        <div className="font-medium text-white">{fx.name}</div>
                        <div className="text-xs text-green-300">{fx.label}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">{fx.value}</div>
                        <div className={`text-xs ${getTrendColor(fx.trend)}`}>{fx.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-slate-800/80 to-yellow-900/80 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-yellow-500/5 rounded-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-bold text-white mb-4">📊 채권 동향</h3>
                <div className="bg-gradient-to-r from-yellow-900/40 to-amber-900/40 rounded-xl p-3 md:p-4 mb-4 border-l-4 border-amber-400">
                  <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-3">
                    <div className="bg-amber-500/20 rounded-full p-2 self-start">
                      <span className="text-amber-300 text-lg">📈</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-amber-100 font-bold mb-3 text-sm md:text-base">금리 하락이 주는 기회</h4>
                      <div className="space-y-3">
                        <div className="bg-amber-800/20 rounded-lg p-3 border border-amber-500/20">
                          <div className="flex items-center mb-2 flex-wrap">
                            <span className="text-yellow-400 mr-2">📉</span>
                            <span className="text-white font-medium text-xs md:text-sm">미국 금리 하락 중</span>
                          </div>
                          <p className="text-amber-200 text-xs leading-relaxed">
                            앞으로 미국 중앙은행이 <span className="text-amber-300 font-medium">금리를 더 내릴 가능성</span>이 높아지고 있어요
                          </p>
                        </div>
                        <div className="bg-yellow-800/20 rounded-lg p-3 border border-yellow-500/20">
                          <div className="flex items-center mb-2 flex-wrap">
                            <span className="text-green-400 mr-2">🚀</span>
                            <span className="text-white font-medium text-xs md:text-sm">주식에 유리한 환경</span>
                          </div>
                          <p className="text-yellow-200 text-xs leading-relaxed">
                            금리가 내리면 <span className="text-yellow-300 font-medium">주식에 돈이 몰리는</span> 경향이 있어 투자에 유리합니다
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {globalMarketData.bonds.map((bond, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border border-yellow-400/20">
                      <div>
                        <div className="font-medium text-white">{bond.name}</div>
                        <div className="text-xs text-yellow-300">{bond.label}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-400">{bond.value}</div>
                        <div className={`text-xs ${getTrendColor(bond.trend)}`}>{bond.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Commodities & Crypto */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="relative bg-gradient-to-br from-slate-800/80 to-orange-900/80 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-orange-500/5 rounded-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-bold text-white mb-4">🏛️ 원자재 동향</h3>
                <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-xl p-3 md:p-4 mb-4 border-l-4 border-orange-400">
                  <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-3">
                    <div className="bg-orange-500/20 rounded-full p-2 self-start">
                      <span className="text-orange-300 text-lg">🏛️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-orange-100 font-bold mb-3 text-sm md:text-base">원자재 시장 동향</h4>
                      <div className="grid gap-3">
                        <div className="bg-yellow-800/30 rounded-lg p-3 border border-yellow-500/20">
                          <div className="flex items-center mb-2 flex-wrap">
                            <span className="text-yellow-400 mr-2">🏆</span>
                            <span className="text-white font-medium text-xs md:text-sm">금 가격 상승</span>
                          </div>
                          <p className="text-yellow-200 text-xs leading-relaxed">
                            경제 불안할 때 <span className="text-yellow-300 font-medium">안전자산</span> 역할을 하는 금이 상승 중
                          </p>
                        </div>
                        <div className="bg-orange-800/30 rounded-lg p-3 border border-orange-500/20">
                          <div className="flex items-center mb-2 flex-wrap">
                            <span className="text-orange-400 mr-2">⛽</span>
                            <span className="text-white font-medium text-xs md:text-sm">석유 가격 상승</span>
                          </div>
                          <p className="text-orange-200 text-xs leading-relaxed">
                            <span className="text-orange-300 font-medium">글로벌 경제 회복 기대감</span>을 반영한 상승세
                          </p>
                        </div>
                        <div className="bg-red-800/20 rounded-lg p-3 border border-red-500/20">
                          <div className="flex items-center mb-1 flex-wrap">
                            <span className="text-red-400 mr-2">📈</span>
                            <span className="text-white font-medium text-xs md:text-sm">투자 기회</span>
                          </div>
                          <p className="text-red-200 text-xs">원자재 관련 주식이나 ETF 고려</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {globalMarketData.commodities.map((commodity, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border border-orange-400/20">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{commodity.icon}</span>
                        <div>
                          <div className="font-medium text-white">{commodity.name}</div>
                          <div className="text-xs text-orange-300">{commodity.label}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-400">{commodity.value}</div>
                        <div className={`text-xs ${getTrendColor(commodity.trend)}`}>{commodity.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-slate-800/80 to-purple-900/80 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-purple-500/5 rounded-2xl"></div>
              <div className="relative z-10">
                <h3 className="text-base md:text-lg font-bold text-white mb-4">₿ 암호화폐 동향</h3>
                <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-xl p-3 md:p-4 mb-4 border-l-4 border-purple-400">
                  <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-3">
                    <div className="bg-purple-500/20 rounded-full p-2 self-start">
                      <span className="text-purple-300 text-lg">₿</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-purple-100 font-bold mb-3 text-sm md:text-base">암호화폐 시장 동향</h4>
                      <div className="space-y-3">
                        <div className="bg-purple-800/20 rounded-lg p-3 border border-purple-500/20">
                          <div className="flex items-center mb-2 flex-wrap">
                            <span className="text-green-400 mr-2">🚀</span>
                            <span className="text-white font-medium text-xs md:text-sm">비트코인 상승세</span>
                          </div>
                          <p className="text-purple-200 text-xs leading-relaxed">
                            투자자들이 <span className="text-purple-300 font-medium">위험자산에 대한 선호도</span>가 높아졌다는 신호
                          </p>
                        </div>
                        <div className="bg-red-800/20 rounded-lg p-3 border border-red-500/20">
                          <div className="flex items-center mb-2 flex-wrap">
                            <span className="text-yellow-400 mr-2">⚠️</span>
                            <span className="text-white font-medium text-xs md:text-sm">주의사항</span>
                          </div>
                          <p className="text-red-200 text-xs leading-relaxed">
                            암호화폐는 <span className="text-red-300 font-medium">변동성이 매우 크니</span> 신중한 투자 필요
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {globalMarketData.crypto.map((crypto, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg border border-purple-400/20">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{crypto.icon}</span>
                        <div>
                          <div className="font-medium text-white">{crypto.name}</div>
                          <div className="text-xs text-purple-300">{crypto.label}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-400">{crypto.value}</div>
                        <div className={`text-xs ${getTrendColor(crypto.trend)}`}>{crypto.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Volatility Indicators */}
          <div className="relative bg-gradient-to-br from-slate-800/80 to-red-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-red-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-4">📈 시장 안정성 체크</h3>
              <div className="bg-gradient-to-r from-red-900/40 to-pink-900/40 rounded-xl p-5 mb-4 border-l-4 border-pink-400">
                <div className="flex items-start space-x-3">
                  <div className="bg-pink-500/20 rounded-full p-2 mt-1">
                    <span className="text-pink-300 text-lg">📊</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-pink-100 font-bold text-lg mb-3 flex items-center">
                      <span className="mr-2">�</span>
                      지금 시장은 어떤 상황인가요?
                    </h4>
                    <div className="grid gap-3">
                      <div className="bg-green-800/20 rounded-lg p-4 border border-green-500/30">
                        <div className="flex items-center mb-2">
                          <span className="text-green-400 text-xl mr-3">✅</span>
                          <span className="text-white font-semibold">안정적인 시장</span>
                        </div>
                        <p className="text-green-100 text-sm leading-relaxed ml-8">
                          VIX(공포지수)가 <span className="text-green-300 font-medium">16.2로 낮은 수준</span>을 유지하고 있어 시장이 비교적 안정적입니다.
                        </p>
                      </div>
                      <div className="bg-blue-800/20 rounded-lg p-4 border border-blue-500/30">
                        <div className="flex items-center mb-2">
                          <span className="text-blue-400 text-xl mr-3">📋</span>
                          <span className="text-white font-semibold">채권과 신용 시장 양호</span>
                        </div>
                        <p className="text-blue-100 text-sm leading-relaxed ml-8">
                          채권 변동성과 신용 스프레드가 모두 <span className="text-blue-300 font-medium">낮은 수준</span>을 유지하고 있어요.
                        </p>
                      </div>
                      <div className="bg-yellow-800/20 rounded-lg p-4 border border-yellow-500/30">
                        <div className="flex items-center mb-2">
                          <span className="text-yellow-400 text-xl mr-3">📈</span>
                          <span className="text-white font-semibold">투자하기 좋은 환경</span>
                        </div>
                        <p className="text-yellow-100 text-sm leading-relaxed ml-8">
                          다만 너무 안주하지 말고 <span className="text-yellow-300 font-medium">시장 변화를 계속 지켜봐야</span> 합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {globalMarketData.volatility.map((vol, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-xl p-3 md:p-4 border border-red-400/20">
                    <div className="text-center">
                      <h4 className="font-semibold text-white mb-1 text-sm md:text-base">{vol.name}</h4>
                      <div className="text-xl md:text-2xl font-bold text-red-400 mb-2">{vol.value}</div>
                      <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${
                        vol.color === 'green' ? 'bg-green-500/20 text-green-300 border-green-400/30' :
                        vol.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' :
                        'bg-red-500/20 text-red-300 border-red-400/30'
                      }`}>
                        {vol.status}
                      </div>
                      <div className="text-xs text-red-200 mt-2">{vol.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI 종합 판단 - 마지막 섹션 */}
          <div className="relative bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-purple-400/30 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-purple-500/10 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center justify-center">
                <span className="mr-3">🤖</span>
                AI 종합 판단
              </h3>
              
              {/* 전체 추천 */}
              <div className="text-center mb-6">
                <div className="text-lg md:text-xl font-bold text-emerald-400 mb-3 leading-relaxed">{globalMarketData.aiSummary}</div>
                <span className={`px-4 md:px-6 py-3 rounded-full text-sm md:text-base font-bold border-2 ${getPositionBadgeColor(globalMarketData.position)}`}>
                  {globalMarketData.position} 추천
                </span>
              </div>

              {/* 종합 분석 요약 */}
              <div className="bg-slate-800/50 rounded-xl p-4 md:p-6 border border-purple-300/20">
                <h4 className="text-purple-200 font-bold text-lg md:text-xl mb-4 flex items-center justify-center">
                  <span className="mr-2">📋</span>
                  마쿠스의 핵심 요약
                </h4>
                
                <div className="grid gap-4 md:gap-6">
                  {/* 긍정적 요인들 */}
                  <div className="bg-green-900/30 rounded-lg p-4 border-l-4 border-green-400">
                    <div className="flex items-center mb-3">
                      <span className="text-green-400 text-xl mr-3">✅</span>
                      <span className="text-green-100 font-semibold text-base md:text-lg">투자에 유리한 환경</span>
                    </div>
                    <ul className="text-green-200 text-sm space-y-2 ml-6">
                      <li>• 글로벌 주식 시장 상승세 (미국 나스닥 +2.3%, 한국 코스피 +2.1%)</li>
                      <li>• 달러 약세로 수출기업 및 해외투자 유리</li>
                      <li>• 미국 금리 하락 기대감으로 주식 투자 환경 개선</li>
                      <li>• 시장 안정성 지표(VIX 16.2) 양호한 수준</li>
                    </ul>
                  </div>

                  {/* 주목할 섹터 */}
                  <div className="bg-blue-900/30 rounded-lg p-4 border-l-4 border-blue-400">
                    <div className="flex items-center mb-3">
                      <span className="text-blue-400 text-xl mr-3">🎯</span>
                      <span className="text-blue-100 font-semibold text-base md:text-lg">주목할 투자 섹터</span>
                    </div>
                    <ul className="text-blue-200 text-sm space-y-2 ml-6">
                      <li>• <span className="text-blue-300 font-medium">반도체 & IT 기술주</span> - 글로벌 성장세 지속</li>
                      <li>• <span className="text-blue-300 font-medium">원자재 관련 주식/ETF</span> - 금, 석유 가격 상승</li>
                      <li>• <span className="text-blue-300 font-medium">수출 중심 기업</span> - 달러 약세 수혜</li>
                    </ul>
                  </div>

                  {/* 주의사항 */}
                  <div className="bg-yellow-900/30 rounded-lg p-4 border-l-4 border-yellow-400">
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-400 text-xl mr-3">⚠️</span>
                      <span className="text-yellow-100 font-semibold text-base md:text-lg">투자시 주의사항</span>
                    </div>
                    <ul className="text-yellow-200 text-sm space-y-2 ml-6">
                      <li>• 암호화폐는 높은 변동성으로 신중한 접근 필요</li>
                      <li>• 시장이 안정적이지만 지속적인 모니터링 중요</li>
                      <li>• 분산투자를 통한 리스크 관리 권장</li>
                    </ul>
                  </div>

                  {/* 최종 결론 */}
                  <div className="bg-purple-900/40 rounded-lg p-4 md:p-6 border border-purple-400/40">
                    <div className="flex items-center mb-3">
                      <span className="text-purple-400 text-xl mr-3">🔮</span>
                      <span className="text-purple-100 font-bold text-base md:text-lg">최종 결론</span>
                    </div>
                    <p className="text-purple-200 text-sm md:text-base leading-relaxed">
                      현재 글로벌 시장은 <span className="text-purple-300 font-semibold">전반적으로 긍정적인 투자 환경</span>을 보이고 있습니다. 
                      특히 기술주와 원자재 섹터에 대한 선별적 투자를 고려하되, 
                      <span className="text-purple-300 font-semibold">분산투자 원칙</span>을 지켜 안정적인 포트폴리오를 구성하는 것이 좋겠습니다.
                    </p>
                  </div>

                  {/* 마쿠스의 서명 */}
                  <div className="text-center mt-6">
                    <div className="bg-slate-700/50 rounded-lg p-4 border border-emerald-400/30">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-emerald-400 text-lg mr-2">💬</span>
                        <span className="text-emerald-200 font-semibold">마쿠스의 마지막 메시지</span>
                      </div>
                      <p className="text-emerald-100 text-sm italic">
                        "투자는 마라톤이지 단거리 달리기가 아닙니다. 안정적이고 지속 가능한 수익을 만들어가세요!"
                      </p>
                      <div className="text-emerald-300 font-medium mt-2">
                        - 시장전략가 마쿠스 -
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-3 md:p-4 border border-white/10 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              <button
                onClick={onPrevious}
                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 font-medium border border-slate-500/50 shadow-lg text-sm md:text-base"
              >
                ← 이전
              </button>
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium transform hover:scale-105 active:scale-95 shadow-lg border border-purple-500/50 text-sm md:text-base"
              >
                다음 단계 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}