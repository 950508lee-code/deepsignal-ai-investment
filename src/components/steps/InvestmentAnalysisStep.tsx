interface InvestmentAnalysisStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function InvestmentAnalysisStep({ onNext, onPrevious, userData }: InvestmentAnalysisStepProps) {
  const consultantData = userData.consultantData || {}
  
  // 텍스트 변환 헬퍼 함수들
  const getInvestmentAmountText = (amount: string) => {
    switch(amount) {
      case 'under1000': return '1천만원 미만'
      case '1000-3000': return '1천-3천만원'
      case '3000-5000': return '3천-5천만원'
      case '5000-10000': return '5천만원-1억원'
      case 'over10000': return '1억원 이상'
      default: return '미설정'
    }
  }

  const getInvestmentExperienceText = (experience: string) => {
    switch(experience) {
      case 'none': return '투자 경험 없음'
      case 'beginner': return '초보자 (예적금, 펀드)'
      case 'intermediate': return '중급자 (주식, ETF)'
      case 'advanced': return '숙련자 (파생상품)'
      case 'expert': return '전문가 (포트폴리오 관리)'
      default: return '미설정'
    }
  }

  const getInvestmentPeriodText = (period: string) => {
    switch(period) {
      case 'short': return '1년 미만 (단기)'
      case 'medium': return '1-3년 (중기)'
      case 'long': return '3-5년 (장기)'
      case 'verylong': return '5년 이상 (초장기)'
      default: return '미설정'
    }
  }

  const getInvestmentGoalText = (goal: string) => {
    switch(goal) {
      case 'retirement': return '은퇴 준비'
      case 'wealth': return '자산 증식'
      case 'income': return '부수입 창출'
      case 'education': return '교육비 마련'
      case 'house': return '주택 구입'
      case 'emergency': return '비상금 마련'
      case 'business': return '사업 자금'
      default: return '미설정'
    }
  }

  const getAILevelText = (level: string) => {
    switch(level) {
      case 'reference': return '참고형'
      case 'collaboration': return '협업형'
      case 'delegation': return '위임형'
      default: return '미설정'
    }
  }
  
  // 실제 상담 데이터를 기반으로 한 개인화된 AI 분석
  const getPersonalizedAnalysis = () => {
    const {
      investmentAmount,
      investmentExperience,
      investmentPeriod,
      investmentGoal,
      lossResponse,
      profitResponse,
      importantFactor,
      newsFrequency,
      aiInvolvementLevel
    } = consultantData

    // 투자 성향 종합 분석
    let riskScore = 0
    let riskType = '균형투자형'
    let personalizedAnalysis = ''

    // 손실 대응 방식 분석
    if (lossResponse === 'panic-sell') riskScore += 1
    else if (lossResponse === 'partial-sell') riskScore += 2
    else if (lossResponse === 'hold') riskScore += 3
    else if (lossResponse === 'buy-more') riskScore += 4

    // 수익 대응 방식 분석
    if (profitResponse === 'sell-all') riskScore += 1
    else if (profitResponse === 'sell-half') riskScore += 2
    else if (profitResponse === 'hold-all') riskScore += 3
    else if (profitResponse === 'buy-more') riskScore += 4

    // 중요 요소 분석
    if (importantFactor === 'preserve') riskScore += 1
    else if (importantFactor === 'stable') riskScore += 2
    else if (importantFactor === 'balance') riskScore += 3
    else if (importantFactor === 'growth') riskScore += 4
    else if (importantFactor === 'aggressive') riskScore += 5

    // 위험 성향 결정
    if (riskScore <= 6) {
      riskType = '안전추구형'
    } else if (riskScore <= 10) {
      riskType = '균형투자형'
    } else {
      riskType = '적극투자형'
    }

    // 개인화된 분석 생성
    const getAmountText = () => {
      switch(investmentAmount) {
        case 'under1000': return '1천만원 미만의 소액'
        case '1000-3000': return '1천-3천만원의 중간 규모'
        case '3000-5000': return '3천-5천만원의 상당한 규모'
        case '5000-10000': return '5천만원-1억원의 큰 규모'
        case 'over10000': return '1억원 이상의 대규모'
        default: return ''
      }
    }

    const getExperienceText = () => {
      switch(investmentExperience) {
        case 'none': return '투자 경험이 없는 완전 초보자'
        case 'beginner': return '예적금과 펀드 정도의 경험을 가진 초보 투자자'
        case 'intermediate': return '주식과 ETF 투자 경험이 있는 중급 투자자'
        case 'advanced': return '옵션, 선물 등 파생상품까지 경험한 숙련된 투자자'
        case 'expert': return '포트폴리오 관리와 다양한 자산군 투자 경험을 가진 전문 투자자'
        default: return ''
      }
    }

    const getPeriodText = () => {
      switch(investmentPeriod) {
        case 'short': return '1년 미만의 단기 투자'
        case 'medium': return '1-3년의 중기 투자'
        case 'long': return '3-5년의 장기 투자'
        case 'verylong': return '5년 이상의 초장기 투자'
        default: return ''
      }
    }

    const getGoalText = () => {
      switch(investmentGoal) {
        case 'retirement': return '은퇴 준비'
        case 'wealth': return '자산 증식'
        case 'income': return '부수입 창출'
        case 'education': return '교육비 마련'
        case 'house': return '주택 구입'
        case 'emergency': return '비상금 마련'
        case 'business': return '사업 자금'
        default: return ''
      }
    }

    const getLossAnalysis = () => {
      switch(lossResponse) {
        case 'panic-sell': return '손실 발생 시 즉시 매도하여 추가 손실을 막으려는 성향이 강합니다. 이는 원금 보존을 최우선으로 하는 보수적 투자 성향을 보여줍니다.'
        case 'partial-sell': return '손실 발생 시 일부만 매도하는 신중한 성향을 보입니다. 리스크 관리와 기회 보존 사이의 균형을 추구하는 합리적 접근법입니다.'
        case 'hold': return '손실 상황에서도 장기적 관점을 유지하는 인내심을 보입니다. 시장의 회복력을 믿는 중장기 투자 관점을 가지고 있습니다.'
        case 'buy-more': return '손실 상황을 오히려 기회로 보는 적극적 투자 성향을 보입니다. 평단가 하향 조정을 통한 수익률 개선 전략을 선호합니다.'
        default: return ''
      }
    }

    const getProfitAnalysis = () => {
      switch(profitResponse) {
        case 'sell-all': return '수익 발생 시 확실한 이익 실현을 선호합니다. 안정적 수익 확보를 통한 리스크 회피 성향이 강합니다.'
        case 'sell-half': return '수익의 일부를 실현하면서도 추가 상승 기회를 놓치지 않으려는 균형감각을 보입니다.'
        case 'hold-all': return '수익 상황에서도 더 큰 수익을 기대하는 강한 상승 확신을 가지고 있습니다.'
        case 'buy-more': return '수익 상황에서도 추가 매수하는 매우 적극적인 투자 성향을 보입니다. 강한 확신과 높은 위험 감수 능력을 가지고 있습니다.'
        default: return ''
      }
    }

    const getAILevelText = () => {
      switch(aiInvolvementLevel) {
        case 'reference': return 'AI의 분석과 추천을 참고하되 최종 결정은 본인이 내리고 싶어하는 주도적 투자자'
        case 'collaboration': return 'AI와 협업하여 함께 투자 결정을 내리고 싶어하는 협력적 투자자'
        case 'delegation': return 'AI에게 투자 실행을 위임하고 싶어하는 효율 추구형 투자자'
        default: return ''
      }
    }

    // 개인화된 분석 생성 - 투자 스타일, 장점, 단점, 개선방안
    const getInvestmentStyleAnalysis = () => {
      let investmentStyle = ''
      let strengths = []
      let weaknesses = []
      let strengthMaximization = []
      let weaknessImprovement = []

      // 투자 스타일 정의
      if (riskScore <= 6) {
        investmentStyle = '**안전 우선형 투자자** - 원금 보존을 최우선으로 하며, 확실성을 추구하는 신중한 투자 스타일'
        
        strengths = [
          '강한 리스크 관리 의식으로 큰 손실 방지',
          '감정적 투자 결정을 피하는 냉정함',
          '장기적 관점에서 꾸준한 자산 보존',
          '시장 변동성에 흔들리지 않는 안정성'
        ]
        
        weaknesses = [
          '과도한 보수성으로 인한 기회비용 발생',
          '인플레이션 대비 실질 수익률 부족',
          '시장 상승기 수익 극대화 기회 상실',
          '현금 비중 과다로 인한 자산 성장 제한'
        ]
        
        strengthMaximization = [
          '안정성을 유지하면서도 **고배당 우량주** 비중 확대',
          '**달러비용평균법(DCA)**을 활용한 꾸준한 투자',
          '**원금보장형 ELS** 등 안전한 구조화 상품 활용',
          '**국채 및 회사채 래더링** 전략으로 안정 수익 확보'
        ]
        
        weaknessImprovement = [
          '전체 포트폴리오의 **20-30%는 성장주**에 배분하여 인플레이션 헤지',
          '**REITs나 인프라 펀드** 등으로 대안투자 경험 축적',
          '**월별 소액 투자**로 시장 변동성에 점진적 노출',
          '**5년 이상 장기 목표** 설정으로 단기 변동성 극복'
        ]
      } else if (riskScore <= 10) {
        investmentStyle = '**균형 추구형 투자자** - 리스크와 수익의 최적 균형을 찾으며, 상황에 따른 유연한 대응이 가능한 투자 스타일'
        
        strengths = [
          '리스크와 수익의 균형감각 보유',
          '시장 상황에 따른 유연한 대응력',
          '감정적 판단보다는 합리적 의사결정',
          '분산투자를 통한 효과적 리스크 관리'
        ]
        
        weaknesses = [
          '우유부단함으로 인한 결정적 기회 놓침',
          '중간적 접근으로 인한 평범한 수익률',
          '시장 극단 상황에서의 애매한 포지셔닝',
          '과도한 신중함으로 인한 액션 지연'
        ]
        
        strengthMaximization = [
          '**코어-샐러타이트 전략**으로 안정성과 공격성 조화',
          '**섹터 로테이션** 전략으로 시장 사이클 활용',
          '**정기적 리밸런싱**으로 균형 포트폴리오 유지',
          '**시장 지표 기반 비중 조절**로 타이밍 개선'
        ]
        
        weaknessImprovement = [
          '**명확한 매수/매도 기준** 수립으로 결정력 향상',
          '포트폴리오의 **10-20%는 고성장주**에 배분하여 수익률 제고',
          '**시장 극단 상황 시나리오** 미리 준비하여 대응력 강화',
          '**분기별 포트폴리오 점검**으로 신속한 의사결정 체계 구축'
        ]
      } else {
        investmentStyle = '**적극 공격형 투자자** - 높은 수익을 추구하며 변동성을 기회로 활용하는 역동적인 투자 스타일'
        
        strengths = [
          '강한 확신과 빠른 의사결정력',
          '시장 변동성을 수익 기회로 전환',
          '높은 성장 잠재력을 가진 투자처 발굴',
          '시장 트렌드에 민감한 대응력'
        ]
        
        weaknesses = [
          '과신으로 인한 과도한 리스크 노출',
          '감정적 투자로 인한 큰 손실 위험',
          '단기적 사고로 인한 장기 관점 부족',
          '집중투자로 인한 포트폴리오 불균형'
        ]
        
        strengthMaximization = [
          '**성장주와 테마주** 집중 투자로 수익률 극대화',
          '**옵션 전략** 활용으로 레버리지 효과 증대',
          '**모멘텀 투자** 전략으로 상승 트렌드 극대화',
          '**해외 고성장 시장** 진출로 기회 영역 확대'
        ]
        
        weaknessImprovement = [
          '**포지션 사이징 원칙** 수립으로 단일 종목 비중 제한',
          '**손절 라인 설정**으로 감정적 판단 방지',
          '전체 포트폴리오의 **30-40%는 안정 자산**으로 균형 확보',
          '**백테스팅과 시뮬레이션**으로 전략 검증 후 실행'
        ]
      }

      return {
        investmentStyle,
        strengths,
        weaknesses,
        strengthMaximization,
        weaknessImprovement
      }
    }

    const styleAnalysis = getInvestmentStyleAnalysis()
    personalizedAnalysis = `**이 투자 스타일을 통해 시장에서 성공하기 위한 맞춤 가이드를 제시해드립니다.**`

    // 추천 자산 배분
    let assetAllocation = ''
    let investmentStrategy = []

    if (riskType === '안전추구형') {
      assetAllocation = '주식 20-30%, 채권 50-60%, 현금성자산 20-30%'
      investmentStrategy = [
        '원금 보장형 상품 우선 고려',
        '고배당 우량주 중심 투자',
        '국채 및 회사채 비중 확대',
        '정기적인 분할 투자(DCA) 권장'
      ]
    } else if (riskType === '균형투자형') {
      assetAllocation = '주식 50-60%, 채권 30-40%, 현금성자산 10%'
      investmentStrategy = [
        '대형주와 배당주 중심 포트폴리오',
        '섹터 분산을 통한 리스크 관리',
        '정기적인 리밸런싱 필요',
        '시장 상황에 따른 비중 조절'
      ]
    } else {
      assetAllocation = '주식 70-80%, 채권 15-20%, 대안투자 5-10%'
      investmentStrategy = [
        '성장주와 테마주 적극 편입',
        '해외 주식 및 ETF 다양화',
        '시장 타이밍 전략 활용',
        '변동성을 활용한 수익 극대화'
      ]
    }

    return {
      riskType,
      personalizedAnalysis,
      styleAnalysis,
      riskScore
    }
  }

  const analysis = getPersonalizedAnalysis()

  const handleNext = () => {
    onNext({ 
      investmentProfile: analysis,
      riskTolerance: analysis.riskType === '안전추구형' ? 'conservative' : 
                    analysis.riskType === '균형투자형' ? 'moderate' : 'aggressive'
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">🤖</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI 투자 성향 분석 결과</h2>
        <p className="text-gray-600">당신의 상담 내용을 바탕으로 개인화된 투자 성향을 분석했습니다</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            💡 {analysis.riskType}
          </h3>
          <div className="text-blue-700 text-sm mb-4">
            {analysis.styleAnalysis.investmentStyle}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">📋 기본 투자 정보</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div><span className="font-medium">투자 가용 금액:</span> {getInvestmentAmountText(consultantData.investmentAmount)}</div>
                <div><span className="font-medium">투자 경험:</span> {getInvestmentExperienceText(consultantData.investmentExperience)}</div>
                <div><span className="font-medium">투자 기간:</span> {getInvestmentPeriodText(consultantData.investmentPeriod)}</div>
              </div>
              <div className="space-y-2">
                <div><span className="font-medium">투자 목표:</span> {getInvestmentGoalText(consultantData.investmentGoal)}</div>
                <div><span className="font-medium">AI 개입 수준:</span> {getAILevelText(consultantData.aiInvolvementLevel)}</div>
                <div><span className="font-medium">위험도 점수:</span> {analysis.riskScore}/15</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3">💪 당신의 투자 강점</h4>
              <ul className="space-y-2">
                {analysis.styleAnalysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-green-700 text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-3">⚠️ 주의해야 할 약점</h4>
              <ul className="space-y-2">
                {analysis.styleAnalysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">!</span>
                    <span className="text-red-700 text-sm">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3">🚀 강점 극대화 방안</h4>
              <ul className="space-y-2">
                {analysis.styleAnalysis.strengthMaximization.map((method, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">↗</span>
                    <span className="text-blue-700 text-sm">{method}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-3">🔧 약점 보완 방법</h4>
              <ul className="space-y-2">
                {analysis.styleAnalysis.weaknessImprovement.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2 mt-1">→</span>
                    <span className="text-orange-700 text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="text-yellow-600 mr-3">�</div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">성향 분석 완료</h4>
            <p className="text-sm text-yellow-700">
              투자 성향 분석이 완료되었습니다. 다음 단계에서는 시장전략가가 현재 시장 상황과 
              당신의 성향을 고려한 구체적인 투자 방향을 제시해드립니다.
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
          시장 분석 받기 →
        </button>
      </div>
    </div>
  )
}