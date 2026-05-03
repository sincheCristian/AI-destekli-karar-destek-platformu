export function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-sm border-t border-gray-200 mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center text-gray-600">
          <p className="text-sm">&copy; 2026 Yapay Zeka Destekli Sağlık Karar Platformu. Tüm hakları saklıdır.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-[#007bff] transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="text-gray-600 hover:text-[#007bff] transition-colors">
              Kullanım Şartları
            </a>
            <a href="#" className="text-gray-600 hover:text-[#007bff] transition-colors">
              İletişim
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
