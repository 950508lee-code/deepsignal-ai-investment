'use client'

import { useState } from 'react'

interface InvestmentConsultantStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function InvestmentConsultantStep({ onNext, onPrevious }: InvestmentConsultantStepProps) {
  const [formData, setFormData] = useState({
    // 기본 투자 정보
    investmentAmount: '',
    investmentExperience: '',
    investmentPeriod: '',
    investmentGoal: '',
    
    // 위험 감내 성향
    lossResponse: '',
    profitResponse: '',
    importantFactor: '',
    newsFrequency: '',
    
    // AI 개입 수준
    aiInvolvementLevel: '',
    
    // 기존 필드들 (호환성 유지)
    age: '',
    income: '',
    riskTolerance: '',
    preferredSectors: [] as string[]
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
        ? prev.preferredSectors.filter(s => s !== sector)
        : [...prev.preferredSectors, sector]
    }))
  }

  const sectors = ['기술주', '헬스케어', '금융', '에너지', '소비재', '부동산', '채권', '원자재']

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">👨‍💼</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">투자상담매니저</h2>
        <p className="text-gray-600">투자 성향 분석과 맞춤형 전략 설계를 위한 정보를 수집합니다</p>
      </div>

      <div className="space-y-8">
        {/* 1. 기본 투자 정보 */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">1️⃣ 기본 투자 정보</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">투자 가용 금액</label>
              <select 
                value={formData.investmentAmount} 
                onChange={(e) => setFormData(prev => ({ ...prev, investmentAmount: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">선택해주세요</option>
                <option value="under1000">1천만원 미만</option>
                <option value="1000-3000">1천-3천만원</option>
                <option value="3000-5000">3천-5천만원</option>
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
                  <div className="text-sm text-purple-700">AI가 분석 결과와 추천안을 제시하지만, 모든 결정은 사용자가 직접</div>
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
                  <div className="text-sm text-purple-700">AI가 구체적인 투자안을 제시하고, 사용자가 승인/수정하여 함께 결정</div>
                </div>
              </label>
              
              <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                <input 
                  type="radio" 
                  name="aiLevel" 
                  value="delegation"
                  checked={formData.aiInvolvementLevel === 'delegation'}
                  onChange={(e) => setFormData(prev => ({ ...prev, aiInvolvementLevel: e.target.value }))}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-medium text-purple-900">🎯 위임형</div>
                  <div className="text-sm text-purple-700">AI가 설정된 가이드라인 내에서 자동으로 투자 결정 및 실행</div>
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