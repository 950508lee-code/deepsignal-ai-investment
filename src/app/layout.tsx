import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '딥시그널 - AI 투자 상담 플랫폼',
  description: '7명의 AI 투자 전문가가 제공하는 맞춤형 투자 상담 서비스',
  keywords: ['투자', 'AI', '포트폴리오', '자산배분', '주식', '투자상담'],
  authors: [{ name: '딥시그널' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}