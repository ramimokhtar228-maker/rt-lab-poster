import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sliders, 
  Download, 
  RefreshCw, 
  Sparkles, 
  Palette, 
  Phone, 
  MapPin, 
  Check, 
  Layers, 
  Type, 
  ShieldCheck, 
  Image as ImageIcon 
} from 'lucide-react';
import { POSTER_IMAGES } from '../data/labData';

export const PosterCustomizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Form State
  const [labName, setLabName] = useState('معامل RT للتحاليل الطبية');
  const [subTitle, setSubTitle] = useState('RT Clinical Laboratories');
  const [offerBadge, setOfferBadge] = useState('عرض اليوم الواحد');
  const [discountPercent, setDiscountPercent] = useState('70%');
  const [offerScope, setOfferScope] = useState('على جميع التحاليل الطبية والفحوصات');
  const [hotline, setHotline] = useState('01000000000');
  const [branch, setBranch] = useState('جميع الفروع + خدمة السحب المنزلي');
  const [featuredTests, setFeaturedTests] = useState('شامل • وظائف كبد وكلى • سكر تراكمي • فيتامين د • CBC');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('1:1');
  const [themeColor, setThemeColor] = useState<'cyan' | 'navy' | 'emerald' | 'gold'>('cyan');
  const [useAiBg, setUseAiBg] = useState(true);
  const [selectedBgIndex, setSelectedBgIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Canvas dimensions based on aspect ratio
  const getCanvasDimensions = useCallback(() => {
    switch (aspectRatio) {
      case '9:16':
        return { width: 1080, height: 1920, previewW: 360, previewH: 640 };
      case '16:9':
        return { width: 1920, height: 1080, previewW: 640, previewH: 360 };
      case '1:1':
      default:
        return { width: 1080, height: 1080, previewW: 540, previewH: 540 };
    }
  }, [aspectRatio]);

  // Redraw canvas whenever parameters change
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = getCanvasDimensions();
    canvas.width = width;
    canvas.height = height;

    // Theme color palette
    const colors = {
      cyan: {
        primary: '#06b6d4',
        secondary: '#0284c7',
        bgDark: '#030712',
        bgMid: '#082f49',
        accent: '#f59e0b',
        gold: '#fbbf24',
        text: '#ffffff',
      },
      navy: {
        primary: '#38bdf8',
        secondary: '#1d4ed8',
        bgDark: '#020617',
        bgMid: '#0f172a',
        accent: '#ef4444',
        gold: '#eab308',
        text: '#ffffff',
      },
      emerald: {
        primary: '#10b981',
        secondary: '#059669',
        bgDark: '#022c22',
        bgMid: '#064e3b',
        accent: '#f59e0b',
        gold: '#34d399',
        text: '#ffffff',
      },
      gold: {
        primary: '#f59e0b',
        secondary: '#d97706',
        bgDark: '#1c1917',
        bgMid: '#292524',
        accent: '#06b6d4',
        gold: '#fcd34d',
        text: '#ffffff',
      }
    }[themeColor];

    const drawPosterContent = () => {
      // 1. Dark background base
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, colors.bgDark);
      bgGrad.addColorStop(0.5, colors.bgMid);
      bgGrad.addColorStop(1, colors.bgDark);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Decorative medical grid and circles
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Glow orbs
      const radGlow1 = ctx.createRadialGradient(width * 0.85, height * 0.15, 10, width * 0.85, height * 0.15, width * 0.45);
      radGlow1.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      radGlow1.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = radGlow1;
      ctx.fillRect(0, 0, width, height);

      const radGlow2 = ctx.createRadialGradient(width * 0.2, height * 0.8, 10, width * 0.2, height * 0.8, width * 0.4);
      radGlow2.addColorStop(0, 'rgba(239, 68, 68, 0.2)');
      radGlow2.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = radGlow2;
      ctx.fillRect(0, 0, width, height);

      // Top Header Bar
      const padX = width * 0.07;
      let curY = height * 0.08;

      // RT Brand Pill
      const pillW = 120;
      const pillH = 120;
      const pillX = width - padX - pillW;

      ctx.save();
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 25;
      const pillGrad = ctx.createLinearGradient(pillX, curY, pillX + pillW, curY + pillH);
      pillGrad.addColorStop(0, colors.primary);
      pillGrad.addColorStop(1, colors.secondary);
      ctx.fillStyle = pillGrad;
      ctx.beginPath();
      ctx.roundRect(pillX, curY, pillW, pillH, 24);
      ctx.fill();
      ctx.restore();

      // RT Text inside logo box
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 52px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('RT', pillX + (pillW / 2), curY + (pillH / 2) - 4);
      ctx.font = '700 16px system-ui, sans-serif';
      ctx.fillText('LABS', pillX + (pillW / 2), curY + (pillH / 2) + 26);

      // Brand Text next to logo
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px "Cairo", system-ui, sans-serif';
      ctx.fillText(labName, pillX - 30, curY + 48);

      ctx.fillStyle = colors.primary;
      ctx.font = '600 22px system-ui, sans-serif';
      ctx.fillText(subTitle, pillX - 30, curY + 86);

      // Flash Sale Badge (Center / Top right area)
      curY += 160;

      // Offer Pill
      const badgeText = `⚡ ${offerBadge} ⚡`;
      ctx.font = 'bold 30px "Cairo", system-ui, sans-serif';
      const badgeMetrics = ctx.measureText(badgeText);
      const bW = badgeMetrics.width + 60;
      const bH = 58;
      const bX = (width - bW) / 2;

      ctx.save();
      ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(bX, curY, bW, bH, 29);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#fef08a';
      ctx.textAlign = 'center';
      ctx.fillText(badgeText, width / 2, curY + 39);

      // Mega Discount Block (خصم 70%)
      curY += 100;

      // Big Discount Percent
      ctx.save();
      ctx.shadowColor = colors.accent;
      ctx.shadowBlur = 40;
      const discGrad = ctx.createLinearGradient(0, curY, 0, curY + 160);
      discGrad.addColorStop(0, '#ffffff');
      discGrad.addColorStop(0.5, '#fef08a');
      discGrad.addColorStop(1, '#f59e0b');
      ctx.fillStyle = discGrad;
      ctx.font = '900 135px "Cairo", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`خصم ${discountPercent}`, width / 2, curY + 110);
      ctx.restore();

      // Offer Scope Text ("على جميع التحاليل الطبية")
      curY += 150;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px "Cairo", system-ui, sans-serif';
      ctx.fillText(offerScope, width / 2, curY);

      // Sub-banner for Medical Trust
      curY += 45;
      ctx.fillStyle = colors.primary;
      ctx.font = '600 24px "Cairo", system-ui, sans-serif';
      ctx.fillText('بأحدث الأجهزة الأوتوماتيكية وبإشراف نخبة من أساتذة التحاليل الطبية', width / 2, curY);

      // Featured Tests Card
      curY += 60;
      const cardW = width - (padX * 2);
      const cardH = 130;
      const cardX = padX;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cardX, curY, cardW, cardH, 24);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 20px "Cairo", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('تشمل باقة الفحوصات الأكثر طلباً:', width / 2, curY + 42);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 23px "Cairo", system-ui, sans-serif';
      ctx.fillText(featuredTests, width / 2, curY + 84);

      // Perks Highlights Row (سحب منزلي مجاني • نتائج فورية • دقة معتمدة)
      curY += cardH + 40;
      const perkCols = [
        '🚗 سحب العينات مجاناً من المنزل',
        '📲 استلام النتائج عبر الواتساب',
        '🔬 دقة متناهية واعتماد ISO'
      ];
      const colWidth = cardW / 3;

      perkCols.forEach((perk, i) => {
        const pX = cardX + (i * colWidth) + (colWidth / 2);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 20px "Cairo", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(perk, pX, curY);
      });

      // Bottom Contact & Hotline Footer
      const footerH = 150;
      const footerY = height - footerH;

      ctx.fillStyle = 'rgba(2, 6, 23, 0.95)';
      ctx.fillRect(0, footerY, width, footerH);

      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, footerY);
      ctx.lineTo(width, footerY);
      ctx.stroke();

      // Hotline on left, Branches on right
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.font = 'bold 22px "Cairo", system-ui, sans-serif';
      ctx.fillText('📞 الخط الساخن والواتساب:', padX, footerY + 55);

      ctx.fillStyle = colors.gold;
      ctx.font = '900 36px monospace, sans-serif';
      ctx.fillText(hotline, padX, footerY + 105);

      // Branches Info on Right
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Cairo", system-ui, sans-serif';
      ctx.fillText('📍 الفروع المعتمدة:', width - padX, footerY + 55);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 20px "Cairo", system-ui, sans-serif';
      ctx.fillText(branch, width - padX, footerY + 98);
    };

    // If useAiBg is checked, load the AI image first, then paint vector elements or overlay
    if (useAiBg && POSTER_IMAGES[selectedBgIndex]) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = POSTER_IMAGES[selectedBgIndex].imagePath;
      img.onload = () => {
        // Draw background image scaled to cover canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Add semi-transparent gradient overlay to ensure customized text stays ultra readable
        const overlayGrad = ctx.createLinearGradient(0, 0, 0, height);
        overlayGrad.addColorStop(0, 'rgba(2, 6, 23, 0.35)');
        overlayGrad.addColorStop(0.4, 'rgba(2, 6, 23, 0.15)');
        overlayGrad.addColorStop(0.7, 'rgba(2, 6, 23, 0.45)');
        overlayGrad.addColorStop(1, 'rgba(2, 6, 23, 0.85)');
        ctx.fillStyle = overlayGrad;
        ctx.fillRect(0, 0, width, height);

        // Draw customized bottom banner & contact card
        const bottomH = height * 0.16;
        const bottomY = height - bottomH;

        ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
        ctx.fillRect(0, bottomY, width, bottomH);

        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, bottomY);
        ctx.lineTo(width, bottomY);
        ctx.stroke();

        const padX = width * 0.06;

        // Custom Branch & Hotline
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px "Cairo", system-ui, sans-serif';
        ctx.fillText(labName + ' • ' + offerBadge, width - padX, bottomY + 55);

        ctx.fillStyle = '#38bdf8';
        ctx.font = '600 20px "Cairo", system-ui, sans-serif';
        ctx.fillText(`📍 ${branch} | سحب عينات مجاني منزلياً`, width - padX, bottomY + 98);

        // Hotline
        ctx.textAlign = 'left';
        ctx.fillStyle = '#f59e0b';
        ctx.font = '900 36px monospace, sans-serif';
        ctx.fillText(`📞 ${hotline}`, padX, bottomY + 65);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 18px "Cairo", system-ui, sans-serif';
        ctx.fillText('حجز فوري ونتائج على الواتساب', padX, bottomY + 100);
      };
      img.onerror = () => {
        // Fallback to pure vector canvas
        drawPosterContent();
      };
    } else {
      drawPosterContent();
    }

  }, [
    labName,
    subTitle,
    offerBadge,
    discountPercent,
    offerScope,
    hotline,
    branch,
    featuredTests,
    aspectRatio,
    themeColor,
    useAiBg,
    selectedBgIndex,
    getCanvasDimensions
  ]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Export Poster Image
  const handleExport = (format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    try {
      const mime = format === 'png' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mime, 0.95);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `RT_Labs_Custom_Poster_${aspectRatio.replace(':', 'x')}_${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="customizer-section" className="py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>استوديو التخصيص والمونتاج الفوري</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              خصص بوستر معامل <span className="text-cyan-400">RT</span> بأرقامك وفروعك
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              يمكنك كتابة بيانات فرعك، أرقام الواتساب، والتحاليل المراد إبرازها وتصدير بوستر جاهز للنشر فوراً بأعلى جودة.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <button
            onClick={() => {
              setLabName('معامل RT للتحاليل الطبية');
              setOfferBadge('عرض اليوم الواحد');
              setDiscountPercent('70%');
              setOfferScope('على جميع التحاليل الطبية والفحوصات');
              setHotline('01000000000');
              setBranch('جميع الفروع + خدمة السحب المنزلي');
              setThemeColor('cyan');
              renderCanvas();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>استعادة البيانات الافتراضية</span>
          </button>
        </div>

        {/* Studio Workspace: Left Controls, Right Live Canvas Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6 shadow-xl">
            
            {/* Background Style Switcher */}
            <div>
              <label className="block text-xs font-extrabold text-slate-200 mb-2 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>خلفية البوستر</span>
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setUseAiBg(true)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    useAiBg ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>خلفية AI الرسمية</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUseAiBg(false)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    !useAiBg ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>خلفية جرافيك فيكتور</span>
                </button>
              </div>

              {useAiBg && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">اختيار صورة الأساس:</span>
                  <div className="flex gap-1.5">
                    {POSTER_IMAGES.map((img, idx) => (
                      <button
                        key={img.id}
                        onClick={() => setSelectedBgIndex(idx)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-bold transition ${
                          selectedBgIndex === idx
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {img.aspectRatio}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dimensions Aspect Ratio */}
            <div>
              <label className="block text-xs font-extrabold text-slate-200 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>مقاس البوستر (Aspect Ratio)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio('1:1')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                    aspectRatio === '1:1'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <div>مربع 1:1</div>
                  <span className="text-[10px] text-slate-500">Instagram / FB</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('9:16')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                    aspectRatio === '9:16'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <div>ستوري 9:16</div>
                  <span className="text-[10px] text-slate-500">Story / Flyer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('16:9')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition text-center ${
                    aspectRatio === '16:9'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <div>عريض 16:9</div>
                  <span className="text-[10px] text-slate-500">Banner / Cover</span>
                </button>
              </div>
            </div>

            {/* Color Palette Theme (if vector background) */}
            <div>
              <label className="block text-xs font-extrabold text-slate-200 mb-2 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-cyan-400" />
                <span>نمط الألوان (Color Theme)</span>
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'cyan', label: 'سيان طبي (RT)', bg: 'bg-cyan-500' },
                  { id: 'navy', label: 'كحلي ملكي', bg: 'bg-blue-600' },
                  { id: 'emerald', label: 'أخضر زمردي', bg: 'bg-emerald-500' },
                  { id: 'gold', label: 'ذهبي في آي بي', bg: 'bg-amber-500' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setThemeColor(t.id as any)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                      themeColor === t.id
                        ? 'bg-slate-800 text-white border-cyan-400 ring-1 ring-cyan-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${t.bg}`}></span>
                    <span className="text-[11px] truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Inputs */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              
              {/* Lab Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">اسم المعمل</label>
                <input
                  type="text"
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Offer & Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">عنوان العرض</label>
                  <input
                    type="text"
                    value={offerBadge}
                    onChange={(e) => setOfferBadge(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">نسبة الخصم</label>
                  <input
                    type="text"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Offer Scope */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">نطاق الفحوصات المشمولة</label>
                <input
                  type="text"
                  value={offerScope}
                  onChange={(e) => setOfferScope(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Hotline Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">رقم الهاتف / الواتساب</label>
                  <input
                    type="text"
                    value={hotline}
                    onChange={(e) => setHotline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">الفروع / الخدمة</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Featured tests */}
              {!useAiBg && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">الفحوصات المميزة في البوستر</label>
                  <input
                    type="text"
                    value={featuredTests}
                    onChange={(e) => setFeaturedTests(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

            </div>

            {/* Export Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => handleExport('png')}
                disabled={isExporting}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 transition active:scale-95 disabled:opacity-50"
              >
                {exportSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>تم التصدير بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>تصدير البوستر (PNG HD)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleExport('jpeg')}
                disabled={isExporting}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700"
              >
                JPG مضغوط
              </button>
            </div>

          </div>

          {/* Canvas Live Preview Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Preview Frame */}
            <div className="relative w-full rounded-3xl bg-slate-900/60 border border-slate-800 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[500px]">
              
              <div className="flex items-center justify-between w-full mb-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  معاينة حية فورية للبوستر (Live Render)
                </span>
                <span className="font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                  {aspectRatio}
                </span>
              </div>

              {/* The actual HTML5 Canvas */}
              <div className="max-w-full overflow-hidden rounded-2xl shadow-2xl border border-cyan-500/30 bg-slate-950">
                <canvas
                  ref={canvasRef}
                  className="max-h-[600px] w-auto max-w-full object-contain mx-auto block"
                />
              </div>

              <p className="text-[11px] text-slate-400 text-center mt-3">
                * يتم تحديث البوستر فورياً عند تعديل أي بيان في الاستوديو. يمكنك تصديره بدقة كاملة واستخدامه في حملتك الإعلانية.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
