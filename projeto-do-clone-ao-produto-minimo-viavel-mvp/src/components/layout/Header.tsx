import React, { useState, useEffect } from "react";
import { Github, Layers, LogIn, LogOut, User as UserIcon, Moon, Sun } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { signInWithGoogle, logout } from "../../lib/firebase";

export function Header() {
  const { user, loading } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference or local storage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="py-12 text-center relative">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-black text-[var(--neu-text)] tracking-tight mb-2 transition-colors duration-300">
          Neumorphism.io
        </h1>
        <p className="text-slate-500 text-lg">
          Generate neumorphic designs
        </p>
      </div>

      <div className="absolute top-8 right-8 flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 neu-card rounded-xl hover:scale-110 transition-all text-[var(--neu-text)]"
          title={isDark ? "Modo Claro" : "Modo Escuro"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center space-x-2 bg-[#1b1f23] text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-[#24292e] transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>6078</span>
        </a>

        <div className="flex items-center space-x-2">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
          ) : user ? (
            <div className="flex items-center space-x-3">
              <img 
                src={user.photoURL || ""} 
                alt="" 
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer" 
                referrerPolicy="no-referrer" 
              />
              <button 
                onClick={() => logout()} 
                className="text-xs font-bold text-slate-500 hover:text-red-600 hover:underline transition-colors duration-200"
              >
                Sair
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signInWithGoogle()} 
              className="text-xs font-bold text-slate-500 hover:text-slate-800 hover:underline transition-colors duration-200"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
