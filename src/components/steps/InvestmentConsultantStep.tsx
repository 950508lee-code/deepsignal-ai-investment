'use client';

import { useState } from 'react';

interface FormData {
  investmentAmount: string;
  investmentExperience: string;
  investmentPeriod: string;
  investmentGoal: string;
  informationSource: string;
  aiInvolvementLevel: string;
}

interface InvestmentConsultantStepProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
}

export default function InvestmentConsultantStep({ onNext, onPrevious }: InvestmentConsultantStepProps) {
  const [formData, setFormData] = useState<FormData>({
    investmentAmount: '',
    investmentExperience: '',
    investmentPeriod: '',
    investmentGoal: '',
    informationSource: '',
    aiInvolvementLevel: ''
  });

  const handleSubmit = () => {
    onNext(formData);
  };

  return (
    <div className="pt-16 pb-6 px-4">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-purple-500/5 rounded-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">💼</div>
              <h2 className="text-2xl font-bold text-white mb-2">투자상담매니저 알렉스</h2>
              <p className="text-blue-400 font-medium mb-2 italic">"당신의 상황을 꼼꼼히 파악하는 전문가"</p>
              <p className="text-purple-200">기본 정보와 투자 성향을 파악하여 맞춤형 분석의 기초를 만들어드립니다.</p>
            </div>
          </div>

          {/* 1. 기본 정보 */}
          <div className="relative bg-gradient-to-br from-slate-800/80 to-purple-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-purple-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 shadow-lg">
                  1
                </div>
                <h3 className="text-lg font-bold text-white">기본 정보</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">투자 가능 금액</label>
                  <select
                    value={formData.investmentAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, investmentAmount: e.target.value }))}
                    className="w-full p-3 bg-slate-700/50 border border-purple-400/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-purple-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-slate-800">선택해주세요</option>
                    <option value="under500" className="bg-slate-800">500만원 미만</option>
                    <option value="500-1000" className="bg-slate-800">500만원-1천만원</option>
                    <option value="1000-3000" className="bg-slate-800">1천만원-3천만원</option>
                    <option value="3000-5000" className="bg-slate-800">3천만원-5천만원</option>
                    <option value="5000-10000" className="bg-slate-800">5천만원-1억원</option>
                    <option value="over10000" className="bg-slate-800">1억원 이상</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">투자 경험</label>
                  <select
                    value={formData.investmentExperience}
                    onChange={(e) => setFormData(prev => ({ ...prev, investmentExperience: e.target.value }))}
                    className="w-full p-3 bg-slate-700/50 border border-purple-400/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-purple-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-slate-800">선택해주세요</option>
                    <option value="none" className="bg-slate-800">투자 경험 없음</option>
                    <option value="beginner" className="bg-slate-800">초보자 (예적금, 펀드 정도)</option>
                    <option value="intermediate" className="bg-slate-800">중급자 (주식, ETF 투자 경험)</option>
                    <option value="advanced" className="bg-slate-800">숙련자 (옵션, 선물, 파생상품 경험)</option>
                    <option value="expert" className="bg-slate-800">전문가 (포트폴리오 관리, 다양한 자산군 경험)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">목표 투자 기간</label>
                  <select
                    value={formData.investmentPeriod}
                    onChange={(e) => setFormData(prev => ({ ...prev, investmentPeriod: e.target.value }))}
                    className="w-full p-3 bg-slate-700/50 border border-purple-400/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-purple-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-slate-800">선택해주세요</option>
                    <option value="short" className="bg-slate-800">단기 (1년 미만)</option>
                    <option value="medium" className="bg-slate-800">중기 (1-3년)</option>
                    <option value="long" className="bg-slate-800">장기 (3-5년)</option>
                    <option value="verylong" className="bg-slate-800">초장기 (5년 이상)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">이 투자로 이루고자 하는 목표</label>
                  <select
                    value={formData.investmentGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, investmentGoal: e.target.value }))}
                    className="w-full p-3 bg-slate-700/50 border border-purple-400/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-purple-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-slate-800">선택해주세요</option>
                    <option value="retirement" className="bg-slate-800">은퇴 준비</option>
                    <option value="wealth" className="bg-slate-800">자산 증식</option>
                    <option value="income" className="bg-slate-800">부수입 창출</option>
                    <option value="education" className="bg-slate-800">교육비 마련</option>
                    <option value="house" className="bg-slate-800">주택 구입</option>
                    <option value="emergency" className="bg-slate-800">비상금 마련</option>
                    <option value="business" className="bg-slate-800">사업 자금</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-purple-200 mb-2">투자 관련 결정을 내릴 때, 가장 많이 참고하는 정보원은?</label>
                  <select
                    value={formData.informationSource}
                    onChange={(e) => setFormData(prev => ({ ...prev, informationSource: e.target.value }))}
                    className="w-full p-3 bg-slate-700/50 border border-purple-400/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-purple-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-slate-800">선택해주세요</option>
                    <option value="research-report" className="bg-slate-800">증권사 리포트 및 애널리스트 분석</option>
                    <option value="media-news" className="bg-slate-800">유튜브, 뉴스, 경제 방송</option>
                    <option value="community" className="bg-slate-800">온라인 커뮤니티, 카페, 블로그</option>
                    <option value="self-analysis" className="bg-slate-800">본인만의 분석과 판단</option>
                    <option value="expert-advice" className="bg-slate-800">전문가 상담 및 자문</option>
                    <option value="multiple-sources" className="bg-slate-800">여러 정보원을 종합적으로 활용</option>
                  </select>
                </div>
              </div>
            </div>
          </div>



          {/* 2. AI 개입 수준 */}
          <div className="relative bg-gradient-to-br from-slate-800/80 to-emerald-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-emerald-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-5">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 shadow-lg">
                  2
                </div>
                <h3 className="text-lg font-bold text-white">AI 개입 수준</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-3">AI가 어느 정도 개입하는 것이 좋을까요?</label>
                <div className="space-y-3">
                  <label className="flex items-start p-4 bg-slate-700/30 border border-emerald-400/20 rounded-xl cursor-pointer hover:border-emerald-400/40 transition-all duration-300 group">
                    <input
                      type="radio"
                      name="aiLevel"
                      value="reference"
                      checked={formData.aiInvolvementLevel === 'reference'}
                      onChange={(e) => setFormData(prev => ({ ...prev, aiInvolvementLevel: e.target.value }))}
                      className="mt-1 mr-3 accent-emerald-500"
                    />
                    <div>
                      <div className="font-medium text-white group-hover:text-emerald-200 transition-colors">🔍 참고형</div>
                      <div className="text-sm text-purple-200/80">AI는 분석만 제공합니다. 모든 판단은 직접 결정.</div>
                    </div>
                  </label>

                  <label className="flex items-start p-4 bg-slate-700/30 border border-emerald-400/20 rounded-xl cursor-pointer hover:border-emerald-400/40 transition-all duration-300 group">
                    <input
                      type="radio"
                      name="aiLevel"
                      value="collaboration"
                      checked={formData.aiInvolvementLevel === 'collaboration'}
                      onChange={(e) => setFormData(prev => ({ ...prev, aiInvolvementLevel: e.target.value }))}
                      className="mt-1 mr-3 accent-emerald-500"
                    />
                    <div>
                      <div className="font-medium text-white group-hover:text-emerald-200 transition-colors">🤝 협업형</div>
                      <div className="text-sm text-purple-200/80">AI가 투자안을 제시하고, 사용자가 승인 또는 수정하여 결정.</div>
                    </div>
                  </label>

                  <label className="flex items-start p-4 bg-slate-700/30 border border-emerald-400/20 rounded-xl cursor-pointer hover:border-emerald-400/40 transition-all duration-300 group">
                    <input
                      type="radio"
                      name="aiLevel"
                      value="guide"
                      checked={formData.aiInvolvementLevel === 'guide'}
                      onChange={(e) => setFormData(prev => ({ ...prev, aiInvolvementLevel: e.target.value }))}
                      className="mt-1 mr-3 accent-emerald-500"
                    />
                    <div>
                      <div className="font-medium text-white group-hover:text-emerald-200 transition-colors">🎯 가이드형</div>
                      <div className="text-sm text-purple-200/80">AI가 설정된 범위 내에서 자동으로 판단하고 리포트로 보고합니다.</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl">
            <div className="flex gap-3">
              <button
                onClick={onPrevious}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 px-4 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 font-medium text-sm border border-slate-500/50 shadow-lg"
              >
                ← 이전
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.investmentAmount || !formData.investmentExperience || !formData.aiInvolvementLevel}
                className="flex-[2] bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-sm disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg border border-purple-500/50"
              >
                투자 성향 분석 시작 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}