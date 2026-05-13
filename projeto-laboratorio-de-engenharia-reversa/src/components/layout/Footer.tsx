import React from "react";
import { Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-12 mb-12">
          <div className="text-left">
            <h4 className="font-bold text-lg mb-4 text-[var(--neu-text)]">Mais Ferramentas</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="https://uiverse.io" className="hover:text-slate-800">uiverse.io</a></li>
              <li><a href="https://cssbuttons.io" className="hover:text-slate-800">cssbuttons.io</a></li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="font-bold text-lg mb-4 text-[var(--neu-text)]">Social</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-slate-800"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-slate-800"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-500 hover:text-slate-800"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <p className="text-slate-400 text-sm">
          Recursos gratuitos de frontend para ajudar você a construir seu próximo projeto.
        </p>
      </div>
    </footer>
  );
}
