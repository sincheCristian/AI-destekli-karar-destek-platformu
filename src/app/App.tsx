import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PlaceholderCards } from './components/PlaceholderCards';
import { ResultsSection } from './components/ResultsSection';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Interface pour les données du formulaire
export interface PatientFormData {
  adSoyad: string;
  eposta: string;
  age: number;
  gender: string;
  temperature: number;
  symptoms: string;
}

export default function App() {
  // États de l'interface
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // États pour les données
  const [currentPatient, setCurrentPatient] = useState<PatientFormData | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

  /**
   * Gestion du démarrage de l'analyse
   */
  const handleAnalysisStart = async (formData: PatientFormData) => {
    setCurrentPatient(formData);
    setIsAnalyzing(true);
    setShowResults(false);
    setProgress(0);
    setDiagnosisResult(null);

    try {
      // 1. Appel à n8n (Déclenche l'IA et l'insertion SQL)
      const n8nResponse = await fetch('http://localhost:5678/webhook-test/b6c65995-8679-4c26-afae-04bd6c06bd94', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() })
      });

      if (!n8nResponse.ok) throw new Error('Erreur de communication avec n8n');

      // 2. On attend un peu (1.5s) que n8n finisse d'écrire dans la base de données
      setTimeout(async () => {
        try {
          // 3. Récupération du résultat via ton Backend Node.js
          const response = await fetch('http://localhost:5000/api/latest-diagnosis');
          const data = await response.json();

          if (data) {
            // Mapping des colonnes SQL vers ton interface React
            const formattedResult = {
              diseases: [
                { name: data.maladie_probale_1 || "Teşhis Yok", probability: Number(data.pourcentage_1) || 0 },
                { name: data.maladie_probale_2 || "Yok", probability: Number(data.pourcentage_2) || 0 },
                { name: data.maladie_probale_3 || "Yok", probability: Number(data.pourcentage_3) || 0 }
              ].filter(d => d.name !== "Yok" && d.name !== ""),
              
              decision: data.decision_finale || "Analiz tamamlandı",
              remedes: data.remedes_suggeres || "Öneri bulunmamaktadır",
              protocole: data.protocole_j1 || "Protokol bulunmamaktadır"
            };

            setDiagnosisResult(formattedResult);
            console.log('✅ Données récupérées du Backend:', formattedResult);
          }
        } catch (err) {
          console.error('❌ Erreur Backend Node:', err);
        }
      }, 1500);

    } catch (error) {
      console.error('❌ Erreur n8n:', error);
      alert('Erreur: Impossible de joindre le serveur. Vérifie n8n et ton Backend.');
      setIsAnalyzing(false);
    }
  };

  /**
   * Animation de la barre de progression
   */
  useEffect(() => {
    if (isAnalyzing) {
      const duration = 15000; 
      const interval = 50;
      const increment = (interval / duration) * 100;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setIsAnalyzing(false);
              setShowResults(true);
            }, 500);
            return 100;
          }
          return prev + increment;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isAnalyzing]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative font-sans">
      {/* Background Medical */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1748404493914-c9443dac6234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Medical Background"
          className="w-full h-full object-cover opacity-[0.06] blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#e3f2fd]/40 to-[#f8f9fa]/95" />
      </div>

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <HeroSection
          onAnalysisStart={handleAnalysisStart}
          isAnalyzing={isAnalyzing}
          progress={progress}
        />

        {!showResults && <PlaceholderCards showResults={showResults} />}

        {showResults && diagnosisResult && currentPatient && (
          <ResultsSection 
            patientName={currentPatient.adSoyad}
            patientAge={currentPatient.age}
            symptoms={currentPatient.symptoms}
            temperature={currentPatient.temperature}
            diseases={diagnosisResult.diseases} 
            decision={diagnosisResult.decision}
            remedes={diagnosisResult.remedes}
            protocole={diagnosisResult.protocole}
          />
        )}

        <Disclaimer />
      </main>

      <Footer />
    </div>
  );
}