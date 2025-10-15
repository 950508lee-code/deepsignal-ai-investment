'use client'

import { useState } from 'react'

interface AssetAllocationStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function AssetAllocationStep({ onNext, onPrevious, userData }: AssetAllocationStepProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>('')
  
  const riskTolerance = userData.riskTolerance || 'moderate'
  const investmentProfile = userData.investmentProfile?.mbtiProfile || { type: '균형형 투자자' }
  const marketAnalysis = userData.marketAnalysis || {}
  
  // 성향 보완 로직
  const getPersonalityComplement = () => {
    const profile = investmentProfile.type
    if (profile.includes('감성') || profile.includes('직관')) {
      return {
        weakness: '감정적 판단',
        complement: '데이터 기반 체계적 접근',
        recommendation: '안정적 자산 비중을 늘려 변동성을 완충하세요'
      }
    } else if (profile.includes('분석') || profile.includes('논리')) {
      return {
        weakness: '과도한 신중함',
        complement: '적절한 위험 감수',
        recommendation: '성장 기회를 놓치지 않도록 위험자산 비중을 늘리세요'
      }
    } else {
      return {
        weakness: '안전 선호',
        complement: '전략적 위험 관리',
        recommendation: '균형잡힌 접근으로 안정성과 성장성을 모두 추구하세요'
      }
    }
  }
  
  // AI 포트폴리오 제안
  const getPortfolioOptions = () => {
    if (riskTolerance === 'aggressive') {
      return {
        userType: '고수익 추구형',
        description: 'AI는 이를 기반으로 **리스크 대비 효율적인 포트폴리오 두 가지**를 제시합니다.',
        options: [
          {
            id: 'aggressive1',
            title: '고수익 추구형',
            subtitle: 'AI 추천',
            allocation: '주식 85% / 대안 10% / 현금 5%',
            expectedReturn: '12–15%',
            riskLevel: '높음',
            aiComment: '"공격적이지만 효율적입니다. 시장 모멘텀을 극대화할 구조입니다."',
            recommended: true,
            details: {
              strengths: ['높은 성장 잠재력', '시장 상승 시 최대 수익', '장기 복리 효과'],
              considerations: ['단기 변동성 높음', '시장 하락 시 손실 확대', '정기적 리밸런싱 필요']
            }
          },
          {
            id: 'aggressive2',
            title: '성장주 집중형',
            subtitle: '대안 제시',
            allocation: '성장주 70% / 배당 20% / 채권 10%',
            expectedReturn: '10–13%',
            riskLevel: '중간',
            aiComment: '"조금 더 안정적으로 성장주에 집중할 수 있습니다."',
            recommended: false,
            details: {
              strengths: ['성장주 모멘텀 포착', '배당으로 안정성 확보', '적절한 리스크 관리'],
              considerations: ['성장주 변동성', '섹터 집중 위험', '금리 민감성']
            }
          }
        ]
      }
    } else if (riskTolerance === 'moderate') {
      return {
        userType: '균형 투자형',
        description: 'AI는 이를 기반으로 **안정성과 성장의 균형잡힌 포트폴리오 두 가지**를 제시합니다.',
        options: [
          {
            id: 'moderate1',
            title: '균형 성장형',
            subtitle: 'AI 추천',
            allocation: '주식 60% / 채권 30% / 대안 10%',
            expectedReturn: '8–10%',
            riskLevel: '보통',
            aiComment: '"안정성과 성장성의 최적 균형점입니다. 장기적으로 꾸준한 성과를 기대할 수 있습니다."',
            recommended: true,
            details: {
              strengths: ['안정적 수익 구조', '분산투자 효과', '시장 변동성 완충'],
              considerations: ['중간 수준 수익률', '인플레이션 리스크', '주기적 조정 필요']
            }
          },
          {
            id: 'moderate2',
            title: '배당 중심형',
            subtitle: '대안 제시',
            allocation: '배당주 50% / 채권 35% / 현금 15%',
            expectedReturn: '6–8%',
            riskLevel: '낮음',
            aiComment: '"정기적인 현금흐름을 원한다면 이 구조가 적합합니다."',
            recommended: false,
            details: {
              strengths: ['안정적 현금흐름', '낮은 변동성', '인플레이션 보호'],
              considerations: ['제한적 성장성', '배당 삭감 위험', '금리 상승 영향']
            }
          }
        ]
      }
    } else {
      return {
        userType: '안전 추구형',
        description: 'AI는 이를 기반으로 **원금 보호와 안정 수익에 집중한 포트폴리오 두 가지**를 제시합니다.',
        options: [
          {
            id: 'conservative1',
            title: '안정 수익형',
            subtitle: 'AI 추천',
            allocation: '채권 50% / 배당주 30% / 현금 20%',
            expectedReturn: '4–6%',
            riskLevel: '낮음',
            aiComment: '"원금 안전성을 최우선으로 하면서도 인플레이션을 방어할 수 있습니다."',
            recommended: true,
            details: {
              strengths: ['원금 안전성', '예측 가능한 수익', '낮은 스트레스'],
              considerations: ['낮은 수익률', '인플레이션 리스크', '기회비용 발생']
            }
          },
          {
            id: 'conservative2',
            title: '원금보장형',
            subtitle: '대안 제시',
            allocation: '예금 40% / 채권 40% / 배당주 20%',
            expectedReturn: '3–5%',
            riskLevel: '매우 낮음',
            aiComment: '"절대적 안전성을 추구한다면 이 포트폴리오가 최적입니다."',
            recommended: false,
            details: {
              strengths: ['최고 수준 안전성', '원금 보장', '유동성 확보'],
              considerations: ['매우 낮은 수익률', '인플레이션 손실', '기회비용 큼']
            }
          }
        ]
      }
    }
  }

  const portfolioData = getPortfolioOptions()
  const selectedOption = portfolioData.options.find(opt => opt.id === selectedPortfolio)

  const handleNext = () => {
    onNext({ 
      selectedAssetAllocation: selectedOption,
      portfolioType: portfolioData.userType
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">⚖️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">자산배분전문가 데이비드</h2>
        <p className="text-green-600 font-medium mb-2 italic">"균형과 안정성의 마스터"</p>
        <p className="text-gray-600 mb-4">안녕하세요! 저는 데이비드입니다. 데이터 기반의 정교한 분석으로 당신만의 최적 자산배분 전략을 설계해드리겠습니다.</p>
      </div>

      {/* 시장 분석 기반 성향 보완 전략 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">� AI 성향 보완 전략</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4">
            <p className="text-blue-800 text-sm sm:text-base leading-relaxed mb-2">
              <strong>당신의 투자 성향:</strong> <span className="text-blue-900 font-semibold">{portfolioData.userType}</span>
            </p>
            <p className="text-blue-700 text-sm leading-relaxed mb-3">
              <strong>보완 필요 영역:</strong> {portfolioData.complement.weakness} → {portfolioData.complement.complement}
            </p>
            <p className="text-blue-600 text-sm italic">
              "{portfolioData.complement.recommendation}"
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-3">
            <p className="text-sm text-purple-800">
              <strong>소피아의 시장 분석:</strong> {portfolioData.marketContext}
            </p>
          </div>
          <p className="text-blue-700 text-sm leading-relaxed">
            {portfolioData.description}
          </p>
        </div>
      </div>

      {/* ② AI 포트폴리오 선택 카드 */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4">📊 AI 포트폴리오 제안</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {portfolioData.options.map((option) => (
            <div 
              key={option.id}
              className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                selectedPortfolio === option.id 
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              } ${option.recommended ? 'ring-2 ring-green-200' : ''}`}
              onClick={() => setSelectedPortfolio(option.id)}
            >
              {/* 추천 배지 */}
              {option.recommended && (
                <div className="absolute -top-2 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    AI 추천
                  </span>
                </div>
              )}
              
              {/* 선택 상태 표시 */}
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-bold text-gray-900">{option.title}</h5>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPortfolio === option.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {selectedPortfolio === option.id && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-700 mb-1">📈 추천 포트폴리오</p>
                  <p className="text-gray-900 font-medium">{option.allocation}</p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-gray-600">예상수익률</p>
                    <p className="font-semibold text-green-600">{option.expectedReturn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">리스크</p>
                    <p className={`font-semibold ${
                      option.riskLevel === '높음' ? 'text-red-600' : 
                      option.riskLevel === '보통' || option.riskLevel === '중간' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{option.riskLevel}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 italic">{option.aiComment}</p>
                </div>
                
                {/* 소피아 시장 분석 근거 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h6 className="text-xs font-semibold text-blue-800 mb-2 flex items-center">
                    📊 소피아의 시장 분석 근거
                  </h6>
                  <div className="text-xs text-blue-700">
                    {option.recommended ? (
                      <div className="space-y-1">
                        <div>• AI·반도체 실적 상향 구간 활용</div>
                        <div>• 에너지 전환 정책 드라이브 활용</div>
                        <div>• 변동성 완충을 위한 안정 자산 배치</div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div>• 전통적 자산 배분 접근법</div>
                        <div>• 시장 기회 미반영 가능성</div>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPortfolio(option.id)
                  }}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    selectedPortfolio === option.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPortfolio === option.id ? '✅ 선택됨' : '🔘 선택하기'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ③ 선택 후 AI 해석 섹션 */}
      {selectedOption && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
            💬 AI 해석
          </h4>
          <p className="text-purple-800 text-sm leading-relaxed mb-4">
            당신의 투자성향(<strong>{investmentProfile.type}</strong>)과 선택한 포트폴리오를 조합하면, 
            시장 변동성에 탄력적으로 대응하면서 수익 기회를 극대화할 수 있습니다.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-green-800 mb-2">💪 주요 강점</h5>
              <ul className="space-y-1">
                {selectedOption.details.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-orange-800 mb-2">⚠️ 고려사항</h5>
              <ul className="space-y-1">
                {selectedOption.details.considerations.map((consideration, index) => (
                  <li key={index} className="text-sm text-orange-700 flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ④ 다음 단계 */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white text-center mb-6">
        <div className="text-2xl mb-3">🧭</div>
        <h3 className="text-xl font-bold mb-2">다음 단계</h3>
        <p className="text-green-100 mb-4">
          선택한 자산배분 결과를 기반으로<br />
          '산업리서처 리사'가 유망 섹터를 분석하고 제시합니다.
        </p>
        <div className="text-sm text-green-200">
          "데이터 기반 섹터 분석으로 투자 기회를 발굴합니다"
        </div>
      </div>

      {/* 하단 CTA */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
        >
          ← 이전
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedPortfolio}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto font-semibold"
        >
          산업 분석 받기 →
        </button>
      </div>
    </div>
  )
}