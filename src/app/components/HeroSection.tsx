import { useState } from 'react';
import { Activity, User, Thermometer, Loader2, Mail, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// 1. Interface alignée avec App.tsx pour éviter les données vides
export interface PatientFormData {
  adSoyad: string;
  eposta: string;
  age: string;
  gender: string;
  symptoms: string;
  temperature: string;
}

interface HeroSectionProps {
  onAnalysisStart: (data: PatientFormData) => void;
  isAnalyzing: boolean;
  progress: number;
}

export function HeroSection({ onAnalysisStart, isAnalyzing, progress }: HeroSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('erkek'); // Valeur par défaut
  const [symptoms, setSymptoms] = useState('');
  const [temperature, setTemperature] = useState('');

  const isFormValid = () => {
    return name.trim() && email.trim() && symptoms.trim() && age && gender;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      // 2. Mapping correct vers les noms de variables attendus par n8n
      onAnalysisStart({
        adSoyad: name.trim(),
        eposta: email.trim(),
        age,
        gender,
        symptoms: symptoms.trim(),
        temperature
      });
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-12 mb-8 backdrop-blur-sm bg-white/98">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1602857052438-7e9f27da2648?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
              alt="Medical Stethoscope"
              className="w-full h-full object-contain drop-shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0056b3]/5 to-transparent rounded-full blur-2xl" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Semptomlarınızı Girin, Anında Karar Desteği Alın
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sağlık durumunuzu analiz ediyoruz ve size en uygun adımları öneriyoruz.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Kimlik Bilgileri Section */}
        <div className="mb-6 pb-6 border-b-2 border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#007bff]" />
            Kimlik Bilgileri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınızı ve soyadınızı girin"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#007bff] focus:outline-none focus:ring-4 focus:ring-[#007bff]/10 text-gray-900 transition-all"
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#007bff]" /> E-posta *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eposta@örnek.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#007bff] focus:outline-none focus:ring-4 focus:ring-[#007bff]/10 text-gray-900 transition-all"
                disabled={isAnalyzing}
              />
            </div>
          </div>
        </div>

        {/* Kişisel Bilgiler Section */}
        <div className="mb-6 pb-6 border-b-2 border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yaş *</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Örn: 25"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#007bff] focus:outline-none focus:ring-4 focus:ring-[#007bff]/10 text-gray-900 transition-all"
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cinsiyet *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#007bff] focus:outline-none focus:ring-4 focus:ring-[#007bff]/10 text-gray-900 transition-all"
                disabled={isAnalyzing}
              >
                <option value="erkek">Erkek</option>
                <option value="kadin">Kadın</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-[#007bff]" /> Ateş (°C)
              </label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="Örn: 38.5"
                step="0.1"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#007bff] focus:outline-none focus:ring-4 focus:ring-[#007bff]/10 text-gray-900 transition-all"
                disabled={isAnalyzing}
              />
            </div>
          </div>
        </div>

        {/* Semptomlar Section */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#007bff]" /> Semptomlar *
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Belirtilerinizi detaylı yazın..."
            className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-[#007bff] focus:outline-none focus:ring-4 focus:ring-[#007bff]/10 resize-none h-48 text-gray-900 transition-all shadow-sm"
            disabled={isAnalyzing}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isAnalyzing || !isFormValid()}
          className="w-full mt-2 px-8 py-5 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg">Analiz Ediliyor...</span>
            </>
          ) : (
            <>
              <Activity className="w-6 h-6" />
              <span className="text-lg">Analiz Et ve Karar Ver</span>
            </>
          )}
        </button>

        {/* Barre de progression avec animation */}
        {isAnalyzing && (
          <div className="mt-8 bg-blue-50/50 rounded-2xl p-6 border-2 border-[#007bff]/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-800">Yapay Zeka Analizi %{Math.round(progress)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-[#007bff] transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}