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
import ProgressIndicator from '@/components/ui/ProgressIndicator'

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
    { component: IntroductionStep, title: '딥시그널 소개' },
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
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 프로그레스 인디케이터 */}
        <ProgressIndicator 
          currentStep={currentStep} 
          totalSteps={steps.length}
          stepTitles={steps.map(step => step.title)}
        />
        
        {/* 현재 단계 컴포넌트 */}
        <div className="mt-8">
          <CurrentStepComponent 
            userData={userData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        </div>
      </div>
    </div>
  )
}