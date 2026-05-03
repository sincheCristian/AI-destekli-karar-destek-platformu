import { PieChart, AlertTriangle, ClipboardList } from 'lucide-react';

interface PlaceholderCardsProps {
  showResults: boolean;
}

export function PlaceholderCards({ showResults }: PlaceholderCardsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-500 ${!showResults ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-dashed border-gray-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#007bff]/10 p-3 rounded-xl">
            <PieChart className="w-6 h-6 text-[#007bff]" />
          </div>
          <h3 className="text-lg text-gray-900">Olası Teşhisler (%)</h3>
        </div>
        {!showResults && (
          <div className="text-center py-8 text-gray-400">
            <p>Analiz sonrası görüntülenecek</p>
          </div>
        )}
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-dashed border-gray-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#007bff]/10 p-3 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-[#007bff]" />
          </div>
          <h3 className="text-lg text-gray-900">Önerilen Eylem</h3>
        </div>
        {!showResults && (
          <div className="text-center py-8 text-gray-400">
            <p>Analiz sonrası görüntülenecek</p>
          </div>
        )}
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-dashed border-gray-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#007bff]/10 p-3 rounded-xl">
            <ClipboardList className="w-6 h-6 text-[#007bff]" />
          </div>
          <h3 className="text-lg text-gray-900">1. Gün Protokolü</h3>
        </div>
        {!showResults && (
          <div className="text-center py-8 text-gray-400">
            <p>Analiz sonrası görüntülenecek</p>
          </div>
        )}
      </div>
    </div>
  );
}
