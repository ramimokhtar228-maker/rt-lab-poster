import React from 'react';
import { 
  X, 
  HelpCircle, 
  Download, 
  Sliders, 
  Calculator, 
  Share2, 
  Calendar, 
  PhoneCall, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSection
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: '1',
      title: 'تحميل البوسترات الإعلانية الرسمية (HD)',
      desc: 'انزل لقسم "البوسترات الرسمية"، ستجد 3 مقاسات مصممة بأعلى جودة (مربع 1:1 للفيسبوك والإنستغرام، رأسي 9:16 للستوري والتيك توك، وعريض 16:9 للبانر). اضغط على زر "تحميل البوستر" لحفظ الصورة فوراً بجودة فائقة على جهازك.',
      icon: <Download className="w-5 h-5 text-cyan-400" />,
      actionText: 'انتقل للبوسترات',
      sectionId: 'posters-section'
    },
    {
      step: '2',
      title: 'تخصيص البوستر بأرقام فرعك (استوديو المونتاج)',
      desc: 'إذا أردت وضع رقم هاتفك أو اسم فرع محدد (مثل فرع مدينة نصر، المعادي، أو رقم تليفونك الخاص)، انتقل لقسم "استوديو التخصيص". اكتب بياناتك وسيتم تحديث البوستر فورياً أمامك، ثم اضغط "تصدير البوستر (PNG HD)".',
      icon: <Sliders className="w-5 h-5 text-amber-400" />,
      actionText: 'انتقل للاستوديو',
      sectionId: 'customizer-section'
    },
    {
      step: '3',
      title: 'حاسبة أسعار التحاليل بعد خصم 70%',
      desc: 'في قسم "حاسبة الأسعار"، يمكنك اختيار أي تحليل (CBC، سكر تراكمي، فيتامين د، وظائف كبد وكلى، إلخ) أو باقة شاملة، لترى السعر الأصلي والسعر بعد الخصم وقيمة التوفير بالجنيه. يمكنك أيضاً الضغط على "احجز هذا الفحص" لإرسال الحجز مباشرة.',
      icon: <Calculator className="w-5 h-5 text-emerald-400" />,
      actionText: 'انتقل للحاسبة',
      sectionId: 'calculator-section'
    },
    {
      step: '4',
      title: 'نسخ الكابشن والتسويق على السوشيال ميديا',
      desc: 'في قسم "نصوص وحملات السوشيال ميديا"، ستجد نصوصاً تسويقية مجهزة خصيصاً للفيسبوك، الإنستغرام، ورسائل الواتساب الجماعية. اضغط على "نسخ النص كاملاً" والصقه مع البوستر الذي قمت بتحميله.',
      icon: <Share2 className="w-5 h-5 text-blue-400" />,
      actionText: 'انتقل للنصوص',
      sectionId: 'captions-section'
    },
    {
      step: '5',
      title: 'حجز خدمة سحب العينات مجاناً من المنزل',
      desc: 'اضغط على زر "حجز سحب منزلي" في أعلى الصفحة أو أسفلها، وادخل اسم المريض ورقم الهاتف والعنوان. سيتم تجهيز رسالة حجز فورية على الواتساب لإرسالها لفريق التمريض.',
      icon: <Calendar className="w-5 h-5 text-purple-400" />,
      actionText: 'فتح الحجز',
      isBooking: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative max-w-2xl w-full bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                دليل استخدام برنامج معامل RT للتحاليل
              </h3>
              <span className="text-xs text-amber-400 font-semibold">
                خطوات سهلة لتحميل وتخصيص البوستر وبدء الحملة الإعلانية
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

        {/* Steps Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              تم تصميم البرنامج ليمكنك من إطلاق حملة "عرض اليوم الواحد - خصم 70%" ونشرها في دقائق معدودة!
            </span>
          </div>

          <div className="space-y-3">
            {steps.map((item) => (
              <div 
                key={item.step}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-black text-cyan-400 font-mono text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 mb-1">
                      {item.icon}
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (item.sectionId) {
                      onNavigateToSection(item.sectionId);
                    }
                  }}
                  className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-800 transition self-end sm:self-center"
                >
                  {item.actionText} ←
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>دعم فني واستفسارات: rtlabrami@gmail.com</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            فهمت، ابدأ الاستخدام الآن
          </button>
        </div>
      </div>
    </div>
  );
};
