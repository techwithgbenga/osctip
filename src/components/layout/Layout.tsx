
import React from 'react';
import { Sidebar } from './Sidebar';
import { AppHeader } from './AppHeader';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-cyber-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
