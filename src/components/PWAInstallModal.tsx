import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  Share, 
  PlusSquare, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft,
  Apple,
  Chrome,
  Copy,
  Check,
  QrCode,
  ExternalLink
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  onNativeInstall: () => void;
  initialTab?: 'android' | 'ios';
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  onNativeInstall,
  initialTab = 'android'
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>(initialTab);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-yz4aqysh3imedtom7tyblr-928451427848.europe-west2.run.app';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}&color=06b6d4&bgcolor=020617`;

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative max-w-lg w-full bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-black font-mono shadow-md shadow-cyan-500/20">
              RT
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                تنزيل تطبيق معامل RT على الموبايل
              </h3>
              <span className="text-xs text-cyan-400 font-semibold">
                تطبيق خفيف وسريع يعمل بدون متجر وبشاشة كاملة
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

        {/* Direct Link & QR Code Box */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>رابط التطبيق المباشر للهاتف:</span>
            </span>
            <button
              onClick={copyUrl}
              className="flex items-center gap-1 text-[11px] font-bold text-cyan-300 hover:text-white bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800 transition"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الرابط</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
            {/* Small QR thumbnail */}
            <div className="w-16 h-16 rounded-lg bg-slate-950 border border-cyan-500/30 p-1 shrink-0 flex items-center justify-center">
              <img
                src={qrUrl}
                alt="QR Code"
                className="w-full h-full object-contain rounded"
              />
            </div>
            
            <div className="min-w-0 flex-1">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-cyan-300 font-mono truncate select-all focus:outline-none"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                افتح هذا الرابط في متصفح هاتفك (Chrome أو Safari) ثم اتبع الخطوات أدناه لتثبيته.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'android'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Chrome className="w-4 h-4" />
            <span>هواتف أندرويد (Android)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'ios'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>هواتف آيفون (iPhone / iOS)</span>
          </button>
        </div>

        {/* Body Instructions */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Direct Install Button if supported by browser */}
          {isInstallable && (
            <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/50 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>متصفحك يدعم التثبيت الفوري بنقرة واحدة!</span>
              </div>
              <p className="text-slate-300">
                اضغط على الزر أدناه لتثبيت أيقونة التطبيق مباشرة على شاشة هاتفك الرئيسية:
              </p>
              <button
                type="button"
                onClick={() => {
                  onNativeInstall();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>تثبيت التطبيق الآن على الهاتف</span>
              </button>
            </div>
          )}

          {/* Android Steps */}
          {activeTab === 'android' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <span>خطوات التثبيت على أندرويد (Google Chrome):</span>
              </h4>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-white block">افتح قائمة المتصفح</span>
                    <span className="text-slate-400">
                      اضغط على زر النقاط الثلاث <strong>(⋮)</strong> الموجود في أعلى زاوية المتصفح.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-white block">اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"</span>
                    <span className="text-slate-400">
                      ابحث في القائمة عن خيار <strong>تثبيت التطبيق (Install app)</strong> أو <strong>إضافة إلى الشاشة الرئيسية (Add to Home screen)</strong>.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-white block">تأكيد التثبيت</span>
                    <span className="text-slate-400">
                      اضغط <strong>"تثبيت" (Install)</strong>، وسيظهر تطبيق "معامل RT" بأيقونته الرسمية على شاشة هاتفك فوراً!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* iOS Steps */}
          {activeTab === 'ios' && (
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <span>خطوات التثبيت على آيفون (Safari):</span>
              </h4>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-white block">اضغط على زر المشاركة (Share)</span>
                    <span className="text-slate-400">
                      في أسفل متصفح Safari، اضغط على أيقونة المشاركة مربع به سهم للأعلى <strong>(⎋ Share)</strong>.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-white block">اختر "إضافة إلى الشاشة الرئيسية"</span>
                    <span className="text-slate-400">
                      انزل لأسفل القائمة واضغط على خيار <strong>"إضافة إلى الشاشة الرئيسية" (Add to Home Screen ➕)</strong>.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-white block">اضغط على "إضافة" (Add)</span>
                    <span className="text-slate-400">
                      اضغط على كلمة <strong>إضافة (Add)</strong> في أعلى اليمين. سيصبح التطبيق متاحاً على شاشتك الرئيسية ويعمل بشاشة كاملة تماماً كتطبيقات الآب ستور!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advantages of PWA */}
          <div className="pt-2 border-t border-slate-800">
            <h5 className="font-bold text-slate-300 mb-2">مميزات تنزيل التطبيق على هاتفك:</h5>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>حجم خفيف جداً ولا يستهلك مساحة</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>يعمل بشاشة كاملة وبسرعة فائقة</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>الوصول للبوسترات والأسعار بضغطة زر</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>حجز سحب منزلي سريع عبر الواتساب</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">تطبيق ويب تقدمي معتمد (Progressive Web App)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
