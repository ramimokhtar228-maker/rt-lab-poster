import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenBrandGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenBrandGuide }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-black font-mono">
                RT
              </div>
              <span className="text-base font-black text-white">
                معامل <span className="text-cyan-400">RT</span> للتحاليل
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              صرح طبي معتمد يقدم أدق الفحوصات والتحاليل المعملية بأحدث تقنيات التشخيص الآلي مع خدمة سحب العينات المجانية من المنزل.
            </p>
            <div className="text-[11px] text-amber-400 font-bold">
              ⚡ عرض اليوم الواحد - خصم 70% على جميع التحاليل الطبية.
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="#posters-section" className="hover:text-cyan-400 transition">
                  البوسترات الرسمية (1:1 / 9:16 / 16:9)
                </a>
              </li>
              <li>
                <a href="#customizer-section" className="hover:text-cyan-400 transition">
                  استوديو تخصيص وتعديل البوستر
                </a>
              </li>
              <li>
                <a href="#calculator-section" className="hover:text-cyan-400 transition">
                  حاسبة الخصم وقائمة التحاليل
                </a>
              </li>
              <li>
                <a href="#captions-section" className="hover:text-cyan-400 transition">
                  نصوص وحملات السوشيال ميديا
                </a>
              </li>
              <li>
                <button onClick={onOpenBrandGuide} className="hover:text-cyan-400 transition text-right">
                  دليل هوية معامل RT والألوان
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Branches */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              الفروع وسحب العينات
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>• فرع مصر الجديدة ومدينة نصر</li>
              <li>• فرع المعادي والتجمع</li>
              <li>• فرع الدقي والمهندسين والجيزة</li>
              <li>• فرع الإسكندرية</li>
              <li className="pt-1 text-cyan-300 font-semibold">
                🚗 تغطية شاملة لسحب العينات من المنزل
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hotline */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              خدمة العملاء والحجز
            </h4>
            <div className="space-y-2 text-[11px]">
              <a
                href="tel:01000000000"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>الخط الساخن: 01000000000</span>
              </a>

              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>واتساب الحجز السريع: 01000000000</span>
              </a>

              <a
                href="mailto:rtlabrami@gmail.com"
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>rtlabrami@gmail.com</span>
              </a>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/60 font-bold text-xs transition"
            >
              طلب سحب عينات من المنزل
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} معامل RT للتحاليل الطبية (RT Medical Laboratories).
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>دقة تثق بها، لرعاية تستحقها</span>
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
