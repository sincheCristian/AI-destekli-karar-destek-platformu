import { PieChart, AlertTriangle, ClipboardList, Check, ShieldCheck, User, Activity, Thermometer, Stethoscope } from 'lucide-react';

interface Disease {
  name: string;
  probability: number;
}

interface ResultsSectionProps {
  patientName: string;
  patientAge: number;
  symptoms: string;
  temperature: number;
  diseases: Disease[];
  decision: string;
  remedes: string;
  protocole: string;
}

export function ResultsSection({ 
  patientName, patientAge, symptoms, temperature,
  diseases, decision, remedes, protocole 
}: ResultsSectionProps) {
  
  const isUrgent = decision?.toLowerCase().includes('acil') || decision?.toLowerCase().includes('urgence');
  const listRemedes = remedes ? remedes.split(/[;,]/).map(item => item.trim()) : [];
  const listProtocole = protocole ? protocole.split(/[;,]/).map(item => item.trim()) : [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. SECTION : PATIENT BİLGİLERİ (Identifiant Complet) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#007bff] px-6 py-3 flex items-center gap-2">
          <User className="w-5 h-5 text-white" />
          <h3 className="text-white font-medium">Patient Bilgileri (Résumé Patient)</h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><User className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">AD SOYAD</p>
              <p className="text-sm font-semibold text-gray-800">{patientName || 'Belirtilmedi'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><Activity className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">YAŞ</p>
              <p className="text-sm font-semibold text-gray-800">{patientAge} Yaş</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><Thermometer className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">VÜCUT ISISI</p>
              <p className="text-sm font-semibold text-gray-800">{temperature}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg"><Stethoscope className="w-5 h-5 text-orange-600" /></div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">BELİRTİLER (SYMPTÔMES)</p>
              <p className="text-sm font-semibold text-orange-700">{symptoms || 'Yok'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION : ANALİZ VE SONUÇLAR (3 Colonnes) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COL 1: OLASI TEŞHİSLER (%) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Olası Teşhisler (%)</h3>
          </div>
          <div className="space-y-5">
            {diseases.map((disease, index) => (
              <div key={index} className="group">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{disease.name}</span>
                  <span className="text-sm font-bold text-gray-900">{disease.probability}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 bg-blue-500"
                    style={{ width: `${disease.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COL 2: KARAR VE ÇÖZÜM */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Karar ve Çözüm</h3>
          </div>

          <div className={`flex items-center gap-3 p-3 rounded-xl mb-6 border ${isUrgent ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
            {isUrgent ? <AlertTriangle className="w-5 h-5 text-red-600" /> : <ShieldCheck className="w-5 h-5 text-green-600" />}
            <span className={`text-sm font-bold ${isUrgent ? 'text-red-700' : 'text-green-700'}`}>
              {decision?.toUpperCase() || 'ANALİZ TAMAMLANDI'}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-bold text-gray-400 uppercase">ÖNERİLEN ÇÖZÜMLER</p>
            {listRemedes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COL 3: GÜNLÜK PROTOKOL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">1. Gün Protokolü</h3>
          </div>
          <div className="space-y-3">
            {listProtocole.length > 0 ? listProtocole.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            )) : (
              <p className="text-sm text-gray-400 italic">Protokol bulunmamaktadır.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}