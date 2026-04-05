import type { Metadata } from 'next';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/components/layout/Sidebar';
import '@/styles/globals.css';

const inter      = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sora       = Sora({ subsets: ['latin'], variable: '--font-sora' });
const jetbrains  = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'EduManage Pro — Student Management System',
  description: 'Modern student registration and management platform',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrains.variable}`}>
      <body className="bg-surface text-slate-200 font-sans antialiased">
        {/* Background orbs */}
        <div className="orb w-96 h-96 bg-brand-600 top-0 left-1/4" style={{ opacity: 0.12 }} />
        <div className="orb w-72 h-72 bg-accent-cyan bottom-1/4 right-1/4" style={{ opacity: 0.08 }} />

        <div className="flex min-h-screen relative z-10">
          <Sidebar />
          {/* pt-14 on mobile to clear the fixed top navbar, md:pt-0 on desktop */}
          <main className="flex-1 overflow-auto pt-14 md:pt-0">
            {children}
          </main>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#161628',
              color: '#e2e8f0',
              border: '1px solid #1e1e35',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#06d6a0', secondary: '#161628' } },
            error:   { iconTheme: { primary: '#fb7185', secondary: '#161628' } },
          }}
        />
      </body>
    </html>
  );
}
