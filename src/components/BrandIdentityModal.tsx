import React, { useState } from 'react';
import { X, ShieldCheck, Palette, Award, Check, Copy } from 'lucide-react';
import { LAB_ADVANTAGES, RT_BRANCHES } from '../data/labData';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandIdentityModal: React.FC<BrandIdentityModalProps> = ({ isOpen, onClose }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const brandColors = [
    { name: 'Cyan Medical (السيان الطبي)', hex: '#06b6d4', role: 'اللون الأساسي والرمزي لمعامل RT' },
    { name: 'Royal Navy (الكحلي الملكي)', hex: '#0f172a', role: 'خلفيات الفخامة والهيبة الطبية' },
    { name: 'Flash Gold (الذهبي الترويجي)', hex: '#f59e0b', role: 'بادج الخصم وعرض اليوم الواحد (70%)' },
    { name: 'Clinical Emerald (الأخضر العلاجي)', hex: '#10b981', role: 'تأكيدات الصحة والتوفير والواتساب' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative max-w-2xl w-full bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                دليل الهوية البصرية لمعامل RT (Brand Guidelines)
              </h3>
              <span className="text-xs text-slate-400">
                المعايير الرسمية لحملة عرض اليوم الواحد وخصم 70%
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* Logo & Slogan */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-2 flex items-center gap-1.5">
              <span>الشعار الرسمي وشعار الحملة</span>
            </h4>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-cyan-400 text-lg">RT LABS</span>
                <span className="text-slate-400">• معامل RT للتحاليل الطبية</span>
              </div>
              <p className="text-slate-300">
                <strong>رسالة الحملة:</strong> "عرض اليوم الواحد - خصم 70% على جميع التحاليل الطبية والفحوصات الشاملة"
              </p>
              <p className="text-slate-400">
                <strong>شعار الجودة:</strong> "دقة تثق بها، لرعاية تستحقها - سحب عينات مجاناً من المنزل"
              </p>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>لوحة الألوان الرسمية (Brand Colors)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {brandColors.map((color) => (
                <div 
                  key={color.hex}
                  onClick={() => copyColor(color.hex)}
                  className="cursor-pointer p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-8 h-8 rounded-xl shadow-md border border-white/20" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <span className="font-bold text-white block">{color.name}</span>
                      <span className="text-[10px] text-slate-400">{color.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                    <span>{color.hex}</span>
                    {copiedHex === color.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advantages */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>معايير الجودة والاعتمادات</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LAB_ADVANTAGES.map((adv, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <h5 className="font-bold text-cyan-400 mb-1">{adv.title}</h5>
                  <p className="text-slate-400 leading-relaxed text-[11px]">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-2">فروع معامل RT</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {RT_BRANCHES.map((b, i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                  <span className="font-bold block text-white text-[11px]">{b.name}</span>
                  <span className="text-[10px] text-slate-400">{b.address}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
