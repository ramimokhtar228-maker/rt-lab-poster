import React from 'react';
import { Sparkles, Phone, MessageCircle, Calendar, ShieldCheck } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenBrandGuide: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenBrandGuide, onOpenGuide }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-cyan-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-600 shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/30">
              <span className="text-white font-black text-xl tracking-tight font-mono">RT</span>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-white tracking-wide">
                  معامل <span className="text-cyan-400">RT</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                  للتحاليل الطبية
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden xs:inline">
                RT Medical Laboratories • دقة وتشخيص معتمد
              </span>
            </div>
          </div>

          {/* Center Announcement Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-red-500/10 to-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>عرض اليوم الواحد الحصري | خصم 70% على كافة الفحوصات</span>
          </div>

          {/* Actions & Contact */}
          <div className="flex items-center gap-2 sm:gap-3">
            <PWAInstallButton variant="header" />

            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition shadow-sm"
              title="دليل استخدام البرنامج"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>ازاي أستخدم البرنامج؟</span>
            </button>

            <button
              onClick={onOpenBrandGuide}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-cyan-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition"
              title="دليل هوية معامل RT"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>هوية المعمل</span>
            </button>

            <a
              href="https://wa.me/201000000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D8%B9%D8%A7%D9%85%D9%84%20RT%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B9%D8%B1%D8%B6%20%D8%A7%D9%84%D9%8A%D9%88%D9%85%20%D8%A7%D9%84%D9%88%D8%A7%D8%AD%D8%AF%20%D8%AE%D8%B5%D9%85%2070%25"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">واتساب المعمل</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-300 shadow-md shadow-cyan-500/20 transition active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>حجز سحب منزلي</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
