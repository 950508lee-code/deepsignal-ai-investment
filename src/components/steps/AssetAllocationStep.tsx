'use client'

import { useState, useRef, useLayoutEffect } from 'react'

interface AssetAllocationStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

type PortfolioType = "defensive" | "balanced" | "growth"
type MarketPosture = "on" | "neutral" | "off"
type UserProfile = "conservative" | "balanced" | "aggressive"

const PORTFOLIO_OPTIONS = [
  {
    key: "defensive" as const,
    title: "안정형",
    subtitle: "Defensive • Income",
    mix: "주식 45% • 채권 40% • 대체·현금 15%",
    description: "변동성을 낮추고 안정적인 수익을 추구합니다",
    icon: "🛡️",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    key: "balanced" as const,
    title: "균형형",
    subtitle: "Core Balanced", 
    mix: "주식 65% • 채권 25% • 대체·현금 10%",
    description: "안정성과 성장성의 균형을 추구합니다",
    icon: "⚖️",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10"
  },
  {
    key: "growth" as const,
    title: "성장형",
    subtitle: "Offense • Growth",
    mix: "주식 85% • 채권 10% • 대체·현금 5%", 
    description: "적극적인 성장을 통한 장기 수익을 추구합니다",
    icon: "🚀",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10"
  }
] as const

function pickRecommendation(
  userProfile: UserProfile,
  marketPosture: MarketPosture,
  macroScore: number
): PortfolioType {
  let scores = { defensive: 0, balanced: 0, growth: 0 }

  if (userProfile === "conservative") scores.defensive += 2
  if (userProfile === "balanced") scores.balanced += 2
  if (userProfile === "aggressive") scores.growth += 2

  if (marketPosture === "on") scores.growth += 1
  if (marketPosture === "off") scores.defensive += 1

  if (macroScore >= 2) scores.growth += 1
  if (macroScore <= -2) scores.defensive += 1

  const maxScore = Math.max(...Object.values(scores))
  if (scores.balanced === maxScore) return "balanced"
  if (scores.growth === maxScore) return "growth"
  return "defensive"
}

function AIInterpretation({ 
  type,
  marketPosture,
  userProfile,
  macroScore,
  isRecommended
}: {
  type: PortfolioType
  marketPosture: MarketPosture
  userProfile: UserProfile
  macroScore: number
  isRecommended: boolean
}) {
  const getMarketTilt = () => {
    if (marketPosture === "on") {
      return "시장 모멘텀이 살아있어 성장 노출을 키워도 되는 구간입니다."
    } else if (marketPosture === "off") {
      return "방어가 필요한 구간으로, 채권·현금 비중을 키워 리스크를 낮추세요."
    } else {
      return "중립 구간으로, 리밸런스와 분할 접근이 유효합니다."
    }
  }

  const getPortfolioComment = () => {
    if (type === "growth") {
      return "성장형은 기술주·AI 비중을 높여 수익 기회를 노립니다."
    } else if (type === "defensive") {
      return "안정형은 배당·퀄리티·채권으로 변동성을 낮춥니다."
    } else {
      return "균형형은 코어(대형주)+채권을 중심으로 흔들림에 강합니다."
    }
  }

  const getPersonalizedComment = () => {
    const profileText = userProfile === "aggressive" ? "적극적인 성향"
      : userProfile === "conservative" ? "안정 선호 성향"
      : "균형잡힌 성향"
    
    return `${profileText}을 고려할 때, 이 포트폴리오는 ${isRecommended ? '가장 적합한' : '대안이 될 수 있는'} 선택입니다.`
  }

  return (
    <div className="mt-4 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl"></div>
      <div className="relative bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-lg shadow-lg">
            🤖
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-lg">AI 해석</span>
            {isRecommended && (
              <span className="relative inline-flex items-center">
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 animate-pulse"></span>
                <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ⭐ 추천
                </span>
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/70 rounded-xl p-4 border border-white/30">
            <p className="text-gray-800 font-medium leading-relaxed">{getMarketTilt()}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4 border border-white/30">
            <p className="text-gray-800 font-medium leading-relaxed">{getPortfolioComment()}</p>
          </div>
          <div className="bg-white/70 rounded-xl p-4 border border-white/30">
            <p className="text-gray-800 font-medium leading-relaxed">{getPersonalizedComment()}</p>
          </div>
          <div className="bg-gradient-to-r from-gray-100/80 to-gray-200/80 rounded-xl p-3 border border-white/20">
            <p className="text-gray-600 text-xs font-medium">
              💡 참고: VIX/DXY/미10Y 등의 보조 시그널 점수({macroScore})를 함께 반영한 코멘트입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AssetAllocationStep({ onNext, onPrevious, userData }: AssetAllocationStepProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioType | null>(null)
  const refs = useRef<Record<string, HTMLDivElement | null>>({})

  const riskTolerance = userData.riskTolerance || 'moderate'
  const investmentProfile = userData.investmentProfile?.mbtiProfile || { type: '균형형 투자자' }
  const marketAnalysis = userData.marketAnalysis || {}
  
  const marketPosture: MarketPosture = marketAnalysis.position === "Risk-on" ? "on"
    : marketAnalysis.position === "Risk-off" ? "off" : "neutral"

  const userProfile: UserProfile = riskTolerance === 'aggressive' ? 'aggressive'
    : riskTolerance === 'conservative' ? 'conservative' : 'balanced'

  const calculateMacroScore = (): number => {
    let score = 0
    if (marketPosture === "on") score += 1
    if (marketPosture === "off") score -= 1
    return Math.max(-2, Math.min(2, score))
  }

  const macroScore = calculateMacroScore()
  const recommendedPortfolio = pickRecommendation(userProfile, marketPosture, macroScore)

  useLayoutEffect(() => {
    if (selectedPortfolio && refs.current[selectedPortfolio]) {
      const element = refs.current[selectedPortfolio]
      setTimeout(() => {
        element?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      }, 100)
    }
  }, [selectedPortfolio])

  const handleNext = () => {
    if (selectedPortfolio) {
      const selectedOption = PORTFOLIO_OPTIONS.find(p => p.key === selectedPortfolio)
      onNext({
        selectedPortfolio,
        portfolioDetails: selectedOption,
        aiRecommendation: recommendedPortfolio,
        marketContext: {
          posture: marketPosture,
          macroScore,
          userProfile
        }
      })
    }
  }

  return (
    <div className="pt-16 pb-6 px-4">
      <div className="max-w-screen-sm mx-auto">
        {/* AI 전문가 소개 카드 */}
        <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-purple-500/5 rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-white mb-2">자산배분전문가 에마</h2>
            <p className="text-emerald-400 font-medium mb-2 italic">"당신의 맞춤형 포트폴리오 설계자"</p>
            <p className="text-purple-200">회원님의 성향과 현재 시장 상황을 반영한 맞춤형 포트폴리오를 제안해드립니다.</p>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-20 rounded-full"></div>
            <h2 className="relative text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2">🎯 자산배분 제안</h2>
          </div>
          <p className="text-blue-100/80 text-sm leading-relaxed">
            회원님의 성향과 현재 시장 상황을 반영한 맞춤형 포트폴리오입니다
          </p>
        </div>

        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-6 border border-white/20 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-lg">📊</div>
              <span className="font-bold text-white text-lg">현재 시장 상황</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur px-3 py-2 rounded-xl text-white text-sm font-medium border border-white/20">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                소피아: {marketAnalysis.position || 'Neutral'}
              </span>
              <span className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur px-3 py-2 rounded-xl text-white text-sm font-medium border border-white/20">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                성향: {investmentProfile.type}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {PORTFOLIO_OPTIONS.map((portfolio) => {
            const isSelected = selectedPortfolio === portfolio.key
            const isRecommended = recommendedPortfolio === portfolio.key

            return (
              <div key={portfolio.key} className="scroll-mt-16">
                <div
                  className={`
                    relative group cursor-pointer transition-all duration-300 transform
                    ${isSelected ? 'scale-[1.02] shadow-2xl shadow-blue-500/25' : 'hover:scale-[1.01] hover:shadow-xl hover:shadow-black/10'}
                  `}
                  onClick={() => setSelectedPortfolio(portfolio.key)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${portfolio.bgGradient} rounded-2xl`}></div>
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                    {isSelected && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${portfolio.gradient} opacity-5`}></div>
                    )}
                    <div className="relative p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${portfolio.gradient} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                          {portfolio.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900">{portfolio.title}</h3>
                            {isRecommended && (
                              <span className="relative inline-flex items-center">
                                <span className={`absolute inset-0 bg-gradient-to-r ${portfolio.gradient} rounded-full blur opacity-75 animate-pulse`}></span>
                                <span className={`relative bg-gradient-to-r ${portfolio.gradient} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                                  ✨ AI 추천
                                </span>
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 font-medium">{portfolio.subtitle}</p>
                        </div>
                      </div>
                      <button
                        className={`
                          relative px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 transform
                          ${isSelected
                            ? `bg-gradient-to-r ${portfolio.gradient} text-white shadow-lg shadow-black/20 scale-105`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 active:scale-95'
                          }
                        `}
                      >
                        {isSelected ? (
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            선택됨
                          </span>
                        ) : '선택'}
                      </button>
                    </div>

                    <div className="mb-4">
                      <div className={`bg-gradient-to-r ${portfolio.bgGradient} rounded-lg p-3 mb-3`}>
                        <p className="text-sm font-semibold text-gray-800 mb-1">{portfolio.mix}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{portfolio.description}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div ref={(el) => { refs.current[portfolio.key] = el }}>
                        <AIInterpretation
                          type={portfolio.key}
                          marketPosture={marketPosture}
                          userProfile={userProfile}
                          macroScore={macroScore}
                          isRecommended={isRecommended}
                        />
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="max-w-screen-sm mx-auto flex gap-4">
            <button
              onClick={onPrevious}
              className="flex-1 py-4 px-6 bg-white/20 backdrop-blur text-white rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/20 transform hover:scale-[1.02] active:scale-95"
            >
              ← 이전
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedPortfolio}
              className={`
                flex-1 py-4 px-6 rounded-2xl font-semibold transition-all duration-200 transform border
                ${selectedPortfolio
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 border-transparent'
                  : 'bg-gray-400/20 text-gray-400 cursor-not-allowed border-gray-400/20'
                }
              `}
            >
              {selectedPortfolio ? '다음 단계 →' : '포트폴리오를 선택하세요'}
            </button>
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  )
}