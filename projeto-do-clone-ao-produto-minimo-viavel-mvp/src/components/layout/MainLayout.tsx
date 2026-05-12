import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-neu-bg)]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 overflow-y-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
