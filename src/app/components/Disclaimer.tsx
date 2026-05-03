import { AlertTriangle } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="mt-8 bg-gradient-to-br from-yellow-50/90 to-amber-50/70 backdrop-blur-sm border-2 border-yellow-400/60 rounded-2xl p-6 shadow-lg">
      <div className="flex gap-4">
        <div className="bg-yellow-100 p-3 rounded-xl h-fit">
          <AlertTriangle className="w-7 h-7 text-yellow-700 flex-shrink-0" />
        </div>
        <div>
          <h4 className="text-yellow-900 mb-2">YASAL UYARI</h4>
          <p className="text-yellow-800 leading-relaxed">
            Bu platform öğrenci projesidir. Sağlanan bilgiler sadece karar destek amaçlıdır ve
            profesyonel tıbbi tavsiye yerine geçmez. Acil durumlarda 112'yi arayın.
          </p>
        </div>
      </div>
    </div>
  );
}
