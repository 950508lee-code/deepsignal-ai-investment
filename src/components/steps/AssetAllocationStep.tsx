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
    color: "bg-blue-50 border-blue-200 text-blue-800"
  },
  {
    key: "balanced" as const,
    title: "균형형",
    subtitle: "Core Balanced", 
    mix: "주식 65% • 채권 25% • 대체·현금 10%",
    description: "안정성과 성장성의 균형을 추구합니다",
    icon: "⚖️",
    color: "bg-green-50 border-green-200 text-green-800"
  },
  {
    key: "growth" as const,
    title: "성장형",
    subtitle: "Offense • Growth",
    mix: "주식 85% • 채권 10% • 대체·현금 5%", 
    description: "적극적인 성장을 통한 장기 수익을 추구합니다",
    icon: "🚀",
    color: "bg-purple-50 border-purple-200 text-purple-800"
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
    <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🤖</span>
        <span className="font-semibold text-gray-800">AI 해석</span>
        {isRecommended && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">추천</span>
        )}
      </div>
      
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="text-gray-700">{getMarketTilt()}</p>
        <p className="text-gray-700">{getPortfolioComment()}</p>
        <p className="text-gray-700">{getPersonalizedComment()}</p>
        <p className="text-gray-500 text-xs">
          참고: VIX/DXY/미10Y 등의 보조 시그널 점수({macroScore})를 함께 반영한 코멘트입니다.
        </p>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 py-6">
      <div className="max-w-screen-sm mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 자산배분 제안</h2>
          <p className="text-gray-600 text-sm">
            회원님의 성향과 현재 시장 상황을 반영한 맞춤형 포트폴리오입니다
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📊</span>
            <span className="font-semibold text-gray-800">현재 시장 상황</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2">
              소피아의 판단: {marketAnalysis.position || 'Neutral'}
            </span>
            <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs">
              회원님 성향: {investmentProfile.type}
            </span>
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
                    ${portfolio.color}
                    rounded-2xl border-2 cursor-pointer transition-all duration-200
                    ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2' : 'hover:shadow-md'}
                  `}
                  onClick={() => setSelectedPortfolio(portfolio.key)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{portfolio.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">{portfolio.title}</h3>
                            {isRecommended && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                AI 추천
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{portfolio.subtitle}</p>
                        </div>
                      </div>
                      <button
                        className={`
                          px-4 py-2 rounded-lg font-medium text-sm transition-colors
                          ${isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                          }
                        `}
                      >
                        {isSelected ? '선택됨' : '선택'}
                      </button>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-800 mb-1">{portfolio.mix}</p>
                      <p className="text-xs text-gray-600">{portfolio.description}</p>
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
            )
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-screen-sm mx-auto flex gap-3">
            <button
              onClick={onPrevious}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedPortfolio}
              className={`
                flex-1 py-3 px-4 rounded-xl font-medium transition-colors
                ${selectedPortfolio
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              다음 단계
            </button>
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  )
}