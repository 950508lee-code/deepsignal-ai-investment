interface IntroductionStepProps {
  onNext: (data?: any) => void
  userData: any
}

export default function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🤖 딥시그널
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          AI 투자 상담 플랫폼
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          7명의 AI 투자 전문가가 단계별로 당신의 투자 성향을 분석하고,<br />
          맞춤형 투자 전략과 포트폴리오를 제안해드립니다.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-semibold text-gray-800 mb-2">개인 맞춤 분석</h3>
          <p className="text-sm text-gray-600">당신의 투자 성향과 목표를 정밀 분석</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="font-semibold text-gray-800 mb-2">전문가 추천</h3>
          <p className="text-sm text-gray-600">7명의 AI 전문가가 협업하여 최적 전략 제시</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="text-3xl mb-3">💎</div>
          <h3 className="font-semibold text-gray-800 mb-2">포트폴리오 구성</h3>
          <p className="text-sm text-gray-600">리스크 관리와 수익 최적화를 위한 자산 배분</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🎯 7단계 전문 상담 프로세스</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          {[
            { name: '투자상담매니저', desc: '당신의 투자 성향과 목표를 파악하고 기본 정보를 수집합니다' },
            { name: 'AI 성향분석', desc: '수집된 정보를 바탕으로 투자 성향을 과학적으로 분석합니다' },
            { name: '시장전략가', desc: '현재 경제 상황과 시장 트렌드를 분석하여 투자 방향을 제시합니다' },
            { name: '자산배분전문가', desc: '리스크 수준에 맞는 최적의 자산 배분 전략을 설계합니다' },
            { name: '산업리서처', desc: '유망한 산업과 섹터를 발굴하고 투자 기회를 분석합니다' },
            { name: '종목분석가', desc: '선택된 섹터 내에서 투자 가치가 높은 개별 종목을 선정합니다' },
            { name: '포트폴리오매니저', desc: '모든 분석을 종합하여 최종 포트폴리오를 구성합니다' },
            { name: '매매전략가', desc: '실제 투자 실행을 위한 구체적인 매매 전략을 제공합니다' }
          ].map((step, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-blue-800 mb-1">
                {index + 1}. {step.name}
              </div>
              <div className="text-gray-600 text-xs">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => onNext()}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        투자 상담 시작하기 →
      </button>
    </div>
  )
}