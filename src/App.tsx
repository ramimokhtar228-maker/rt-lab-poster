/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CountdownOffer } from './components/CountdownOffer';
import { PostersGallery } from './components/PostersGallery';
import { PosterCustomizer } from './components/PosterCustomizer';
import { DiscountCalculator } from './components/DiscountCalculator';
import { SocialCaptions } from './components/SocialCaptions';
import { HomeVisitBooking } from './components/HomeVisitBooking';
import { BrandIdentityModal } from './components/BrandIdentityModal';
import { UserGuideModal } from './components/UserGuideModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Flame, 
  Download, 
  Sliders, 
  Calculator, 
  Share2, 
  Calendar, 
  ShieldCheck, 
  CheckCircle, 
  CheckCircle2,
  Stethoscope, 
  Microscope,
  PhoneCall,
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBrandGuideOpen, setIsBrandGuideOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedTestsForBooking, setSelectedTestsForBooking] = useState<string[]>([]);

  const handleBookWithTests = (tests: string[]) => {
    setSelectedTestsForBooking(tests);
    setIsBookingOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-cyan-500 selection:text-white">
      {/* Top Header */}
      <Header 
        onOpenBooking={() => {
          setSelectedTestsForBooking([]);
          setIsBookingOpen(true);
        }}
        onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border border-cyan-500/20 p-6 sm:p-10 shadow-2xl">
          
          {/* Subtle lighting effects */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
            
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-gradient-to-r from-red-500/20 via-amber-500/20 to-cyan-500/20 text-amber-300 border border-amber-500/40 shadow-sm animate-pulse">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>مفاجأة معامل RT الكبرى • خصم 70% مؤكد</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight sm:leading-tight">
              بوستر وهوية معامل <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">RT</span>
              <br />
              <span className="text-amber-400">عرض اليوم الواحد - خصم 70%</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              على جميع التحاليل والفحوصات الطبية وباقات الفحص الشامل! بوسترات إعلانية احترافية بجودة فائقة جاهزة للنشر، مع استوديو لتخصيص بيانات الفرع وحاسبة أسعار فورية.
            </p>

            {/* Value Highlights Pill List */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 text-xs sm:text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>سحب العينات مجاناً من المنزل</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>نتائج سريعة عبر الواتساب معتمدة دولياً</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>أحدث أجهزة التشخيص الآلي (FDA Approved)</span>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <PWAInstallButton variant="hero" />

              <button
                onClick={() => setIsGuideOpen(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition active:scale-95"
              >
                <HelpCircle className="w-4 h-4" />
                <span>دليل الاستخدام</span>
              </button>

              <a
                href="#posters-section"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-400 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>تحميل البوسترات الجاهزة (HD)</span>
              </a>

              <a
                href="#customizer-section"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-cyan-500/50 font-bold text-xs sm:text-sm transition active:scale-95"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>تخصيص البوستر بأرقام فرعك</span>
              </a>

              <a
                href="#calculator-section"
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-semibold text-xs sm:text-sm transition"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>حاسبة أسعار العرض</span>
              </a>
            </div>

          </div>
        </div>

        {/* Live Countdown Timer for "عرض اليوم الواحد" */}
        <CountdownOffer />

        {/* Section 1: Official High-Resolution Posters Gallery (1:1, 9:16, 16:9) */}
        <PostersGallery />

        {/* Section 2: Interactive Poster Customizer & Canvas Studio */}
        <PosterCustomizer />

        {/* Section 3: Medical Tests & 70% Discount Price Calculator */}
        <DiscountCalculator onBookWithTests={handleBookWithTests} />

        {/* Section 4: Social Media Ready Captions (Facebook, Instagram, WhatsApp) */}
        <SocialCaptions />

        {/* Home Sample Booking CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border border-emerald-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-right">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
              🚗 خدمة التمريض المنزلي المجاني
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              مش قادر تنزل المعمل؟ فريق معامل <span className="text-cyan-400">RT</span> يجيلك لحد البيت مجاناً!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              سحب عينات معقم وسريع لجميع أفراد الأسرة مع تطبيق خصم 70% لعرض اليوم الواحد بدون أي مصاريف انتقال إضافية.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setSelectedTestsForBooking([]);
                setIsBookingOpen(true);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>طلب زيارة منزلية الآن</span>
            </button>

            <a
              href="https://wa.me/201000000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D8%B9%D8%A7%D9%85%D9%84%20RT%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D8%B3%D8%AD%D8%A8%20%D8%B9%D9%8A%D9%86%D8%A7%D8%AA%20%D9%85%D9%86%D8%B2%D9%84%D9%8A%20%D8%B6%D9%85%D9%86%20%D8%B9%D8%B1%D8%B6%20%D8%A7%D9%84%D9%8A%D9%88%D9%85%20%D8%A7%D9%84%D9%88%D8%A7%D8%AD%D8%AF%20%D8%AE%D8%B5%D9%85%2070%25"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 text-slate-200 hover:text-white border border-slate-700 hover:bg-slate-800 font-bold text-sm transition"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>
        </div>

        {/* Mobile App Download Card */}
        <div className="rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-right">
            <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 text-white font-mono font-black text-2xl shadow-lg shadow-purple-500/20 shrink-0">
              RT
            </div>
            <div className="space-y-1">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 inline-block">
                📲 تطبيق الهاتف المحمول (PWA)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                نزّل تطبيق معامل <span className="text-cyan-400">RT</span> مباشرة على هاتفك الآن
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                يعمل كتطبيق أصلي على شاشة هاتفك (Android & iPhone) بدون الحاجة للدخول للمتصفح، وبسرعة فائقة لمتابعة العروض وحجز الفحوصات.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <PWAInstallButton variant="banner" />
          </div>
        </div>

      </main>

      {/* Offline Connectivity Toast Indicator */}
      <OfflineIndicator />

      {/* Modals */}
      <UserGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigateToSection={scrollToSection}
      />

      <HomeVisitBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTests={selectedTestsForBooking}
      />

      <BrandIdentityModal
        isOpen={isBrandGuideOpen}
        onClose={() => setIsBrandGuideOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenBooking={() => {
          setSelectedTestsForBooking([]);
          setIsBookingOpen(true);
        }}
        onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
      />
    </div>
  );
}
