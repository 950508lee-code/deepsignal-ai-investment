'use client'

import { useState } from 'react'

interface StockAnalystStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function StockAnalystStep({ onNext, onPrevious, userData }: StockAnalystStepProps) {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  
  const selectedSectors = userData.selectedSectors || []
  
  const getStockRecommendations = () => {
    const stocksByCategory = {
      'AI/반도체': [
        { symbol: 'NVDA', name: '엔비디아', rating: 'Buy', target: '$550', reason: 'AI 반도체 리더' },
        { symbol: 'AMD', name: 'AMD', rating: 'Buy', target: '$180', reason: 'CPU/GPU 경쟁력 강화' },
        { symbol: 'TSM', name: '대만 반도체', rating: 'Hold', target: '$120', reason: '세계 1위 파운드리' }
      ],
      '바이오/헬스케어': [
        { symbol: 'MRNA', name: '모더나', rating: 'Buy', target: '$200', reason: 'mRNA 기술 선두주자' },
        { symbol: 'JNJ', name: '존슨앤존슨', rating: 'Hold', target: '$175', reason: '안정적 의료 대기업' },
        { symbol: 'PFE', name: '화이자', rating: 'Hold', target: '$35', reason: '전통 제약 강자' }
      ],
      '필수소비재': [
        { symbol: 'PG', name: 'P&G', rating: 'Buy', target: '$165', reason: '고배당 안정주' },
        { symbol: 'KO', name: '코카콜라', rating: 'Hold', target: '$62', reason: '전세계 브랜드' },
        { symbol: 'WMT', name: '월마트', rating: 'Buy', target: '$180', reason: '리테일 지배력' }
      ],
      '신재생에너지': [
        { symbol: 'TSLA', name: '테슬라', rating: 'Hold', target: '$250', reason: 'EV 시장 리더' },
        { symbol: 'ENPH', name: '엔페이즈', rating: 'Buy', target: '$200', reason: '태양광 인버터 1위' },
        { symbol: 'NEE', name: 'NextEra Energy', rating: 'Buy', target: '$85', reason: '신재생 전환 선두' }
      ]
    }
    
    const recommendations = []
    selectedSectors.forEach(sector => {
      if (stocksByCategory[sector.name]) {
        recommendations.push(...stocksByCategory[sector.name])
      }
    })
    
    return recommendations.slice(0, 10) // 최대 10개 종목
  }

  const stockRecommendations = getStockRecommendations()
  
  const handleStockToggle = (symbol: string) => {
    setSelectedStocks(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  const handleNext = () => {
    const selectedStockData = stockRecommendations.filter(stock => 
      selectedStocks.includes(stock.symbol)
    )
    onNext({ selectedStocks: selectedStockData })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">📉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">종목분석가</h2>
        <p className="text-gray-600 mb-4">기본·기술적 분석을 통한 종목 선정</p>
        <div className="bg-teal-50 rounded-lg p-4 text-sm text-teal-800">
          <div className="font-medium mb-2">📊 종목 선정 기준:</div>
          <div className="grid md:grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="font-medium">기본분석 (Fundamental)</div>
              <div>• 재무제표 분석 (매출, 영업이익)</div>
              <div>• 밸류에이션 (PER, PBR, EV/EBITDA)</div>
              <div>• 경영진 역량과 사업 경쟁력</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">기술분석 (Technical)</div>
              <div>• 차트 패턴과 추세선 분석</div>
              <div>• 거래량과 모멘텀 지표</div>
              <div>• 지지/저항선과 매매 시점</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-indigo-900 mb-3">선택한 섹터 기반 종목 추천</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSectors.map((sector, index) => (
            <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
              {sector.name}
            </span>
          ))}
        </div>
        <p className="text-indigo-700 text-sm">
          선택한 섹터에서 AI가 기본분석(재무제표, PER, ROE)과 
          기술분석(차트 패턴, 거래량)을 통해 선별한 최적 종목들입니다.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {stockRecommendations.map((stock) => (
          <div 
            key={stock.symbol}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedStocks.includes(stock.symbol)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleStockToggle(stock.symbol)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={selectedStocks.includes(stock.symbol)}
                  onChange={() => handleStockToggle(stock.symbol)}
                  className="mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {stock.symbol} - {stock.name}
                  </h4>
                  <p className="text-sm text-gray-600">{stock.reason}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded text-sm font-medium mb-1 ${
                  stock.rating === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {stock.rating}
                </div>
                <div className="text-sm text-gray-600">목표가: {stock.target}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="text-orange-600 mr-3">📊</div>
          <div>
            <h4 className="font-medium text-orange-800 mb-1">다음 단계: 포트폴리오 최종 구성</h4>
            <p className="text-sm text-orange-700">
              선택한 종목들을 바탕으로 포트폴리오매니저가 최적의 비중으로 최종 포트폴리오를 구성해드립니다.
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
          disabled={selectedStocks.length === 0}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          포트폴리오 구성 →
        </button>
      </div>
    </div>
  )
}