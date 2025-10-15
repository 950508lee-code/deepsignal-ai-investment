interface IntroductionStepProps {
  onNext: (data?: any) => void
  userData: any
}

export default function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 text-center">
      {/* 메인 헤더 */}
      <div className="relative mb-8 p-6 sm:p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl text-white overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="text-4xl sm:text-5xl mb-4">🤖</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            딥시그널
          </h1>
          <h2 className="text-lg sm:text-xl font-medium text-blue-100 mb-4">
            AI 투자 상담 플랫폼
          </h2>
          <p className="text-sm sm:text-base text-blue-50 leading-relaxed max-w-2xl mx-auto">
            각기 다른 전문성을 가진 7명의 AI 전문가가<br className="hidden sm:block" />
            당신만을 위한 맞춤형 투자 전략을 설계합니다.
          </p>
        </div>
      </div>
      
      {/* 핵심 기능 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div className="text-3xl sm:text-4xl mb-3 group-hover:animate-bounce">📊</div>
          <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">개인 맞춤 분석</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">당신의 투자 성향과 목표를 정밀 분석</p>
        </div>
        
        <div className="group bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-6 rounded-xl hover:from-green-100 hover:to-emerald-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div className="text-3xl sm:text-4xl mb-3 group-hover:animate-bounce">🎯</div>
          <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">전문가 추천</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">7명의 AI 전문가가 협업하여 최적 전략 제시</p>
        </div>
        
        <div className="group bg-gradient-to-br from-purple-50 to-violet-100 p-4 sm:p-6 rounded-xl hover:from-purple-100 hover:to-violet-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
          <div className="text-3xl sm:text-4xl mb-3 group-hover:animate-bounce">💎</div>
          <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">포트폴리오 구성</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">리스크 관리와 수익 최적화를 위한 자산 배분</p>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🎯 7단계 전문 상담 프로세스
          </h3>
          <p className="text-sm sm:text-base text-gray-600">각자의 전문 분야에서 최고 수준의 맞춤형 분석을 제공합니다</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {[
            { 
              icon: '👨‍💼', 
              name: '투자상담매니저 알렉스', 
              desc: '친근하고 신뢰할 수 있는 투자 전문가입니다. 당신의 투자 성향과 목표를 꼼꼼히 파악하고 기본 정보를 수집합니다', 
              color: 'from-blue-500 to-blue-600',
              character: '신중하고 체계적인 분석 전문가'
            },
            { 
              icon: '🤖', 
              name: 'AI 성향분석 아리아', 
              desc: '첨단 AI 기술을 활용한 성향 분석 시스템입니다. 수집된 정보를 바탕으로 투자 성향을 과학적으로 분석합니다', 
              color: 'from-purple-500 to-purple-600',
              character: '정확하고 객관적인 데이터 분석가'
            },
            { 
              icon: '📊', 
              name: '시장전략가 소피아', 
              desc: '글로벌 시장의 흐름을 읽는 예리한 통찰력을 가진 전문가입니다. 현재 경제 상황과 시장 트렌드를 분석하여 투자 방향을 제시합니다', 
              color: 'from-indigo-500 to-indigo-600',
              character: '날카로운 시장 감각의 전략가'
            },
            { 
              icon: '⚖️', 
              name: '자산배분전문가 데이비드', 
              desc: '리스크와 수익의 완벽한 균형을 추구하는 자산배분의 달인입니다. 리스크 수준에 맞는 최적의 자산 배분 전략을 설계합니다', 
              color: 'from-green-500 to-green-600',
              character: '균형과 안정성의 마스터'
            },
            { 
              icon: '🔬', 
              name: '산업리서처 마쿠스', 
              desc: '미래 산업을 내다보는 혜안을 가진 연구 전문가입니다. 유망한 산업과 섹터를 발굴하고 투자 기회를 분석합니다', 
              color: 'from-yellow-500 to-orange-500',
              character: '미래를 예측하는 산업 전문가'
            },
            { 
              icon: '📈', 
              name: '종목분석가 루나', 
              desc: '숨겨진 가치를 발굴하는 뛰어난 종목 분석 능력을 가진 전문가입니다. 선택된 섹터 내에서 투자 가치가 높은 개별 종목을 선정합니다', 
              color: 'from-red-500 to-pink-500',
              character: '정밀한 가치 발굴 전문가'
            },
            { 
              icon: '💼', 
              name: '포트폴리오매니저 엠마', 
              desc: '모든 투자 요소를 완벽하게 조합하는 포트폴리오 설계의 마에스트로입니다. 모든 분석을 종합하여 최종 포트폴리오를 구성합니다', 
              color: 'from-teal-500 to-cyan-500',
              character: '완벽한 조화의 설계자'
            },
            { 
              icon: '⚡', 
              name: '매매전략가 라이언', 
              desc: '완벽한 타이밍을 포착하는 매매의 달인입니다. 실제 투자 실행을 위한 구체적인 매매 전략을 제공합니다', 
              color: 'from-violet-500 to-purple-600',
              character: '타이밍의 마스터'
            }
          ].map((step, index) => (
            <div key={index} className="group relative">
              <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                {/* 단계 번호와 아이콘 */}
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg`}>
                    {index + 1}
                  </div>
                </div>
                
                {/* 아이콘 */}
                <div className="flex-shrink-0 text-2xl sm:text-3xl mt-1">
                  {step.icon}
                </div>
                
                {/* 내용 */}
                <div className="flex-grow min-w-0">
                  <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">
                    {step.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1 italic">
                    "{step.character}"
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                
                {/* 화살표 (데스크톱에서만) */}
                <div className="hidden sm:flex flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-blue-500 text-xl">→</div>
                </div>
              </div>
              
              {/* 연결선 (마지막 단계 제외) */}
              {index < 7 && (
                <div className="flex justify-center py-1 sm:py-2">
                  <div className="w-0.5 h-4 sm:h-6 bg-gradient-to-b from-gray-300 to-gray-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      
      <button
        onClick={() => onNext()}
        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
                투자 상담 시작하기 →
      </button>
    </div>
  )
}