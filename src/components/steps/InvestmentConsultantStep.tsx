'use client'

import { useState } from 'react'

interface InvestmentConsultantStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function InvestmentConsultantStep({ onNext, onPrevious, userData }: InvestmentConsultantStepProps) {
  const [formData, setFormData] = useState({
    // 기본 투자 정보
    investmentAmount: userData.investmentAmount || '',
    investmentExperience: userData.investmentExperience || '',
    investmentPeriod: userData.investmentPeriod || '',
    investmentGoal: userData.investmentGoal || '',
    informationSource: userData.informationSource || '',
    
    // 위험 감내 성향
    lossResponse: userData.lossResponse || '',
    profitResponse: userData.profitResponse || '',
    importantFactor: userData.importantFactor || '',
    newsFrequency: userData.newsFrequency || '',
    decisionResponse: userData.decisionResponse || '',
    externalVariableResponse: userData.externalVariableResponse || '',
    
    // AI 개입 수준
    aiInvolvementLevel: userData.aiInvolvementLevel || '',
    
    // 기존 필드들 (호환성 유지)
    age: userData.age || '',
    income: userData.income || '',
    riskTolerance: userData.riskTolerance || '',
    preferredSectors: userData.preferredSectors || [] as string[]
  })

  const handleSubmit = () => {
    // 위험 감내 성향을 기존 시스템과 호환되도록 매핑
    let mappedRiskTolerance = 'moderate'
    if (formData.lossResponse === 'cut-loss' && formData.profitResponse === 'realize-profit') {
      mappedRiskTolerance = 'conservative'
    } else if (formData.lossResponse === 'add-more' && formData.profitResponse === 'hold-more') {
      mappedRiskTolerance = 'aggressive'
    }
    
    const enhancedData = {
      ...formData,
      riskTolerance: mappedRiskTolerance,
      consultantData: formData
    }
    
    onNext(enhancedData)
  }

  const handleSectorToggle = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSectors: prev.preferredSectors.includes(sector)
        ? prev.preferredSectors.filter((s: string) => s !== sector)
        : [...prev.preferredSectors, sector]
    }))
  }

  const sectors = ['기술주', '헬스케어', '금융', '에너지', '소비재', '부동산', '채권', '원자재']

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">👨‍💼</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">투자상담매니저 알렉스</h2>
        <p className="text-blue-600 font-medium mb-2 italic">"신중하고 체계적인 분석 전문가"</p>
        <p className="text-gray-600">안녕하세요! 저는 알렉스입니다. 친근하고 신뢰할 수 있는 투자 전문가로서, 당신의 투자 성향과 목표를 꼼꼼히 파악하고 기본 정보를 수집하겠습니다.</p>
      </div>

      <div className="space-y-8">
        {/* 1. 기본 투자 정보 */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">1️⃣ 기본 투자 정보</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">현재 투자 가능한 최대 금액 (비상금 제외)</label>
              <select 
                value={formData.investmentAmount} 
                onChange={(e) => setFormData(prev => ({ ...prev, investmentAmount: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="under500">500만원 미만</option>
                <option value="500-1000">500만원-1천만원</option>
                <option value="1000-3000">1천만원-3천만원</option>
                <option value="3000-5000">3천만원-5천만원</option>
                <option value="5000-10000">5천만원-1억원</option>
                <option value="over10000">1억원 이상</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">투자 경험</label>
              <select 
                value={formData.investmentExperience} 
                onChange={(e) => setFormData(prev => ({ ...prev, investmentExperience: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="none">투자 경험 없음</option>
                <option value="beginner">초보자 (예적금, 펀드 정도)</option>
                <option value="intermediate">중급자 (주식, ETF 투자 경험)</option>
                <option value="advanced">숙련자 (옵션, 선물, 파생상품 경험)</option>
                <option value="expert">전문가 (포트폴리오 관리, 다양한 자산군 경험)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">목표 투자 기간</label>
              <select 
                value={formData.investmentPeriod} 
                onChange={(e) => setFormData(prev => ({ ...prev, investmentPeriod: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="short">단기 (1년 미만)</option>
                <option value="medium">중기 (1-3년)</option>
                <option value="long">장기 (3-5년)</option>
                <option value="verylong">초장기 (5년 이상)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이 투자로 이루고자 하는 목표</label>
              <select 
                value={formData.investmentGoal} 
                onChange={(e) => setFormData(prev => ({ ...prev, investmentGoal: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="retirement">은퇴 준비</option>
                <option value="wealth">자산 증식</option>
                <option value="income">부수입 창출</option>
                <option value="education">교육비 마련</option>
                <option value="house">주택 구입</option>
                <option value="emergency">비상금 마련</option>
                <option value="business">사업 자금</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">투자 관련 결정을 내릴 때, 가장 많이 참고하는 정보원은?</label>
              <select 
                value={formData.informationSource} 
                onChange={(e) => setFormData(prev => ({ ...prev, informationSource: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="research-report">증권사 리포트 및 애널리스트 분석</option>
                <option value="media-news">유튜브, 뉴스, 경제 방송</option>
                <option value="community">온라인 커뮤니티, 카페, 블로그</option>
                <option value="self-analysis">본인만의 분석과 판단</option>
                <option value="expert-advice">전문가 상담 및 자문</option>
                <option value="multiple-sources">여러 정보원을 종합적으로 활용</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. 위험 감내 성향 */}
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4">2️⃣ 위험 감내 성향</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">1,000만원 투자 시 500만원 손실이 발생했다면?</label>
              <select 
                value={formData.lossResponse} 
                onChange={(e) => setFormData(prev => ({ ...prev, lossResponse: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="panic-sell">즉시 매도하고 잠을 못 잠 (-50% 손실)</option>
                <option value="partial-sell">일부만 매도하고 관망 (-25% 손실)</option>
                <option value="hold">버티고 회복 기다림 (현상 유지)</option>
                <option value="buy-more">오히려 더 사서 평단가 낮춤 (추가 투자)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">투자한 종목이 한 달 만에 30% 상승했다면?</label>
              <select 
                value={formData.profitResponse} 
                onChange={(e) => setFormData(prev => ({ ...prev, profitResponse: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="sell-all">전량 매도해서 수익 확정</option>
                <option value="sell-half">절반만 매도하고 나머지는 보유</option>
                <option value="hold-all">전혀 팔지 않고 더 오르길 기대</option>
                <option value="buy-more">오히려 더 매수해서 승부</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">포트폴리오에서 가장 중요한 것은?</label>
              <select 
                value={formData.importantFactor} 
                onChange={(e) => setFormData(prev => ({ ...prev, importantFactor: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="preserve">원금 보존 (마이너스만 안 나면 됨)</option>
                <option value="stable">안정적 수익 (연 3-5% 꾸준히)</option>
                <option value="balance">수익과 안정의 균형 (연 5-10%)</option>
                <option value="growth">높은 수익 추구 (연 10% 이상, 변동성 감수)</option>
                <option value="aggressive">극대 수익 추구 (연 20% 이상, 큰 손실 각오)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">한 달에 투자 관련 뉴스를 얼마나 자주 확인하시나요?</label>
              <select 
                value={formData.newsFrequency} 
                onChange={(e) => setFormData(prev => ({ ...prev, newsFrequency: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="never">거의 안 봄 (관심 없음)</option>
                <option value="monthly">월 1-2회 정도</option>
                <option value="weekly">주 1-2회 정도</option>
                <option value="daily">매일 확인</option>
                <option value="realtime">실시간으로 확인</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">투자 후 예상과 다르게 흘러갈 때, 주로 어떻게 대응하시나요?</label>
              <select 
                value={formData.decisionResponse} 
                onChange={(e) => setFormData(prev => ({ ...prev, decisionResponse: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="data-analysis">데이터를 기반으로 이유를 분석하고 대응</option>
                <option value="seek-advice">주변 의견이나 전문가 조언을 참고</option>
                <option value="emotional">감정적으로 즉시 대응 (불안하면 매도, 욕심나면 매수)</option>
                <option value="wait-observe">일정 기간 보류하며 상황을 관망</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">예상치 못한 외부 변수(전쟁, 환율 급등 등)가 생기면?</label>
              <select 
                value={formData.externalVariableResponse} 
                onChange={(e) => setFormData(prev => ({ ...prev, externalVariableResponse: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="long-term-view">장기 관점을 유지하며 흔들리지 않음</option>
                <option value="partial-reduction">일정 부분 비중을 축소하여 리스크 관리</option>
                <option value="cash-priority">현금화를 우선하여 안전자산으로 피함</option>
                <option value="opportunity-seek">오히려 기회로 보고 추가 투자 고려</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. AI 개입 수준 */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">3️⃣ AI 개입 수준</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">AI가 어느 정도 개입하는 것이 좋을까요?</label>
            <div className="space-y-3">
              <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                <input 
                  type="radio" 
                  name="aiLevel" 
                  value="reference"
                  checked={formData.aiInvolvementLevel === 'reference'}
                  onChange={(e) => setFormData(prev => ({ ...prev, aiInvolvementLevel: e.target.value }))}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-purple-900">🔍 참고형</div>
                  <div className="text-sm text-purple-700">AI는 분석만 제공합니다. 모든 판단은 직접 결정.</div>
                </div>
              </label>
              
              <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                <input 
                  type="radio" 
                  name="aiLevel" 
                  value="collaboration"
                  checked={formData.aiInvolvementLevel === 'collaboration'}
                  onChange={(e) => setFormData(prev => ({ ...prev, aiInvolvementLevel: e.target.value }))}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-purple-900">🤝 협업형</div>
                  <div className="text-sm text-purple-700">AI가 투자안을 제시하고, 사용자가 승인 또는 수정하여 결정.</div>
                </div>
              </label>
              
              <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                <input 
                  type="radio" 
                  name="aiLevel" 
                  value="guide"
                  checked={formData.aiInvolvementLevel === 'guide'}
                  onChange={(e) => setFormData(prev => ({ ...prev, aiInvolvementLevel: e.target.value }))}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-purple-900">🎯 가이드형</div>
                  <div className="text-sm text-purple-700">AI가 설정된 범위 내에서 자동으로 판단하고 리포트로 보고합니다.</div>
                </div>
              </label>
            </div>
          </div>
        </div>


      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          ← 이전
        </button>
        <button
          onClick={handleSubmit}
          disabled={!formData.investmentAmount || !formData.lossResponse || !formData.aiInvolvementLevel}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          AI 분석 시작 →
        </button>
      </div>
    </div>
  )
}