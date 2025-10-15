'use client'

import { useState } from 'react'

interface MarketStrategistStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function MarketStrategistStep({ onNext, onPrevious, userData }: MarketStrategistStepProps) {
  const [showData, setShowData] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    trends: false,
    risks: false,
    opportunities: false
  })

  // 실시간 경제 지표 (플레이스홀더 데이터)
  const kpiData = [
    { 
      name: '기준금리(미)', 
      value: '5.25%', 
      change: '+0.25%', 
      trend: 'up',
      source: 'FED',
      date: '2024-10-16',
      description: '연방준비제도 기준금리'
    },
    { 
      name: '핵심 CPI(미)', 
      value: '3.2%', 
      change: '-0.1%', 
      trend: 'down',
      source: 'BLS',
      date: '2024-09-15',
      description: '미국 근원 소비자물가지수 (전년동월비)'
    },
    { 
      name: '실업률(미)', 
      value: '3.8%', 
      change: '+0.1%', 
      trend: 'up',
      source: 'BLS',
      date: '2024-09-30',
      description: '미국 실업률'
    },
    { 
      name: '달러인덱스', 
      value: '106.2', 
      change: '-1.2', 
      trend: 'down',
      source: 'ICE',
      date: '2024-10-16',
      description: 'DXY 달러 강도 지수'
    },
    { 
      name: '금리차(10Y-2Y)', 
      value: '-0.15%', 
      change: '+0.05%', 
      trend: 'up',
      source: 'Treasury',
      date: '2024-10-16',
      description: '미국 10년-2년 국채 금리차'
    }
  ]

  const marketAnalysis = {
    headline: "지금 시장은 완화 전환 기대 vs 고금리 지속이 교차하는 과도기입니다. 변동성은 높지만, 기술주·에너지 전환에서 선택적 기회가 보입니다.",
    
    trends: [
      {
        title: "AI·반도체 중심 실적 주도 랠리 2막 조짐",
        evidence: 2,
        details: "NVIDIA Q3 실적 상향, 삼성·SK하이닉스 HBM 수주 확대",
        sources: ["NVIDIA IR", "업계 리포트"]
      },
      {
        title: "에너지 전환(태양광·전력망·원전) 정책 드라이브 지속",
        evidence: 2,
        details: "IRA 법안 효과 본격화, 중국 태양광 설비 투자 급증",
        sources: ["IEA 보고서", "BloombergNEF"]
      },
      {
        title: "달러 강세 완화 시 신흥국 단기 순환매 가능",
        evidence: 1,
        details: "DXY 106선 저항, EM 펀드 유입 조짐",
        sources: ["IIF 자금흐름"]
      }
    ],

    risks: [
      {
        title: "정책 피벗 지연/재상승 인플레",
        probability: "중",
        impact: "밸류에이션 압박",
        evidence: 2,
        defense: "현금 비중 15% 이상 유지",
        sources: ["Fed Watch", "CPI 트렌드"]
      },
      {
        title: "지정학 리스크 확대",
        probability: "중", 
        impact: "원자재·물류 비용 변동",
        evidence: 1,
        defense: "원자재 ETF 5% 헤지",
        sources: ["지정학 모니터링"]
      }
    ],

    opportunities: [
      {
        title: "AI·반도체",
        strategy: "실적 상향 국면의 대형주 중심 접근",
        method: "50/30/20 분할 진입",
        evidence: 2,
        sources: ["실적 컨센서스", "반도체 사이클"]
      },
      {
        title: "에너지 전환/인프라",
        strategy: "배당+성장 하이브리드",
        method: "현금흐름 가시성 우선",
        evidence: 2,
        sources: ["ESG 펀드 플로우", "정책 로드맵"]
      },
      {
        title: "고배당/ESG 품질주",
        strategy: "변동성 완충용 코어",
        method: "배당수익률 4% 이상 선별",
        evidence: 1,
        sources: ["배당 안정성 지수"]
      }
    ]
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleNext = () => {
    onNext({ 
      marketAnalysis,
      marketTimestamp: new Date().toISOString()
    })
  }

  const userProfile = userData.investmentProfile?.mbtiProfile || { type: '균형형 투자자' }
  const aiLevel = userData.aiInvolvementLevel || 'collaboration'

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">�</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">시장전략가 소피아</h2>
        <p className="text-indigo-600 font-medium mb-2 italic">"날카로운 시장 감각의 전략가"</p>
        <p className="text-gray-600 mb-4">안녕하세요! 저는 소피아입니다. 글로벌 시장의 흐름을 읽는 예리한 통찰력을 바탕으로 현재 경제 상황과 시장 트렌드를 분석하여 투자 방향을 제시해드리겠습니다.</p>
        <div className="bg-green-50 rounded-lg p-4 text-sm text-green-800">
          <div className="font-medium mb-2">🔍 AI 시장 분석 방법론:</div>
          <div className="text-xs space-y-1">
            <div>• 실시간 경제 지표 분석 (금리, 인플레이션, 고용률)</div>
            <div>• 글로벌 시장 동향 및 지정학적 리스크 평가</div>
            <div>• 섹터별 성장성과 밸류에이션 분석</div>
            <div>• 기술적 분석을 통한 시장 모멘텀 파악</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">현재 시장 상황</h3>
          <p className="text-blue-800">{marketAnalysis.currentMarket}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-3">피 주요 트렌드</h4>
            <ul className="space-y-2">
              {marketAnalysis.trends.map((trend, index) => (
                <li key={index} className="text-sm text-green-800 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {trend}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-3">⚠️ 주요 리스크</h4>
            <ul className="space-y-2">
              {marketAnalysis.risks.map((risk, index) => (
                <li key={index} className="text-sm text-red-800 flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-3">🔍 투자 기회</h4>
            <ul className="space-y-2">
              {marketAnalysis.opportunities.map((opp, index) => (
                <li key={index} className="text-sm text-purple-800 flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="text-yellow-600 mr-3">💡</div>
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">AI 시장 분석 결과</h4>
              <p className="text-sm text-yellow-700">
                현재 시장 상황을 바탕으로 자산배분전문가가 각 자산군별 최적 비중을 제안합니다.
              </p>
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
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          자산배분 최적화 →
        </button>
      </div>
    </div>
  )
}