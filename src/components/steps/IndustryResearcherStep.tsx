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
  
  const handleSectorToggle = (sectorId: string) => {
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
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">�</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">산업리서처 마쿠스</h2>
        <p className="text-yellow-600 font-medium mb-2 italic">"미래를 예측하는 산업 전문가"</p>
        <p className="text-gray-600 mb-4">안녕하세요! 저는 마쿠스입니다. 미래 산업을 내다보는 혜안을 가진 연구 전문가로서, 소피아의 시장 분석을 바탕으로 유망한 산업과 섹터를 발굴하고 투자 기회를 분석해드리겠습니다.</p>
        <div className="bg-orange-50 rounded-lg p-4 text-sm text-orange-800">
          <div className="font-medium mb-2">🏭 산업 분석 프로세스:</div>
          <div className="text-xs space-y-1">
            <div>• 메가트렌드 분석 (AI, ESG, 인구 고령화 등)</div>
            <div>• 산업 생명주기 분석 (도입기, 성장기, 성숙기, 쇠퇴기)</div>
            <div>• 밸류체인 분석을 통한 수혜 섹터 발굴</div>
            <div>• 규제 변화와 정책 지원 효과 분석</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-900 mb-4">{sectorData.title}</h3>
        <p className="text-purple-700 mb-4">
          당신의 투자 성향과 시장 분석을 바탕으로 선별한 유망 섹터들입니다.
        </p>
        <p className="text-sm text-purple-600">
          📝 3-5개 섹터를 선택하여 균형 있는 포트폴리오를 구성하세요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {sectorData.sectors.map((sector) => (
          <div 
            key={sector.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedSectors.includes(sector.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleSectorToggle(sector.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={selectedSectors.includes(sector.id)}
                  onChange={() => handleSectorToggle(sector.id)}
                  className="mr-3"
                />
                <h4 className="font-semibold text-gray-900">{sector.name}</h4>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                {sector.growth}
              </span>
            </div>
            <p className="text-sm text-gray-600">{sector.reason}</p>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="text-yellow-600 mr-3">✨</div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">다음 단계 안내</h4>
            <p className="text-sm text-yellow-700">
              선택한 섹터에서 종목분석가가 기본·기술적 분석을 통해 최적의 투자 종목들을 추천해드립니다.
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
          disabled={selectedSectors.length === 0}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          종목 분석 받기 →
        </button>
      </div>
    </div>
  )
}