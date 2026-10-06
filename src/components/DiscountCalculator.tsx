import React, { useState } from 'react';
import { MEDICAL_TESTS, TEST_PACKAGES } from '../data/labData';
import { MedicalTest, TestPackage } from '../types';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  Percent, 
  Tag, 
  Calendar, 
  Info,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface DiscountCalculatorProps {
  onBookWithTests: (testNames: string[]) => void;
}

export const DiscountCalculator: React.FC<DiscountCalculatorProps> = ({ onBookWithTests }) => {
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>(['cbc', 'vit-d', 'hba1c']);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle individual test
  const toggleTest = (id: string) => {
    if (selectedTestIds.includes(id)) {
      setSelectedTestIds(selectedTestIds.filter(t => t !== id));
    } else {
      setSelectedTestIds([...selectedTestIds, id]);
    }
  };

  // Toggle package
  const togglePackage = (pkgId: string) => {
    if (selectedPackageId === pkgId) {
      setSelectedPackageId(null);
    } else {
      setSelectedPackageId(pkgId);
    }
  };

  // Calculate totals
  const selectedTests = MEDICAL_TESTS.filter(t => selectedTestIds.includes(t.id));
  const activePackage = TEST_PACKAGES.find(p => p.id === selectedPackageId);

  const testsOriginalTotal = selectedTests.reduce((sum, t) => sum + t.originalPrice, 0);
  const testsDiscountedTotal = selectedTests.reduce((sum, t) => sum + t.discountedPrice, 0);

  const packageOriginal = activePackage ? activePackage.originalPrice : 0;
  const packageDiscounted = activePackage ? activePackage.discountedPrice : 0;

  const totalOriginal = testsOriginalTotal + packageOriginal;
  const totalDiscounted = testsDiscountedTotal + packageDiscounted;
  const totalSavings = totalOriginal - totalDiscounted;
  const effectiveDiscountRate = totalOriginal > 0 ? Math.round((totalSavings / totalOriginal) * 100) : 70;

  const handleBookNow = () => {
    const names: string[] = [];
    if (activePackage) {
      names.push(activePackage.titleAr);
    }
    selectedTests.forEach(t => names.push(t.nameAr));
    onBookWithTests(names);
  };

  const filteredTests = MEDICAL_TESTS.filter(t => 
    t.nameAr.includes(searchTerm) || 
    t.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.includes(searchTerm)
  );

  return (
    <section id="calculator-section" className="py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-900/40 text-cyan-300 border border-cyan-700/50 mb-2">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>حاسبة أسعار وتوفير عرض اليوم الواحد</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              احسب قيمة توفيرك مع خصم <span className="text-cyan-400">70%</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              اختر الفحوصات الطبية أو الباقات الشاملة وشاهد السعر قبل وبعد الخصم مباشرة ومقدار التوفير بالجنيه.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">العرض يشمل:</span>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600/20 text-red-400 border border-red-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              خصم فوري 70% اليوم فقط
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tests List & Packages Selector (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Packages Highlight */}
            <div>
              <h3 className="text-sm font-black text-slate-200 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>باقات الفحص الشامل الموفرة (خصم 70% فوري):</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TEST_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => togglePackage(pkg.id)}
                      className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      {pkg.badge && (
                        <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-red-500 text-slate-950">
                          {pkg.badge}
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h4 className="font-bold text-white text-xs leading-snug">
                            {pkg.titleAr}
                          </h4>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <span className="text-[11px] text-cyan-400 font-semibold block mb-2">
                          يشمل {pkg.testsCount} تحليلاً طبياً
                        </span>

                        <ul className="space-y-1 mb-3">
                          {pkg.testsIncluded.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="text-[11px] text-slate-400 flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0"></span>
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                          {pkg.testsIncluded.length > 3 && (
                            <li className="text-[10px] text-slate-500 font-semibold">
                              + المزيد من الفحوصات...
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Pricing */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-slate-500 line-through ml-1.5">
                            {pkg.originalPrice} ج.م
                          </span>
                          <span className="text-base font-black text-amber-400">
                            {pkg.discountedPrice} ج.م
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                          وفر {pkg.originalPrice - pkg.discountedPrice} ج
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Tests Selection */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <h3 className="text-sm font-black text-slate-200 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-cyan-400" />
                  <span>التحاليل الفردية المشمولة بالعرض (خصم 70%):</span>
                </h3>

                <input
                  type="text"
                  placeholder="ابحث عن تحليل (مثل: CBC، كبد، فيتامين د)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 sm:w-64"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
                {filteredTests.map((test) => {
                  const isChecked = selectedTestIds.includes(test.id);
                  return (
                    <div
                      key={test.id}
                      onClick={() => toggleTest(test.id)}
                      className={`cursor-pointer rounded-xl p-3 border transition flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-cyan-950/40 border-cyan-500/60 shadow-sm'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700 bg-slate-950'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {test.nameAr}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                            <span className="text-cyan-400/90">{test.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-2.5 h-2.5" />
                              {test.turnaroundTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left shrink-0">
                        <span className="text-[10px] text-slate-500 line-through block">
                          {test.originalPrice} ج.م
                        </span>
                        <span className="text-xs font-black text-amber-400">
                          {test.discountedPrice} ج.م
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bill Summary / Cart Panel (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-cyan-500/30 p-6 shadow-2xl space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <span>ملخص الفاتورة</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  عرض اليوم
                </span>
              </h3>
              
              {(selectedTests.length > 0 || activePackage) && (
                <button
                  onClick={() => {
                    setSelectedTestIds([]);
                    setSelectedPackageId(null);
                  }}
                  className="text-[11px] text-slate-400 hover:text-red-400 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>تفريغ</span>
                </button>
              )}
            </div>

            {/* Selected Items List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {activePackage && (
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
                  <div className="truncate font-semibold text-cyan-300">
                    📦 {activePackage.titleAr}
                  </div>
                  <span className="font-bold text-amber-400 shrink-0 mr-2">
                    {activePackage.discountedPrice} ج.م
                  </span>
                </div>
              )}

              {selectedTests.map(t => (
                <div key={t.id} className="flex items-center justify-between py-1 px-2 text-slate-300">
                  <span className="truncate">{t.nameAr}</span>
                  <div className="shrink-0 flex items-center gap-2 mr-2">
                    <span className="text-[10px] text-slate-500 line-through">{t.originalPrice}</span>
                    <span className="font-bold text-amber-400">{t.discountedPrice} ج.م</span>
                  </div>
                </div>
              ))}

              {!activePackage && selectedTests.length === 0 && (
                <div className="text-center py-6 text-slate-500">
                  قم باختيار باقة أو تحاليل طبية لحساب الخصم الفوري
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>السعر الأصلي الإجمالي:</span>
                <span className="line-through font-mono">{totalOriginal} ج.م</span>
              </div>

              <div className="flex items-center justify-between text-emerald-400 font-bold bg-emerald-950/30 p-2 rounded-xl border border-emerald-900/40">
                <span>إجمالي توفيرك (خصم {effectiveDiscountRate}%):</span>
                <span className="font-mono text-sm">وفرت {totalSavings} ج.م 🔥</span>
              </div>

              <div className="flex items-center justify-between text-white font-extrabold text-base pt-2">
                <span>المطلوب بعد الخصم:</span>
                <span className="text-2xl font-black text-cyan-400 font-mono">
                  {totalDiscounted} <span className="text-sm font-normal text-slate-300">ج.م</span>
                </span>
              </div>
            </div>

            {/* Perks included */}
            <div className="space-y-1.5 text-[11px] text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>سحب العينات مجاناً من المنزل لجميع الفحوصات</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>النتائج معتمدة وموثقة برمز QR رسمي</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleBookNow}
              disabled={totalOriginal === 0}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              <Calendar className="w-4 h-4" />
              <span>احجز هذا الفحص في عرض اليوم</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
