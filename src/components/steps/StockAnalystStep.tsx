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
    const stocksByCategory: { [key: string]: any[] } = {
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
    
    const recommendations: any[] = []
    selectedSectors.forEach((sector: any) => {
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
    <div className="pt-16 pb-6 px-4">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-purple-500/5 rounded-2xl"></div>
            <div className="relative z-10 text-center">
              <div className="text-6xl mb-4">💎</div>
              <h2 className="text-2xl font-bold text-white mb-2">종목분석가 루나</h2>
              <p className="text-red-400 font-medium mb-2 italic">"정밀한 가치 발굴 전문가"</p>
              <p className="text-purple-200 mb-4">안녕하세요! 저는 루나입니다. 숨겨진 가치를 발굴하는 뛰어난 종목 분석 능력을 바탕으로, 마쿠스가 선정한 섹터 내에서 투자 가치가 높은 개별 종목을 선정해드리겠습니다.</p>
              
              <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 text-sm text-purple-200 border border-purple-400/20">
                <div className="font-medium mb-2 text-white">📊 종목 선정 기준:</div>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="font-medium text-purple-300">기본분석 (Fundamental)</div>
                    <div>• 재무제표 분석 (매출, 영업이익)</div>
                    <div>• 밸류에이션 (PER, PBR, EV/EBITDA)</div>
                    <div>• 경영진 역량과 사업 경쟁력</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-purple-300">기술분석 (Technical)</div>
                    <div>• 차트 패턴과 추세선 분석</div>
                    <div>• 거래량과 모멘텀 지표</div>
                    <div>• 지지/저항선과 매매 시점</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Sectors Card */}
          <div className="relative bg-gradient-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-indigo-500/5 rounded-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-3">선택한 섹터 기반 종목 추천</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSectors.map((sector: any, index: number) => (
                  <span key={index} className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-400/30 backdrop-blur-sm">
                    {sector.name}
                  </span>
                ))}
              </div>
              <p className="text-indigo-200 text-sm">
                선택한 섹터에서 AI가 기본분석(재무제표, PER, ROE)과 
                기술분석(차트 패턴, 거래량)을 통해 선별한 최적 종목들입니다.
              </p>
            </div>
          </div>

          {/* Stock List */}
          <div className="space-y-3 mb-8">
            {stockRecommendations.map((stock) => (
              <div 
                key={stock.symbol}
                className={`relative backdrop-blur-xl rounded-xl p-4 cursor-pointer transition-all duration-300 border transform hover:scale-[1.02] ${
                  selectedStocks.includes(stock.symbol)
                    ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-blue-400/50 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800/50 border-white/10 hover:border-purple-400/30'
                }`}
                onClick={() => handleStockToggle(stock.symbol)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-purple-500/5 rounded-xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={selectedStocks.includes(stock.symbol)}
                      onChange={() => handleStockToggle(stock.symbol)}
                      className="mr-3 accent-purple-500 w-4 h-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {stock.symbol} - {stock.name}
                      </h4>
                      <p className="text-sm text-purple-200">{stock.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium mb-1 ${
                      stock.rating === 'Buy' 
                        ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                    }`}>
                      {stock.rating}
                    </div>
                    <div className="text-sm text-purple-300">목표가: {stock.target}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Card */}
          <div className="relative bg-gradient-to-br from-slate-800/80 to-orange-900/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-orange-500/5 rounded-2xl"></div>
            <div className="relative z-10 flex items-start">
              <div className="text-orange-400 mr-3 text-xl">📊</div>
              <div>
                <h4 className="font-medium text-white mb-1">다음 단계: 포트폴리오 최종 구성</h4>
                <p className="text-sm text-orange-200">
                  선택한 종목들을 바탕으로 포트폴리오매니저가 최적의 비중으로 최종 포트폴리오를 구성해드립니다.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="relative bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-xl">
            <div className="flex justify-between">
              <button
                onClick={onPrevious}
                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 font-medium border border-slate-500/50 shadow-lg"
              >
                ← 이전
              </button>
              <button
                onClick={handleNext}
                disabled={selectedStocks.length === 0}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg border border-purple-500/50"
              >
                포트폴리오 구성 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}