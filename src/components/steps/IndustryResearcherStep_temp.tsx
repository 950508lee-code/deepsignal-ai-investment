'use client'

import { useState } from 'react'

interface IndustryResearcherStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function IndustryResearcherStep({ onNext, onPrevious, userData }: IndustryResearcherStepProps) {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  
  const riskTolerance = userData.riskTolerance || 'moderate'
  
  const getSectorRecommendations = () => {
    if (riskTolerance === 'aggressive') {
      return {
        title: '고수익 추구 투자자를 위한 유망 섹터',
        sectors: [
          { id: 'ai', name: 'AI/반도체', growth: '+25%', reason: 'ChatGPT 풍에 따른 AI 수요 폭증' },
          { id: 'biotech', name: '바이오/헬스케어', growth: '+18%', reason: '고령화 사회와 의료기술 발전' },
          { id: 'fintech', name: '핀테크', growth: '+15%', reason: '디지털 결제 및 블록체인 확산' },
          { id: 'renewable', name: '신재생에너지', growth: '+20%', reason: 'ESG 투자 증가와 정부 지원' },
          { id: 'space', name: '우주항공', growth: '+30%', reason: '민간 우주산업 활성화' }
        ]
      }
    } else if (riskTolerance === 'moderate') {
      return {
        title: '균형 투자자를 위한 안정 성장 섹터',
        sectors: [
          { id: 'consumer', name: '필수소비재', growth: '+8%', reason: '경기 불황에도 안정적 수요' },
          { id: 'utilities', name: '유틸리티', growth: '+6%', reason: '고배당 및 안정성' },
          { id: 'reit', name: '리츠(부동산)', growth: '+10%', reason: '금리 하락 기대와 인플레이션 헤지' },
          { id: 'pharma', name: '제약/의료', growth: '+12%', reason: '안정적 수익과 배당' },
          { id: 'telecom', name: '통신', growth: '+7%', reason: '5G 인프라 확산과 안정적 현금흐름' }
        ]
      }
    } else {
      return {
        title: '안전 투자자를 위한 방어 섹터',
        sectors: [
          { id: 'dividend', name: '고배당 우량주', growth: '+5%', reason: '안정적 배당 수익' },
          { id: 'banking', name: '은행/금융', growth: '+6%', reason: '금리 상승 환경에서 수익성 개선' },
          { id: 'food', name: '식음료', growth: '+4%', reason: '경기 불황에도 안정적 수요' },
          { id: 'infrastructure', name: '인프라', growth: '+7%', reason: '정부 투자와 안정적 현금흐름' },
          { id: 'treasury', name: '국채/회사채', growth: '+3%', reason: '원금 보장과 예측 가능한 수익' }
        ]
      }
    }
  }

  const sectorData = getSectorRecommendations()

  const toggleSector = (sectorId: string) => {
    setSelectedSectors(prev => 
      prev.includes(sectorId) 
        ? prev.filter(id => id !== sectorId)
        : [...prev, sectorId]
    )
  }

  const handleNext = () => {
    const selectedSectorData = sectorData.sectors.filter(sector => 
      selectedSectors.includes(sector.id)
    )
    onNext({ selectedSectors: selectedSectorData })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* AI 전문가 소개 카드 */}
        <div className="relative bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-3xl p-6 text-center border border-white/10 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-purple-500/10 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-lg -translate-y-12 translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="text-4xl mb-3 filter drop-shadow-lg">🔬</div>
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">산업리서처 마쿠스</h2>
            <p className="text-sm text-yellow-200 italic mb-3">"미래를 예측하는 산업 전문가"</p>
            <p className="text-sm text-purple-100/80 leading-relaxed mb-4">
              안녕하세요! 저는 마쿠스입니다. 미래 산업을 내다보는 혜안을 가진 연구 전문가로서,<br/>
              소피아의 시장 분석을 바탕으로 유망한 산업과 섹터를 발굴하고 투자 기회를 분석해드리겠습니다.
            </p>
            <div className="bg-orange-900/30 backdrop-blur-sm rounded-xl p-4 text-sm text-orange-200 border border-orange-400/20">
              <div className="font-medium mb-2">🏭 산업 분석 프로세스:</div>
              <div className="text-xs space-y-1 text-left">
                <div>• 메가트렌드 분석 (AI, ESG, 인구 고령화 등)</div>
                <div>• 산업 생명주기 분석 (도입기, 성장기, 성숙기, 쇠퇴기)</div>
                <div>• 밸류체인 분석을 통한 수혜 섹터 발굴</div>
                <div>• 규제 변화와 정책 지원 효과 분석</div>
              </div>
            </div>
          </div>
        </div>

        {/* 섹터 추천 카드 */}
        <div className="relative bg-gradient-to-br from-slate-800/80 to-purple-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-purple-500/5 rounded-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-4">{sectorData.title}</h3>
            <p className="text-purple-200 mb-4 text-sm">
              당신의 투자 성향과 시장 분석을 바탕으로 선별한 유망 섹터들입니다.
            </p>
            <p className="text-sm text-purple-300/80 mb-6">
              📝 3-5개 섹터를 선택하여 균형 있는 포트폴리오를 구성하세요.
            </p>

            <div className="space-y-3">
              {sectorData.sectors.map((sector) => (
                <div 
                  key={sector.id}
                  onClick={() => toggleSector(sector.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedSectors.includes(sector.id)
                      ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-400/60 shadow-lg'
                      : 'bg-slate-700/30 border-white/10 hover:border-purple-400/40'
                  } backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                        selectedSectors.includes(sector.id)
                          ? 'bg-purple-500 border-purple-400'
                          : 'border-gray-400'
                      }`}></div>
                      <h4 className="font-bold text-white">{sector.name}</h4>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      sector.growth.startsWith('+') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {sector.growth}
                    </span>
                  </div>
                  <p className="text-sm text-purple-200/80 leading-relaxed">
                    {sector.reason}
                  </p>
                </div>
              ))}
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
              onClick={handleNext}
              disabled={selectedSectors.length === 0}
              className="flex-[2] bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-sm disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg border border-purple-500/50"
            >
              종목 분석 받기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}