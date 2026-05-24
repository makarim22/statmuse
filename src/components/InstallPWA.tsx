import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Download, RefreshCw, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function InstallPWA() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    soundEngine.playClick();
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-10 z-50 animate-fade-in">
      <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary border-2 border-black flex items-center justify-center">
              {offlineReady ? <Download className="h-4 w-4" /> : <RefreshCw className="h-4 w-4 animate-spin-slow" />}
            </div>
            <h3 className="font-black uppercase tracking-tighter text-lg leading-none">
              {offlineReady ? 'Aplikasi Siap Offline' : 'Pembaruan Tersedia'}
            </h3>
          </div>
          <button 
            onClick={close}
            className="hover:bg-rose-500 hover:text-white transition-colors border-2 border-transparent hover:border-black p-0.5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-xs font-bold leading-tight mb-4">
          {offlineReady
            ? 'Garuda Stats kini telah tersimpan di perangkat Anda. Anda dapat membukanya kapan saja tanpa koneksi internet.'
            : 'Versi terbaru dari database sejarah liga telah tersedia. Muat ulang sekarang untuk memperbarui data.'}
        </p>

        <div className="flex gap-2">
          {needRefresh && (
            <button
              onClick={() => {
                soundEngine.playThud();
                updateServiceWorker(true);
              }}
              className="flex-1 bg-black text-white px-3 py-2 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-black border-2 border-black transition-all"
            >
              Muat Ulang
            </button>
          )}
          <button
            onClick={close}
            className="flex-1 bg-white text-black px-3 py-2 text-xs font-black uppercase tracking-widest border-2 border-black hover:bg-gray-100 transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
