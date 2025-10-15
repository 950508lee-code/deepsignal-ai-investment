'use client';

import { useState } from 'react';

interface InvestmentAnalysisStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

interface InvestmentProfileData {
  riskTolerance: string
  investmentGoal: string
  timeHorizon: string
  financialSituation: string
  investmentExperience: string
  marketViewpoint: string
  emotionalResponse: string
  diversificationPreference: string
}

export default function InvestmentAnalysisStep({ onNext, onPrevious, userData }: InvestmentAnalysisStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<InvestmentProfileData>({
    riskTolerance: '',
    investmentGoal: '',
    timeHorizon: '',
    financialSituation: '',
    investmentExperience: '',
    marketViewpoint: '',
    emotionalResponse: '',
    diversificationPreference: ''
  })
  const [showResult, setShowResult] = useState(false)

  // 소피아로부터 받은 기본 정보
  const consultantData = userData || {}

  // 투자 경험 텍스트 변환
  const getExperienceText = (exp: string) => {
    switch(exp) {
      case 'none': return '투자 경험 없음'
      case 'beginner': return '초보자 (예적금, 펀드)'
      case 'intermediate': return '중급자 (주식, ETF)'
      case 'advanced': return '숙련자 (파생상품)'
      case 'expert': return '전문가 (포트폴리오 관리)'
      default: return '미설정'
    }
  }

  // 투자 금액 텍스트 변환
  const getAmountText = (amount: string) => {
    switch(amount) {
      case 'under500': return '500만원 미만'
      case '500-1000': return '500만원-1천만원'
      case '1000-3000': return '1천만원-3천만원'
      case '3000-5000': return '3천만원-5천만원'
      case '5000-10000': return '5천만원-1억원'
      case 'over10000': return '1억원 이상'
      default: return '미설정'
    }
  }

  const questions = [
    {
      id: 'riskTolerance',
      question: '투자에서 손실이 발생한다면 어떻게 반응하시겠습니까?',
      description: '투자 시 발생할 수 있는 손실에 대한 귀하의 태도를 알려주세요.',
      options: [
        { value: 'conservative', label: '즉시 손실을 확정하고 안전한 자산으로 이동', emoji: '🛡️' },
        { value: 'moderate-conservative', label: '일부만 매도하고 나머지는 회복을 기다림', emoji: '⚖️' },
        { value: 'moderate-aggressive', label: '현재 포지션을 유지하며 시장 회복을 기다림', emoji: '📊' },
        { value: 'aggressive', label: '추가 매수로 평균 단가를 낮춤', emoji: '🚀' }
      ]
    },
    {
      id: 'investmentGoal',
      question: '주요 투자 목표는 무엇입니까?',
      description: '투자를 통해 달성하고자 하는 목표를 선택해주세요.',
      options: [
        { value: 'capital-preservation', label: '원금 보존 (인플레이션 대응)', emoji: '🏦' },
        { value: 'steady-income', label: '안정적인 수익 창출', emoji: '💰' },
        { value: 'balanced-growth', label: '자산 증식과 안정성의 균형', emoji: '📈' },
        { value: 'aggressive-growth', label: '적극적인 자산 증식', emoji: '🎯' }
      ]
    },
    {
      id: 'timeHorizon',
      question: '투자 기간은 얼마나 계획하고 계십니까?',
      description: '투자한 자금을 사용할 예정 시기를 알려주세요.',
      options: [
        { value: 'short', label: '1년 이내', emoji: '⏰' },
        { value: 'medium-short', label: '1-3년', emoji: '📅' },
        { value: 'medium-long', label: '3-7년', emoji: '🗓️' },
        { value: 'long', label: '7년 이상', emoji: '⏳' }
      ]
    },
    {
      id: 'financialSituation',
      question: '현재 재정 상황은 어떠신가요?',
      description: '투자금 외에 비상자금과 안정적인 소득이 있는지 알려주세요.',
      options: [
        { value: 'stable-surplus', label: '안정적 소득과 충분한 비상자금 보유', emoji: '✅' },
        { value: 'stable-adequate', label: '안정적 소득과 적정 비상자금 보유', emoji: '👍' },
        { value: 'moderate', label: '보통 수준의 소득과 비상자금', emoji: '⚡' },
        { value: 'tight', label: '여유자금이 많지 않은 상황', emoji: '⚠️' }
      ]
    },
    {
      id: 'investmentExperience',
      question: '투자 경험은 어느 정도이신가요?',
      description: '금융 상품 투자 경험과 지식 수준을 알려주세요.',
      options: [
        { value: 'beginner', label: '예적금, 펀드 정도의 경험', emoji: '🌱' },
        { value: 'intermediate', label: '주식, ETF 투자 경험 보유', emoji: '📚' },
        { value: 'advanced', label: '다양한 금융상품 투자 경험', emoji: '🎓' },
        { value: 'expert', label: '전문적인 투자 지식과 풍부한 경험', emoji: '👨‍💼' }
      ]
    },
    {
      id: 'marketViewpoint',
      question: '시장 변동성에 대한 관점은 어떠신가요?',
      description: '주식시장의 상승과 하락에 대한 귀하의 생각을 알려주세요.',
      options: [
        { value: 'opportunity', label: '변동성은 기회다 - 적극 활용', emoji: '🎪' },
        { value: 'manageable', label: '관리 가능한 위험 - 신중하게 대응', emoji: '🎛️' },
        { value: 'concerning', label: '우려스러운 요소 - 최소화 필요', emoji: '😟' },
        { value: 'avoid', label: '피해야 할 위험 - 안정성 우선', emoji: '🚫' }
      ]
    },
    {
      id: 'emotionalResponse',
      question: '투자 손실 시 감정적 반응은 어떠신가요?',
      description: '포트폴리오 가치가 하락할 때의 심리적 상태를 선택해주세요.',
      options: [
        { value: 'calm', label: '냉정하게 분석하고 논리적으로 판단', emoji: '🧘‍♂️' },
        { value: 'concerned', label: '걱정되지만 계획대로 진행', emoji: '😐' },
        { value: 'anxious', label: '불안하여 자주 확인하게 됨', emoji: '😰' },
        { value: 'panic', label: '매우 스트레스받아 잠을 못 잠', emoji: '😱' }
      ]
    },
    {
      id: 'diversificationPreference',
      question: '투자 분산에 대한 선호도는 어떠신가요?',
      description: '포트폴리오 구성 방식에 대한 선호를 알려주세요.',
      options: [
        { value: 'concentrated', label: '확신 있는 소수 종목에 집중 투자', emoji: '🎯' },
        { value: 'focused', label: '관심 섹터/테마 중심의 선택적 분산', emoji: '🔍' },
        { value: 'balanced', label: '적절한 분산으로 리스크 관리', emoji: '⚖️' },
        { value: 'diversified', label: '광범위한 분산으로 안정성 추구', emoji: '🌐' }
      ]
    }
  ]

  const handleAnswer = (value: string) => {
    const questionId = questions[currentQuestion].id as keyof InvestmentProfileData
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300)
    } else {
      setTimeout(() => setShowResult(true), 300)
    }
  }

  const getInvestmentProfile = () => {
    let score = 0
    let profileName = ''
    let description = ''
    let riskColor = ''
    let icon = ''
    let mbtiType = ''
    let strengths: string[] = []
    let weaknesses: string[] = []
    let strengthTips: string[] = []
    let weaknessTips: string[] = []
    
    // 점수 계산 로직
    Object.values(answers).forEach(answer => {
      if (answer.includes('conservative') || answer === 'capital-preservation' || 
          answer === 'short' || answer === 'tight' || answer === 'beginner' || 
          answer === 'avoid' || answer === 'panic' || answer === 'diversified') {
        score += 1
      } else if (answer.includes('moderate') || answer === 'steady-income' || 
                 answer === 'medium-short' || answer === 'stable-adequate' || 
                 answer === 'intermediate' || answer === 'concerning' || 
                 answer === 'anxious' || answer === 'balanced') {
        score += 2
      } else if (answer === 'balanced-growth' || answer === 'medium-long' || 
                 answer === 'stable-surplus' || answer === 'advanced' || 
                 answer === 'manageable' || answer === 'concerned' || answer === 'focused') {
        score += 3
      } else {
        score += 4
      }
    })

    if (score <= 12) {
      profileName = '안전 추구형'
      description = '원금 보존을 최우선으로 하며, 안정적이고 예측 가능한 수익을 선호합니다.'
      riskColor = 'from-green-600 to-green-800'
      icon = '🛡️'
      mbtiType = 'SAFE'
      strengths = ['원금 손실 위험 최소화', '안정적인 수익 창출', '스트레스 없는 투자', '장기 자산 보존']
      weaknesses = ['인플레이션 대응 부족', '성장 기회 놓칠 가능성', '낮은 수익률', '기회비용 발생']
      strengthTips = ['안전 자산 비중을 70% 이상 유지하여 안정성 극대화', '정기예금과 국고채 등 확실한 수익원 확보', '분산투자로 리스크를 더욱 분산']
      weaknessTips = ['일부 자금(10-20%)을 성장형 ETF에 투자하여 성장성 보완', '물가연동채권으로 인플레이션 헤지', '정기적인 포트폴리오 리뷰로 기회 포착']
    } else if (score <= 18) {
      profileName = '신중한 성장형'
      description = '안정성을 기반으로 하되, 제한적인 위험을 통해 성장을 추구합니다.'
      riskColor = 'from-blue-600 to-blue-800'
      icon = '📊'
      mbtiType = 'STEADY'
      strengths = ['균형잡힌 리스크 관리', '꾸준한 성장 추구', '감정적 판단 절제', '체계적 투자 접근']
      weaknesses = ['성장 기회 일부 제한', '시장 타이밍 놓칠 가능성', '과도한 신중함', '변화 적응 속도']
      strengthTips = ['체계적인 자산배분 전략으로 안정성과 성장성 동시 추구', '정기적 리밸런싱으로 목표 비중 유지', '장기 투자 관점 유지']
      weaknessTips = ['성장주 비중을 단계적으로 늘려 수익성 개선', '시장 변동성을 기회로 활용하는 마인드 전환', '전문가 의견 적극 수용']
    } else if (score <= 24) {
      profileName = '균형 추구형'
      description = '적절한 위험을 감수하여 장기적인 자산 증식을 목표로 합니다.'
      riskColor = 'from-purple-600 to-purple-800'
      icon = '⚖️'
      mbtiType = 'BALANCED'
      strengths = ['리스크-수익 균형 감각', '적응력과 유연성', '다양한 투자 경험', '시장 변화 대응 능력']
      weaknesses = ['일관성 부족 가능성', '우유부단한 결정', '중간적 성과', '명확한 방향성 부족']
      strengthTips = ['다양한 자산군에 분산투자하여 균형감 활용', '시장 상황에 따른 유연한 포트폴리오 조정', '리밸런싱을 통한 수익 최적화']
      weaknessTips = ['명확한 투자 원칙과 기준 수립', '감정적 판단보다 데이터 기반 의사결정', '장기 목표에 따른 일관된 전략 유지']
    } else {
      profileName = '적극 투자형'
      description = '높은 수익을 위해 상당한 위험을 감수할 수 있는 공격적 투자자입니다.'
      riskColor = 'from-red-600 to-red-800'
      icon = '🚀'
      mbtiType = 'AGGRESSIVE'
      strengths = ['높은 수익 추구 의지', '시장 기회 포착 능력', '변동성 활용 가능', '적극적 투자 성향']
      weaknesses = ['높은 손실 위험', '감정적 투자 결정', '과도한 집중 투자', '단기 변동성에 민감']
      strengthTips = ['성장주와 혁신 기업에 집중 투자하여 고수익 추구', '시장 변동성을 매수 기회로 활용', '새로운 투자 기회 적극 발굴']
      weaknessTips = ['포트폴리오 다양화로 집중 위험 분산', '손절매 원칙 설정으로 손실 제한', '감정적 판단 방지를 위한 자동화 시스템 구축']
    }

    return { profileName, description, riskColor, icon, score, mbtiType, strengths, weaknesses, strengthTips, weaknessTips }
  }

  const handleComplete = () => {
    const profile = getInvestmentProfile()
    onNext({
      consultantData, // 알렉스로부터 받은 기본 정보도 함께 전달
      investmentProfile: { ...answers, ...profile }
    })
  }

  const currentQuestionData = questions[currentQuestion]

  if (showResult) {
    const profile = getInvestmentProfile()
    
    return (
      <div className="pt-16 pb-6 px-4">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-purple-500/5 rounded-2xl"></div>
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">🧠</div>
                <h2 className="text-2xl font-bold text-white mb-2">투자성향분석가 아리아</h2>
                <p className="text-blue-400 font-medium mb-2 italic">"당신의 마음을 읽는 투자 심리 전문가"</p>
                <p className="text-purple-200">분석이 완료되었습니다. 당신의 투자 성향을 확인해보세요.</p>
              </div>
            </div>

            {/* 분석 결과 */}
            <div className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{profile.icon}</div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-4">
                  {profile.profileName}
                </h3>
                
                {/* MBTI 스타일 표시 */}
                <div className="mb-6">
                  <div className="text-sm text-purple-300 mb-2">투자성향 유형</div>
                  <div className={`inline-block bg-gradient-to-r ${profile.riskColor} px-8 py-3 rounded-full text-white text-2xl font-bold tracking-widest shadow-lg`}>
                    {profile.mbtiType}
                  </div>
                </div>
                
                <div className={`bg-gradient-to-r ${profile.riskColor} p-1 rounded-full mb-4`}>
                  <div className="bg-slate-900 rounded-full px-6 py-2">
                    <span className="text-white font-medium">위험 수용도 점수: {profile.score}/32</span>
                  </div>
                </div>
                <p className="text-lg text-purple-200 leading-relaxed">{profile.description}</p>
              </div>

              {/* 강점과 단점 */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* 강점 */}
                <div className="bg-emerald-900/30 rounded-xl p-6 border border-emerald-400/20">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">💪</span> 강점
                  </h4>
                  <div className="space-y-2">
                    {profile.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-emerald-400 mr-2 mt-1">✓</span>
                        <span className="text-emerald-100 text-sm">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 단점 */}
                <div className="bg-red-900/30 rounded-xl p-6 border border-red-400/20">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">⚠️</span> 주의사항
                  </h4>
                  <div className="space-y-2">
                    {profile.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-red-400 mr-2 mt-1">!</span>
                        <span className="text-red-100 text-sm">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 개선 방안 */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* 강점 극대화 */}
                <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-400/20">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">🚀</span> 강점 극대화 방법
                  </h4>
                  <div className="space-y-3">
                    {profile.strengthTips.map((tip, index) => (
                      <div key={index} className="bg-blue-800/20 rounded-lg p-3">
                        <span className="text-blue-200 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 단점 보완 */}
                <div className="bg-orange-900/30 rounded-xl p-6 border border-orange-400/20">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">🔧</span> 단점 보완 방안
                  </h4>
                  <div className="space-y-3">
                    {profile.weaknessTips.map((tip, index) => (
                      <div key={index} className="bg-orange-800/20 rounded-lg p-3">
                        <span className="text-orange-200 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 투자 요약 정보 */}
              <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">�</span> 투자 프로필 요약
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-purple-300 block mb-1">위험 선호도</span>
                    <span className="text-white font-medium">{answers.riskTolerance.includes('aggressive') ? '높음' : 
                      answers.riskTolerance.includes('moderate') ? '보통' : '낮음'}</span>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-purple-300 block mb-1">투자 기간</span>
                    <span className="text-white font-medium">{answers.timeHorizon === 'long' ? '장기' : 
                      answers.timeHorizon.includes('medium') ? '중기' : '단기'}</span>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-purple-300 block mb-1">투자 스타일</span>
                    <span className="text-white font-medium">
                      {profile.score <= 12 ? '보수적' :
                       profile.score <= 18 ? '신중함' :
                       profile.score <= 24 ? '균형적' : '적극적'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowResult(false)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors"
                >
                  다시 분석하기
                </button>
                <button
                  onClick={handleComplete}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-bold transition-all transform hover:scale-105"
                >
                  다음 단계로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 pb-6 px-4">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-purple-500/5 rounded-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h2 className="text-2xl font-bold text-white mb-2">투자성향분석가 아리아</h2>
              <p className="text-blue-400 font-medium mb-2 italic">"당신의 마음을 읽는 투자 심리 전문가"</p>
              <p className="text-purple-200">알렉스 매니저가 수집한 정보를 바탕으로 심층 투자성향 분석을 진행하겠습니다.</p>
            </div>
          </div>

          {/* 알렉스로부터 받은 기본 정보 */}
          {consultantData.investmentAmount && (
            <div className="bg-gradient-to-r from-slate-800/90 to-indigo-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="mr-2">📋</span> 알렉스 매니저 상담 요약
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-indigo-300">투자 가능 금액:</span>
                  <span className="text-white font-medium">{getAmountText(consultantData.investmentAmount)}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-indigo-300">투자 경험:</span>
                  <span className="text-white font-medium">{getExperienceText(consultantData.investmentExperience)}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-indigo-300">투자 기간:</span>
                  <span className="text-white font-medium">
                    {consultantData.investmentPeriod === 'short' ? '단기 (1년 미만)' :
                     consultantData.investmentPeriod === 'medium' ? '중기 (1-3년)' :
                     consultantData.investmentPeriod === 'long' ? '장기 (3-5년)' :
                     consultantData.investmentPeriod === 'verylong' ? '초장기 (5년 이상)' : '미설정'}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-indigo-300">AI 개입 수준:</span>
                  <span className="text-white font-medium">
                    {consultantData.aiInvolvementLevel === 'reference' ? '참고형' :
                     consultantData.aiInvolvementLevel === 'collaboration' ? '협업형' :
                     consultantData.aiInvolvementLevel === 'guide' ? '가이드형' : '미설정'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-300 font-medium">진행률</span>
              <span className="text-white font-bold">{currentQuestion + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 leading-relaxed">
                {currentQuestionData.question}
              </h3>
              <p className="text-purple-300 text-lg">{currentQuestionData.description}</p>
            </div>

            <div className="grid gap-4">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="group p-6 bg-slate-800/50 hover:bg-slate-700/70 rounded-xl border border-slate-600 hover:border-purple-500 transition-all duration-300 text-left transform hover:scale-[1.02]"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{option.emoji}</span>
                    <span className="text-white text-lg font-medium group-hover:text-purple-300 transition-colors">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={onPrevious}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-medium transition-colors"
            >
              이전 단계
            </button>
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
              >
                이전 질문
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}