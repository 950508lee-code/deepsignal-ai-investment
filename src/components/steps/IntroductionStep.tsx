interface IntroductionStepProps {
  onNext: (data?: any) => void
  userData: any
}

export default function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="space-y-4">
      {/* 메인 헤더 카드 */}
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100">
        <div className="relative mb-6 p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl text-white overflow-hidden">
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
          
          <div className="relative z-10">
            <div className="text-3xl mb-3">🤖</div>
            <h1 className="text-2xl font-bold mb-1">
              딥시그널
            </h1>
            <h2 className="text-sm font-medium text-blue-100 mb-3">
              AI 투자 상담 플랫폼
            </h2>
            <p className="text-xs text-blue-50 leading-relaxed">
              7명의 AI 전문가가 협업하여<br />
              맞춤형 투자 전략을 설계합니다
            </p>
          </div>
        </div>
      
        {/* 핵심 기능 카드 */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="group bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📊</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">개인 맞춤 분석</h3>
                <p className="text-xs text-gray-600">투자 성향과 목표 정밀 분석</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-r from-green-50 to-emerald-100 p-4 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">전문가 추천</h3>
                <p className="text-xs text-gray-600">7명의 AI 전문가 협업 전략</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-r from-purple-50 to-violet-100 p-4 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">💎</div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">포트폴리오 구성</h3>
                <p className="text-xs text-gray-600">리스크 관리와 수익 최적화</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 전문가 소개 섹션 */}
      <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100 mb-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🎯 7단계 전문 상담 프로세스
          </h3>
          <p className="text-sm text-gray-600">각자의 전문 분야에서 최고 수준의 맞춤형 분석을 제공합니다</p>
        </div>
        
        <div className="space-y-3">
          {[
            { 
              icon: '👨‍💼', 
              name: '투자상담매니저 알렉스', 
              desc: '투자 성향과 목표를 꼼꼼히 파악하는 신뢰할 수 있는 전문가', 
              color: 'from-blue-500 to-blue-600'
            },
            { 
              icon: '🤖', 
              name: 'AI 성향분석 아리아', 
              desc: '첨단 AI 기술로 투자 성향을 과학적으로 분석', 
              color: 'from-purple-500 to-purple-600'
            },
            { 
              icon: '📊', 
              name: '시장전략가 소피아', 
              desc: '글로벌 시장 흐름과 경제 상황을 분석하여 투자 방향 제시', 
              color: 'from-indigo-500 to-indigo-600'
            },
            { 
              icon: '⚖️', 
              name: '자산배분전문가 데이비드', 
              desc: '리스크와 수익의 균형을 맞춘 최적 자산 배분 전략 설계', 
              color: 'from-green-500 to-green-600'
            },
            { 
              icon: '🔬', 
              name: '산업리서처 마쿠스', 
              desc: '미래 유망 산업과 섹터를 발굴하고 투자 기회 분석', 
              color: 'from-yellow-500 to-orange-500'
            },
            { 
              icon: '📈', 
              name: '종목분석가 루나', 
              desc: '선택된 섹터 내에서 투자 가치가 높은 개별 종목 선정', 
              color: 'from-red-500 to-pink-500'
            },
            { 
              icon: '💼', 
              name: '포트폴리오매니저 엠마', 
              desc: '모든 분석을 종합하여 완벽한 최종 포트폴리오 구성', 
              color: 'from-teal-500 to-cyan-500'
            },
            { 
              icon: '⚡', 
              name: '매매전략가 라이언', 
              desc: '실제 투자 실행을 위한 구체적인 매매 전략 제공', 
              color: 'from-violet-500 to-purple-600'
            }
          ].map((step, index) => (
            <div key={index} className="group">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                {/* 단계 번호 */}
                <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                  {index + 1}
                </div>
                
                {/* 아이콘 */}
                <div className="text-xl flex-shrink-0">
                  {step.icon}
                </div>
                
                {/* 내용 */}
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    {step.name}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
              
              {/* 연결선 (마지막 단계 제외) */}
              {index < 7 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-3 bg-gradient-to-b from-gray-300 to-gray-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* 시작 버튼 */}
      <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100 text-center">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3">
            <span className="text-white text-xl">🚀</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            지금 바로 시작해보세요!
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            AI 전문가들이 당신만의 투자 전략을 설계합니다
          </p>
        </div>
        
        <button
          onClick={() => onNext()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl text-base font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
        >
          투자 상담 시작하기 →
        </button>
        
        <p className="text-xs text-gray-500 mt-3">
          💡 완전 무료로 이용하실 수 있습니다
        </p>
      </div>
    </div>
  )
}