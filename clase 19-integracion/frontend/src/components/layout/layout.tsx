import type { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps { 
  children: ReactNode; 
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}