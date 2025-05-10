import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import BackToTopButton from '@/components/BackToTopButton';
import { textContent } from '@/data/textContent'; // Import textContent
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: textContent.layout.title, // Use textContent
  description: textContent.layout.description, // Use textContent
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} font-sans bg-aot-dark text-aot-light`}>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BackToTopButton />
        </div>
        
        <Script src="/scripts/sectionSpacing.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
