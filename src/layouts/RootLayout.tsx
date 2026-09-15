import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sparkles } from 'lucide-react';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#060B18] text-[#F4F7FF] flex flex-col selection:bg-[#4F8CFF]/30 selection:text-[#49D6FF]">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/[0.06] bg-[#060B18] py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#4F8CFF] to-[#49D6FF] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-[#F4F7FF]">
              Emotia
            </span>
            <span className="text-xs text-[#8C9AB5] ml-2">
              Three signals. One emotional story.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#8C9AB5]">
            <Link to="/" className="hover:text-[#F4F7FF] transition">
              Home
            </Link>
            <Link to="/analyze" className="hover:text-[#F4F7FF] transition">
              Analyze
            </Link>
            <Link to="/history" className="hover:text-[#F4F7FF] transition">
              History
            </Link>
            <Link to="/profile" className="hover:text-[#F4F7FF] transition">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
