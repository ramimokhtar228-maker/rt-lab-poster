import React, { useState } from 'react';
import { Smartphone, Download, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'header' | 'hero' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'header'
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  // If already installed, show small badge or hide
  if (isInstalled && variant === 'header') {
    return (
      <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span>مثبت كتطبيق</span>
      </div>
    );
  }

  return (
    <>
      {variant === 'header' && (
        <button
          onClick={handleClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/80 transition shadow-sm ${className}`}
          title="تثبيت التطبيق على هاتفك"
        >
          <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>تنزيل على الموبايل</span>
        </button>
      )}

      {variant === 'hero' && (
        <button
          onClick={handleClick}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-purple-900/30 transition active:scale-95 ${className}`}
        >
          <Smartphone className="w-4 h-4 text-purple-200" />
          <span>تنزيل التطبيق على هاتفك (App)</span>
        </button>
      )}

      {variant === 'banner' && (
        <button
          onClick={handleClick}
          className={`flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition active:scale-95 ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>تنزيل وتثبيت التطبيق على الموبايل</span>
        </button>
      )}

      {/* Guide Modal */}
      <PWAInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isInstallable={isInstallable}
        onNativeInstall={install}
        initialTab={isIOS ? 'ios' : 'android'}
      />
    </>
  );
};
