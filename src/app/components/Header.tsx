import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center">
        <div className="flex items-center gap-3">
          <Activity className="w-9 h-9 text-[#007bff]" />
          <h1 className="text-xl text-[#007bff]">Yapay Zeka Destekli Sağlık Karar Platformu</h1>
        </div>
      </div>
    </header>
  );
}
