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
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">시장전략가 소피아</h2>
        <p className="text-indigo-600 font-medium mb-2 italic">"날카로운 시장 감각의 전략가"</p>
        <p className="text-gray-600 mb-4">안녕하세요! 저는 소피아입니다. 글로벌 시장의 흐름을 읽는 예리한 통찰력을 바탕으로 현재 경제 상황과 시장 트렌드를 분석하여 투자 방향을 제시해드리겠습니다.</p>
      </div>

      {/* 상단 헤드라인 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">💡 시장 핵심 진단</h3>
        <p className="text-blue-800 text-sm sm:text-base leading-relaxed mb-3">
          {marketAnalysis.headline}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-blue-600">[근거 3] 기준금리, 핵심CPI, 실업률 – 최신월</span>
          <button
            onClick={() => setShowData(!showData)}
            className="flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            📊 데이터 {showData ? '숨기기' : '보기'}
          </button>
        </div>
      </div>

      {/* KPI 카드 스와이프 */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-800 mb-3">📈 핵심 경제 지표</h4>
        <div className="flex gap-3 overflow-x-auto pb-3">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 min-w-[160px] flex-shrink-0 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-gray-800 text-sm">{kpi.name}</h5>
                <button className="text-gray-400 hover:text-gray-600 text-xs">ⓘ</button>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
              <div className={`text-xs ${kpi.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                {kpi.trend === 'up' ? '↗' : '↘'} {kpi.change}
              </div>
              {showData && (
                <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                  <div>출처: {kpi.source}</div>
                  <div>{kpi.date}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 인사이트 섹션들 */}
      <div className="space-y-4">
        {/* 주요 트렌드 */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('trends')}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
          >
            <h4 className="font-bold text-gray-800 flex items-center">
              📈 주요 트렌드
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {marketAnalysis.trends.length}개
              </span>
            </h4>
            <span className={`transform transition-transform ${expandedSections.trends ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.trends && (
            <div className="px-4 pb-4 space-y-3">
              {marketAnalysis.trends.map((trend, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-green-800 text-sm">{trend.title}</h5>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      [근거 {trend.evidence}]
                    </span>
                  </div>
                  <p className="text-green-700 text-xs mb-2">{trend.details}</p>
                  {showData && (
                    <div className="text-xs text-green-600 border-t border-green-200 pt-2">
                      출처: {trend.sources.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 핵심 리스크 */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('risks')}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
          >
            <h4 className="font-bold text-gray-800 flex items-center">
              ⚠️ 핵심 리스크
              <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                {marketAnalysis.risks.length}개
              </span>
            </h4>
            <span className={`transform transition-transform ${expandedSections.risks ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.risks && (
            <div className="px-4 pb-4 space-y-3">
              {marketAnalysis.risks.map((risk, index) => (
                <div key={index} className="bg-orange-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-orange-800 text-sm">{risk.title}</h5>
                    <div className="flex gap-1">
                      <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                        확률: {risk.probability}
                      </span>
                      <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                        [근거 {risk.evidence}]
                      </span>
                    </div>
                  </div>
                  <p className="text-orange-700 text-xs mb-1">영향: {risk.impact}</p>
                  <p className="text-orange-600 text-xs font-medium">💡 방어: {risk.defense}</p>
                  {showData && (
                    <div className="text-xs text-orange-600 border-t border-orange-200 pt-2 mt-2">
                      출처: {risk.sources.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 투자 기회 */}
        <div className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleSection('opportunities')}
            className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
          >
            <h4 className="font-bold text-gray-800 flex items-center">
              💎 투자 기회
              <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                {marketAnalysis.opportunities.length}개
              </span>
            </h4>
            <span className={`transform transition-transform ${expandedSections.opportunities ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {expandedSections.opportunities && (
            <div className="px-4 pb-4 space-y-3">
              {marketAnalysis.opportunities.map((opp, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-purple-800 text-sm">{opp.title}</h5>
                    <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                      [근거 {opp.evidence}]
                    </span>
                  </div>
                  <p className="text-purple-700 text-xs mb-1">전략: {opp.strategy}</p>
                  <p className="text-purple-600 text-xs font-medium">📋 방법: {opp.method}</p>
                  {showData && (
                    <div className="text-xs text-purple-600 border-t border-purple-200 pt-2 mt-2">
                      출처: {opp.sources.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 다음 단계 안내 */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center mt-6 mb-6">
        <div className="text-2xl mb-3">🔗</div>
        <h3 className="text-xl font-bold mb-2">다음 단계</h3>
        <p className="text-indigo-100 mb-4">
          성향과 시장 진단을 결합해 자산배분전문가 데이비드가<br />
          자산군별 비중을 제안합니다.
        </p>
        <div className="text-sm text-indigo-200">
          현재 성향: {userProfile.type} · AI 개입: {aiLevel === 'reference' ? '참고형' : aiLevel === 'collaboration' ? '협업형' : '가이드형'}
        </div>
      </div>

      {/* 하단 고정 CTA - 모바일 최적화 */}
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
        >
          ← 이전
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 w-full sm:w-auto font-semibold"
        >
          자산배분으로 이동 →
        </button>
      </div>
    </div>
  )
}