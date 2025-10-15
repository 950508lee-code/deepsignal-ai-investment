# 딥시그널 AI 투자 상담 플랫폼

🤖 7명의 AI 투자 전문가가 제공하는 맞춤형 투자 상담 서비스

## 📋 프로젝트 개요

딥시그널은 사용자의 투자 성향을 분석하고 7단계의 체계적인 상담 프로세스를 통해 개인 맞춤형 투자 전략을 제공하는 AI 기반 투자 상담 플랫폼입니다.

## 🎯 주요 기능

### 7단계 AI 투자 상담 프로세스

1. **딥시그널 소개** - 플랫폼 소개 및 상담 프로세스 안내
2. **투자상담매니저** - 투자 성향 분석과 맞춤형 전략 설계
3. **AI 투자 성향 분석** - 1단계 응답 기반 성향 분석 결과
4. **시장전략가** - 현재 거시경제 분석과 시장 동향 해석
5. **자산배분전문가** - 최적 포트폴리오 구성과 리스크 관리
6. **산업리서처** - 산업 트렌드 분석과 유망 섹터 발굴
7. **종목분석가** - 기본·기술적 분석을 통한 종목 선정
8. **포트폴리오매니저** - 최종 포트폴리오 구성 및 리스크 분석
9. **매매전략가** - 최적 매수 타이밍과 매매 전략 제시

## 🛠 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Deployment**: Vercel / GitHub Pages

## 📱 모바일 최적화

- 반응형 디자인으로 모든 기기에서 최적화된 사용자 경험
- PWA 지원으로 모바일 앱과 같은 사용성
- 터치 친화적 인터페이스

## 🚀 시작하기

### 전제 조건

Node.js가 설치되어 있지 않은 경우:

1. **Node.js 설치**
   - [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
   - 설치 완료 후 터미널에서 확인: `node --version`

2. **Git 설치** (선택사항)
   - [Git 공식 사이트](https://git-scm.com/)에서 다운로드

### 설치 및 실행

1. 프로젝트 클론
\`\`\`bash
git clone [repository-url]
cd deepsignal-ai-investment
\`\`\`

2. 의존성 설치
\`\`\`bash
npm install
\`\`\`

3. 개발 서버 시작
\`\`\`bash
npm run dev
\`\`\`

4. 브라우저에서 http://localhost:3000 접속

### 빌드 및 배포

\`\`\`bash
# 프로덕션 빌드
npm run build

# 정적 파일 내보내기 (GitHub Pages용)
npm run export
\`\`\`

## 📁 프로젝트 구조

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/
│   ├── steps/             # 7단계 상담 컴포넌트
│   │   ├── IntroductionStep.tsx
│   │   ├── InvestmentConsultantStep.tsx
│   │   ├── InvestmentAnalysisStep.tsx
│   │   ├── MarketStrategistStep.tsx
│   │   ├── AssetAllocationStep.tsx
│   │   ├── IndustryResearcherStep.tsx
│   │   ├── StockAnalystStep.tsx
│   │   ├── PortfolioManagerStep.tsx
│   │   └── TradingStrategistStep.tsx
│   └── ui/                # 공통 UI 컴포넌트
│       └── ProgressIndicator.tsx
\`\`\`

## 🎨 디자인 시스템

- **컬러 팔레트**: Blue/Purple 그라디언트 기반
- **타이포그래피**: Inter 폰트 사용
- **컴포넌트**: 일관된 카드 기반 레이아웃
- **애니메이션**: 부드러운 전환 효과

## 🔧 개발자 가이드

### 새로운 단계 추가

1. \`src/components/steps/\`에 새 컴포넌트 생성
2. \`src/app/page.tsx\`의 steps 배열에 추가
3. UserData 인터페이스에 필요한 데이터 타입 추가

### 스타일링 가이드

- Tailwind CSS 클래스 사용
- 반응형 디자인을 위해 \`md:\` 접두사 활용
- 일관된 색상 시스템 유지

## 📊 투자 상담 플로우

1. **사용자 정보 수집** → 투자 성향, 목표, 예산 등
2. **AI 분석** → 사용자 데이터 기반 투자 성향 분류
3. **시장 분석** → 현재 경제 상황 및 투자 기회 분석
4. **자산 배분** → 리스크 수준에 맞는 포트폴리오 구성
5. **섹터 선정** → 유망 산업 및 섹터 추천
6. **종목 선택** → 개별 투자 종목 추천
7. **포트폴리오 완성** → 최종 투자 포트폴리오 제시
8. **실행 전략** → 구체적인 매매 전략 및 타이밍 가이드

## ⚠️ 면책 조항

- 본 플랫폼은 교육 및 정보 제공 목적으로 제작되었습니다
- 모든 투자에는 원금 손실의 위험이 있습니다
- 실제 투자 결정 시 전문가와의 상담을 권장합니다
- 과거 성과가 미래 수익을 보장하지 않습니다

## 📞 문의

투자 상담 및 기술 지원이 필요하시면 언제든 연락해 주세요.

---

Made with ❤️ by 딥시그널 팀