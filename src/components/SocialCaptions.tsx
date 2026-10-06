import React, { useState } from 'react';
import { SOCIAL_CAPTIONS } from '../data/labData';
import { SocialCaption } from '../types';
import { 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Sparkles, 
  Send,
  Facebook,
  Instagram
} from 'lucide-react';

export const SocialCaptions: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<string>('facebook');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const currentCaption = SOCIAL_CAPTIONS.find(c => c.platform === activePlatform) || SOCIAL_CAPTIONS[0];

  const handleCopy = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(platform);
    setTimeout(() => setCopiedText(null), 3000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-400" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-400" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-emerald-400" />;
      default:
        return <Share2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="captions-section" className="py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-900/40 text-cyan-300 border border-cyan-700/50 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>نصوص وحملات السوشيال ميديا الجاهزة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              نصوص وكابشن جاهز للنشر مع البوستر
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              انسخ النصوص التسويقية المصاغة بعناية والمناسبة لكل منصة لنشر البوستر الإعلاني فوراً وجلب أعلى تفاعل.
            </p>
          </div>
        </div>

        {/* Platform Tabs & Content Box */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          
          {/* Tabs bar */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2 overflow-x-auto">
            {SOCIAL_CAPTIONS.map((caption) => {
              const isActive = activePlatform === caption.platform;
              return (
                <button
                  key={caption.platform}
                  onClick={() => setActivePlatform(caption.platform)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {getPlatformIcon(caption.platform)}
                  <span>{caption.platformName}</span>
                </button>
              );
            })}
          </div>

          {/* Caption Body */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{currentCaption.title}</span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentCaption.text, currentCaption.platform)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition active:scale-95"
                >
                  {copiedText === currentCaption.platform ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                      <span>تم النسخ بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>نسخ النص كاملاً</span>
                    </>
                  )}
                </button>

                {currentCaption.platform === 'whatsapp' && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(currentCaption.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>مشاركة عبر واتساب</span>
                  </a>
                )}
              </div>
            </div>

            {/* Text Box */}
            <div className="relative">
              <textarea
                readOnly
                value={currentCaption.text}
                rows={10}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 font-sans leading-relaxed resize-none focus:outline-none select-all"
              />
            </div>
            
            <p className="text-[11px] text-slate-500 mt-2">
              * نصيحة تسويقية: ارفق البوستر المناسب (1:1 للفيسبوك والإنستغرام، 9:16 للستوري وحالات الواتساب) مع هذا النص لتحقيق أقصى وصول.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
