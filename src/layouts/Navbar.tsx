import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze', path: '/analyze' },
    { name: 'History', path: '/history' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#060B18]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4F8CFF] to-[#49D6FF] flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-all">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#F4F7FF]">
              Emotia
            </span>
            <span className="hidden sm:inline-block text-[10px] text-[#49D6FF] font-mono tracking-widest uppercase border border-[#49D6FF]/30 bg-[#49D6FF]/10 px-1.5 py-0.5 rounded">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-[#4F8CFF]/20 text-[#F4F7FF] border border-[#4F8CFF]/30 shadow-glow-sm'
                  : 'text-[#8C9AB5] hover:text-[#F4F7FF] hover:bg-white/[0.03]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Profile Action */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/profile"
            className={`p-2 rounded-xl border border-white/[0.08] transition ${
              isActive('/profile')
                ? 'bg-white/10 text-white border-[#4F8CFF]/40 shadow-glow-sm'
                : 'bg-white/[0.03] text-[#8C9AB5] hover:text-[#F4F7FF]'
            }`}
            title="Profile"
          >
            <User size={18} />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#8C9AB5] hover:text-[#F4F7FF] rounded-lg bg-white/[0.04]"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0A1120] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-[#4F8CFF]/20 text-white'
                  : 'text-[#8C9AB5] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
              isActive('/profile')
                ? 'bg-[#4F8CFF]/20 text-white'
                : 'text-[#8C9AB5] hover:text-white'
            }`}
          >
            Profile
          </Link>
        </div>
      )}
    </header>
  );
};
