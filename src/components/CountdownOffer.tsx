import React, { useState, useEffect } from 'react';
import { Clock, Flame, Zap, ShieldAlert } from 'lucide-react';

export const CountdownOffer: React.FC = () => {
  // Calculate remaining time till end of today (midnight)
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const diff = endOfDay.getTime() - now.getTime();

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, progress: 100 };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const totalSecondsInDay = 24 * 3600;
    const elapsedSeconds = totalSecondsInDay - Math.floor(diff / 1000);
    const progress = Math.min(100, Math.max(0, (elapsedSeconds / totalSecondsInDay) * 100));

    return { hours, minutes, seconds, progress };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/70 to-slate-900 border border-cyan-500/30 p-4 sm:p-6 shadow-xl shadow-cyan-950/50">
      {/* Background glow & accents */}
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Offer Title & Details */}
        <div className="flex items-center gap-4 text-center md:text-right">
          <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 shrink-0">
            <Flame className="w-8 h-8 animate-bounce" />
          </div>

          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                عرض اليوم الواحد (Flash Deal)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                خصم 70% مؤكد
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ينتهي عرض معامل <span className="text-cyan-400">RT</span> الحصري خلال:
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              سارع بحجز تحاليلك اليوم أو حجز الزيارة المنزلية قبل انتهاء مهلة العرض!
            </p>
          </div>
        </div>

        {/* Countdown Digits */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-slate-950/90 border border-cyan-500/40 flex items-center justify-center shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                {formatNumber(timeLeft.hours)}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1">ساعة</span>
          </div>

          <span className="text-2xl font-black text-cyan-400/80 -mt-5">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-slate-950/90 border border-cyan-500/40 flex items-center justify-center shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                {formatNumber(timeLeft.minutes)}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 mt-1">دقيقة</span>
          </div>

          <span className="text-2xl font-black text-cyan-400/80 -mt-5">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-slate-950/90 border border-amber-500/50 flex items-center justify-center shadow-inner bg-amber-950/20">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono animate-pulse">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-amber-400/80 mt-1">ثانية</span>
          </div>
        </div>

      </div>

      {/* Expiry Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Clock className="w-3.5 h-3.5" />
          <span>ينتهي العرض عند منتصف الليل تماماً (11:59 م)</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-amber-300/80">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>ساري على جميع الفروع والزيارات المنزلية</span>
        </div>
      </div>
    </div>
  );
};
