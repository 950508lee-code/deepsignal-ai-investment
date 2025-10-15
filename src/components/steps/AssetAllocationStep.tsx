'use client'

import { useState } from 'react'

interface AssetAllocationStepProps {
  onNext: (data?: any) => void
  onPrevious: () => void
  userData: any
}

export default function AssetAllocationStep({ onNext, onPrevious, userData }: AssetAllocationStepProps) {
  const [selectedOption, setSelectedOption] = useState('')
  
  const riskTolerance = userData.riskTolerance || 'moderate'
  
  const getAssetOptions = () => {
    if (riskTolerance === 'aggressive') {
      return [
        {
          id: 'aggressive1',
          name: '고수익 추구형',
          allocation: '주식 85% / 대안투자 10% / 현금 5%',
          expected: '예상수익률: 12-15%',
          risk: '리스크: 높음',
          recommended: true
        },
        {
          id: 'aggressive2', 
          name: '성장주 집중형',
          allocation: '성장주 70% / 배당주 20% / 채권 10%',
          expected: '예상수익률: 10-13%',
          risk: '리스크: 높음'
        }
      ]
    } else if (riskTolerance === 'moderate') {
      return [
        {
          id: 'moderate1',
          name: '균형 성장형',
          allocation: '주식 60% / 채권 30% / 대안투자 10%',
          expected: '예상수익률: 8-10%',
          risk: '리스크: 보통',
          recommended: true
        },
        {
          id: 'moderate2',
          name: '배당 중심형',
          allocation: '배당주 50% / 채권 35% / 주식 15%',
          expected: '예상수익률: 6-8%',
          risk: '리스크: 보통'
        }
      ]
    } else {
      return [
        {
          id: 'conservative1',
          name: '안정 수익형',
          allocation: '채권 50% / 배당주 30% / 현금 20%',
          expected: '예상수익률: 4-6%',
          risk: '리스크: 낮음',
          recommended: true
        },
        {
          id: 'conservative2',
          name: '원금보장형',
          allocation: '예금 40% / 채권 40% / 배당주 20%',
          expected: '예상수익률: 3-5%',
          risk: '리스크: 낮음'
        }
      ]
    }
  }

  const assetOptions = getAssetOptions()
  const recommended = assetOptions.find(option => option.recommended)

  const handleNext = () => {
    const selected = assetOptions.find(option => option.id === selectedOption)
    onNext({ selectedAssetAllocation: selected })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">자산배분전문가</h2>
        <p className="text-gray-600 mb-4">최적 포트폴리오 구성과 리스크 관리</p>
        <div className="bg-purple-50 rounded-lg p-4 text-sm text-purple-800">
          <div className="font-medium mb-2">⚖️ 포트폴리오 최적화 원리:</div>
          <div className="text-xs space-y-1">
            <div>• 현대 포트폴리오 이론(MPT) 기반 자산 배분</div>
            <div>• 샤프 비율 최적화를 통한 위험 대비 수익률 극대화</div>
            <div>• 상관관계 분석을 통한 분산투자 효과 극대화</div>
            <div>• 개인 투자 성향에 맞는 효율적 투자선(Efficient Frontier) 제시</div>
          </div>
        </div>
      </div>

      {recommended && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">AI 추천</span>
            <h3 className="font-semibold text-green-900">{recommended.name}</h3>
          </div>
          <p className="text-sm text-green-700">당신의 투자 성향에 가장 적합한 자산배분입니다.</p>
        </div>
      )}

      <div className="space-y-4 mb-8">
        {assetOptions.map((option) => (
          <div 
            key={option.id}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              selectedOption === option.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            } ${option.recommended ? 'ring-2 ring-green-200' : ''}`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <input 
                    type="radio" 
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                    className="mr-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
                  {option.recommended && (
                    <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-xs">추천</span>
                  )}
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">자산 배분</p>
                    <p className="text-sm text-gray-600">{option.allocation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{option.expected}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{option.risk}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="text-blue-600 mr-3">📝</div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">다음 단계 미리보기</h4>
            <p className="text-sm text-blue-700">
              선택한 자산배분에 따라 산업리서처가 유망 섹터를 분석하고 추천할 예정입니다.
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
          disabled={!selectedOption}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          산업 분석 받기 →
        </button>
      </div>
    </div>
  )
}