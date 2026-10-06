import React, { useState } from 'react';
import { POSTER_IMAGES } from '../data/labData';
import { PosterImage } from '../types';
import { 
  Download, 
  Maximize2, 
  Share2, 
  Check, 
  Sparkles, 
  Tag, 
  Eye, 
  X, 
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface PostersGalleryProps {
  onSelectForCustomize?: (poster: PosterImage) => void;
}

export const PostersGallery: React.FC<PostersGalleryProps> = () => {
  const [activeTab, setActiveTab] = useState<'all' | '1:1' | '9:16' | '16:9'>('all');
  const [selectedPoster, setSelectedPoster] = useState<PosterImage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const filteredPosters = activeTab === 'all' 
    ? POSTER_IMAGES 
    : POSTER_IMAGES.filter(p => p.aspectRatio === activeTab);

  const handleDownload = async (poster: PosterImage) => {
    try {
      const response = await fetch(poster.imagePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RT_Labs_Offer_70Percent_${poster.id}_${poster.aspectRatio.replace(':', 'x')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDownloadSuccessId(poster.id);
      setTimeout(() => setDownloadSuccessId(null), 3000);
    } catch {
      // Fallback direct link download
      const a = document.createElement('a');
      a.href = poster.imagePath;
      a.download = `RT_Labs_Offer_${poster.id}.jpg`;
      a.click();
    }
  };

  const handleShare = async (poster: PosterImage) => {
    const shareData = {
      title: 'بوستر معامل RT - عرض اليوم الواحد خصم 70%',
      text: `عرض اليوم الواحد من معامل RT للتحاليل الطبية! خصم 70% على كافة التحاليل الطبية. للاستفسار وحجز السحب المنزلي.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share not supported
      }
    }

    // Fallback: Copy URL
    navigator.clipboard.writeText(window.location.href);
    setCopiedId(poster.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="posters-section" className="py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-900/40 text-cyan-300 border border-cyan-700/50 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>البوسترات الإعلانية الرسمية الجاهزة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            بوسترات هوية معامل <span className="text-cyan-400">RT</span> - خصم 70%
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            تصاميم احترافية عالية الدقة معدة خصيصاً لحملة "عرض اليوم الواحد"، متوفرة بجميع المقاسات القياسية لمنصات التواصل الاجتماعي والمطبوعات.
          </p>
        </div>

        {/* Aspect Ratio Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الكل ({POSTER_IMAGES.length})
          </button>
          <button
            onClick={() => setActiveTab('1:1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === '1:1'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            مربع 1:1 (Post)
          </button>
          <button
            onClick={() => setActiveTab('9:16')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === '9:16'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ستوري 9:16 (Story)
          </button>
          <button
            onClick={() => setActiveTab('16:9')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === '16:9'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            عريض 16:9 (Banner)
          </button>
        </div>
      </div>

      {/* Posters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosters.map((poster) => (
          <div
            key={poster.id}
            className="group relative flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-950/40"
          >
            {/* Image Preview Container */}
            <div className="relative bg-slate-950 overflow-hidden flex items-center justify-center min-h-[300px] max-h-[460px]">
              
              {/* Badge Overlay */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-lg">
                <Tag className="w-3 h-3 text-amber-400" />
                <span>{poster.aspectRatio}</span>
                <span className="text-slate-500">•</span>
                <span>{poster.dimensions}</span>
              </div>

              {/* 70% Discount Badge */}
              <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white text-xs font-black shadow-lg shadow-red-950/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>خصم 70%</span>
              </div>

              {/* Poster Image */}
              <img
                src={poster.imagePath}
                alt={poster.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Hover Quick Actions Overlay */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 backdrop-blur-xs transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                <button
                  onClick={() => setSelectedPoster(poster)}
                  className="p-3 rounded-2xl bg-slate-900/90 text-white hover:text-cyan-400 hover:bg-slate-800 border border-slate-700 shadow-xl transition transform hover:scale-105"
                  title="معاينة وتكبير بدقة كاملة"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDownload(poster)}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-xl shadow-cyan-500/25 transition transform hover:scale-105"
                  title="تحميل الصورة عالية الدقة"
                >
                  <Download className="w-5 h-5" />
                  <span>تحميل البوستر</span>
                </button>
              </div>
            </div>

            {/* Poster Info Card */}
            <div className="p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-slate-900/80 to-slate-950/90 border-t border-slate-800/80">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-extrabold text-white text-base leading-snug">
                    {poster.title}
                  </h3>
                  <span className="shrink-0 text-xs font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/30">
                    عرض اليوم
                  </span>
                </div>
                
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {poster.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-cyan-400 font-semibold bg-cyan-950/30 px-2.5 py-1.5 rounded-lg border border-cyan-900/40">
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">الاستخدام المقترح: {poster.recommendedFor}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleDownload(poster)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs shadow-md shadow-cyan-900/40 transition active:scale-95"
                >
                  {downloadSuccessId === poster.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>تم التحميل بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>تحميل فائق الدقة (HD)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleShare(poster)}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                  title="مشاركة البوستر أو نسخ الرابط"
                >
                  {copiedId === poster.id ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => setSelectedPoster(poster)}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700 transition"
                  title="تكبير"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-slate-900 rounded-3xl border border-cyan-500/40 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono">
                  RT
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {selectedPoster.title}
                  </h3>
                  <span className="text-xs text-slate-400">
                    أبعاد البوستر: {selectedPoster.dimensions} ({selectedPoster.aspectRatio})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(selectedPoster)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل البوستر</span>
                </button>

                <button
                  onClick={() => setSelectedPoster(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950/60">
              <img
                src={selectedPoster.imagePath}
                alt={selectedPoster.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl ring-1 ring-cyan-500/30"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>هوية معامل RT المعتمدة: خصم 70% على كافة الفحوصات الطبية وعرض اليوم الواحد.</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedPoster.imagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
                >
                  <span>فتح في تبويب مستقل</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
