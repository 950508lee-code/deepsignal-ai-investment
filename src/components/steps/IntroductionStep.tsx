interface IntroductionStepProps {
  onNext: (data?: any) => void
  userData: any
}

export default function IntroductionStep({ onNext }: IntroductionStepProps) {
  return (
    <div className="pt-16 pb-6 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* 메인 헤더 카드 */}
        <div className="relative bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 shadow-2xl overflow-hidden">
          {/* 글래스모피즘 효과 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-purple-500/10 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="text-4xl mb-4 animate-pulse">🤖</div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              딥시그널
            </h1>
            <h2 className="text-sm font-medium text-purple-200 mb-4">
              AI 투자 상담 플랫폼
            </h2>
            <p className="text-sm text-purple-100/80 leading-relaxed">
              7명의 AI 전문가가 협업하여<br />
              맞춤형 투자 전략을 설계합니다
            </p>
          </div>
        </div>
      
        {/* 핵심 기능 카드 */}
        <div className="space-y-4">
          <div className="group relative bg-gradient-to-r from-blue-900/60 to-purple-900/60 backdrop-blur-lg p-6 rounded-2xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-500 transform hover:scale-[1.02] shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="text-3xl filter drop-shadow-lg">📊</div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">개인 맞춤 분석</h3>
                <p className="text-sm text-blue-200">투자 성향과 목표 정밀 분석</p>
              </div>
            </div>
          </div>
          
          <div className="group relative bg-gradient-to-r from-emerald-900/60 to-teal-900/60 backdrop-blur-lg p-6 rounded-2xl border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-500 transform hover:scale-[1.02] shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="text-3xl filter drop-shadow-lg">🎯</div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">전문가 추천</h3>
                <p className="text-sm text-emerald-200">7명의 AI 전문가 협업 전략</p>
              </div>
            </div>
          </div>
          
          <div className="group relative bg-gradient-to-r from-purple-900/60 to-violet-900/60 backdrop-blur-lg p-6 rounded-2xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-500 transform hover:scale-[1.02] shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="text-3xl filter drop-shadow-lg">💎</div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">포트폴리오 구성</h3>
                <p className="text-sm text-purple-200">리스크 관리와 수익 최적화</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 전문가 소개 섹션 */}
        <div className="relative bg-gradient-to-br from-slate-800/80 to-purple-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-purple-500/5 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="text-center mb-5">
              <h3 className="text-lg font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-2">
                🎯 7단계 전문 상담 프로세스
              </h3>
              <p className="text-sm text-purple-200/80">각자의 전문 분야에서 최고 수준의 맞춤형 분석을 제공합니다</p>
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
                  <div className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all duration-300 border border-white/10">
                    {/* 단계 번호 */}
                    <div className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-lg`}>
                      {index + 1}
                    </div>
                    
                    {/* 아이콘 */}
                    <div className="text-xl flex-shrink-0 filter drop-shadow-sm">
                      {step.icon}
                    </div>
                    
                    {/* 내용 */}
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {step.name}
                      </h4>
                      <p className="text-xs text-purple-200/80 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* 연결선 (마지막 단계 제외) */}
                  {index < 7 && (
                    <div className="flex justify-center py-1">
                      <div className="w-0.5 h-3 bg-gradient-to-b from-purple-400/50 to-purple-300/30"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 시작 버튼 */}
        <div className="relative bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-purple-500/10 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3 shadow-lg">
                <span className="text-white text-xl filter drop-shadow-sm">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                지금 바로 시작해보세요!
              </h3>
              <p className="text-sm text-purple-200/80 mb-4">
                AI 전문가들이 당신만의 투자 전략을 설계합니다
              </p>
            </div>
            
            <button
              onClick={() => onNext()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl text-base font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 border border-purple-500/50"
            >
              투자 상담 시작하기 →
            </button>
            
            <p className="text-xs text-purple-300/70 mt-3">
              💡 완전 무료로 이용하실 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}