import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface HomeVisitBookingProps {
  isOpen: boolean;
  onClose: () => void;
  initialTests?: string[];
}

export const HomeVisitBooking: React.FC<HomeVisitBookingProps> = ({
  isOpen,
  onClose,
  initialTests = []
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('القاهرة / الجيزة');
  const [preferredTime, setPreferredTime] = useState('صباحاً (من 8 ص إلى 12 ظ)');
  const [testsText, setTestsText] = useState(
    initialTests.length > 0 ? initialTests.join('، ') : 'باقة الفحص الشامل الماسي (خصم 70%)'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare message for WhatsApp
    const message = `🩺 *طلب حجز سحب عينات منزلي - عرض اليوم الواحد (خصم 70%)*
معامل RT للتحاليل الطبية
--------------------------
👤 *اسم العميل:* ${patientName}
📞 *رقم الهاتف:* ${phone}
📍 *المنطقة:* ${area}
🏠 *العنوان:* ${address}
⏰ *الميعاد المفضل:* ${preferredTime}
🧪 *التحاليل المطلوبة:* ${testsText}
${notes ? `📝 *ملاحظات إضافية:* ${notes}` : ''}
--------------------------
⚡ *تأكيد العرض:* الاستفادة من خصم 70% لعرض اليوم الواحد وسحب العينات مجاناً من المنزل.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201000000000?text=${encoded}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative max-w-xl w-full bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                حجز سحب عينات منزلي فوري
              </h3>
              <span className="text-xs text-amber-400 font-semibold">
                مشمول في عرض اليوم الواحد (خصم 70% + خدمة سحب مجانية)
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

        {/* Content / Form */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-white">
                تم تحويل طلبك لخدمة عملاء معامل RT بنجاح!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                تم فتح تطبيق الواتساب لإرسال بيانات الحجز مباشرة لفريق التمريض الطبي. سيتواصل معك ممثل المعمل فوراً لتأكيد الموعد والعنوان.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                إغلاق النافذة
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  أطقم تمريض معقمة ومدربة على سحب العينات للأطفال والكبار بدون ألم وبأعلى معايير السلامة.
                </span>
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>اسم المريض أو المتصل *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="الاسم ثلاثي..."
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>رقم الهاتف / الواتساب *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Area & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>المنطقة / المحافظة *</span>
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="القاهرة / مصر الجديدة ومدينة نصر">القاهرة (مصر الجديدة ومدينة نصر)</option>
                    <option value="القاهرة / التجمع والمعادي">القاهرة (التجمع والمعادي ووسط البلد)</option>
                    <option value="الجيزة / الدقي والمهندسين وأكتوبر">الجيزة (الدقي والمهندسين وأكتوبر)</option>
                    <option value="الإسكندرية">الإسكندرية (كافة المناطق)</option>
                    <option value="محافظة أخرى">محافظة أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>الموعد المفضل للزيارة</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="صباحاً (من 8 ص إلى 12 ظ)">صباحاً (من 8 ص إلى 12 ظ) - يفضل للصيام</option>
                    <option value="ظهراً (من 12 ظ إلى 4 م)">ظهراً (من 12 ظ إلى 4 م)</option>
                    <option value="مساءً (من 4 م إلى 9 م)">مساءً (من 4 م إلى 9 م)</option>
                    <option value="أقرب موعد متاح اليوم (عرض اليوم)">أقرب موعد متاح اليوم (عرض اليوم)</option>
                  </select>
                </div>
              </div>

              {/* Detailed Address */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">العنوان بالتفصيل ورقم العمارة والشقة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شارع التحرير، عمارة 12، الدور الرابع، شقة 8..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Tests requested */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">التحاليل المطلوبة (مشمولة بخصم 70%)</label>
                <input
                  type="text"
                  value={testsText}
                  onChange={(e) => setTestsText(e.target.value)}
                  placeholder="مثال: فحص شامل، فيتامين د، سكر تراكمي..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>تأكيد الحجز الفوري عبر واتساب معامل RT</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
