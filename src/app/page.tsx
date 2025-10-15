'use client'

import { useState } from 'react'
import IntroductionStep from '@/components/steps/IntroductionStep'
import InvestmentConsultantStep from '@/components/steps/InvestmentConsultantStep'
import InvestmentAnalysisStep from '@/components/steps/InvestmentAnalysisStep'
import MarketStrategistStep from '@/components/steps/MarketStrategistStep'
import AssetAllocationStep from '@/components/steps/AssetAllocationStep'
import IndustryResearcherStep from '@/components/steps/IndustryResearcherStep'
import StockAnalystStep from '@/components/steps/StockAnalystStep'
import PortfolioManagerStep from '@/components/steps/PortfolioManagerStep'
import TradingStrategistStep from '@/components/steps/TradingStrategistStep'

export interface UserData {
  riskTolerance?: 'conservative' | 'moderate' | 'aggressive'
  investmentGoal?: string
  timeHorizon?: string
  investmentAmount?: number
  currentAssets?: any
  selectedAssetAllocation?: string
  selectedSectors?: string[]
  selectedStocks?: string[]
  finalPortfolio?: any
  tradingStrategy?: any
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<UserData>({})

  const steps = [
    { component: IntroductionStep, title: '시작하기' },
    { component: InvestmentConsultantStep, title: '투자상담매니저' },
    { component: InvestmentAnalysisStep, title: 'AI 투자 성향 분석' },
    { component: MarketStrategistStep, title: '시장전략가' },
    { component: AssetAllocationStep, title: '자산배분전문가' },
    { component: IndustryResearcherStep, title: '산업리서처' },
    { component: StockAnalystStep, title: '종목분석가' },
    { component: PortfolioManagerStep, title: '포트폴리오매니저' },
    { component: TradingStrategistStep, title: '매매전략가' }
  ]

  const handleNext = (data?: any) => {
    if (data) {
      setUserData(prev => ({ ...prev, ...data }))
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      // 페이지 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      // 페이지 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 진행률 표시 바 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-800/90 backdrop-blur-sm border-b border-white/10">
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" 
             style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
              <span className="text-sm font-medium text-white">
                {steps[currentStep].title}
              </span>
            </div>
            <div className="text-xs text-purple-300 font-medium">
              {currentStep + 1} / {steps.length}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-6 px-3 sm:px-4">
        <div className="max-w-md mx-auto">
          {/* 현재 단계 컴포넌트 */}
          <CurrentStepComponent 
            userData={userData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      </div>
    </div>
  )
}