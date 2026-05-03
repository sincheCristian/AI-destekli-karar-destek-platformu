/**
 * 📡 SERVICE API - Gestion des appels backend
 *
 * Ce fichier centralise toute la logique d'appel API.
 * Pour connecter à une vraie base de données :
 * 1. Remplacer mockAnalyzeSymptoms par un vrai fetch()
 * 2. Configurer l'URL dans .env ou config
 */

export interface PatientData {
  name: string;
  email: string;
  age: string;
  gender: string;
  symptoms: string;
  temperature: string;
  timestamp: string;
}

export interface DiagnosisResult {
  success: boolean;
  patientId: string;
  diseases: Array<{
    name: string;
    probability: number;
    color: string;
  }>;
  urgency: 'ACİL' | 'RANDEVU' | 'GÖZLENİM';
  urgencyMessage: string;
  recommendations: string[];
  dayOneProtocol: string[];
}

/**
 * MOCK API - Pour la démo
 * À REMPLACER par un vrai appel API
 */
export async function mockAnalyzeSymptoms(data: PatientData): Promise<DiagnosisResult> {
  // Simuler délai réseau (2-5 secondes)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Logique simple basée sur température
  const hasHighFever = data.temperature && parseFloat(data.temperature) >= 39;
  const hasMalariaSymptoms = data.symptoms.toLowerCase().includes('titreme');

  return {
    success: true,
    patientId: `PAT-${Date.now()}`,
    diseases: [
      {
        name: hasMalariaSymptoms ? 'Sıtma' : 'Grip',
        probability: hasHighFever ? 70 : 50,
        color: '#dc2626'
      },
      {
        name: 'Mevsimsel Grip',
        probability: hasHighFever ? 20 : 35,
        color: '#f59e0b'
      },
      {
        name: 'Tifüs',
        probability: 10,
        color: '#10b981'
      }
    ],
    urgency: hasHighFever ? 'ACİL' : 'RANDEVU',
    urgencyMessage: hasHighFever
      ? 'Lütfen en yakın sağlık kuruluşuna başvurun.'
      : 'Doktorunuzdan randevu almanızı öneririz.',
    recommendations: [
      'Bol sıvı tüketin',
      'Ateş düşürücü (Parasetamol) kullanın',
      'Dinlenin ve kendinizi izole edin'
    ],
    dayOneProtocol: [
      'Sıcaklığı 2 saatte bir kontrol et',
      'TDR testi yaptır',
      '3L su iç'
    ]
  };
}

/**
 * VRAIE API - À activer pour production
 *
 * Décommenter et configurer pour connecter à n8n ou backend
 */
/*
export async function analyzeSymptoms(data: PatientData): Promise<DiagnosisResult> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-n8n-webhook.com/analyze';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(30000) // 30 secondes timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: DiagnosisResult = await response.json();
    return result;

  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Erreur lors de l\'analyse. Veuillez réessayer.');
  }
}
*/

/**
 * VALIDATION - Valider les données avant envoi
 */
export function validatePatientData(data: PatientData): string[] {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Ad Soyad en az 2 karakter olmalı');
  }

  if (!data.email || !data.email.includes('@')) {
    errors.push('Geçerli bir e-posta adresi giriniz');
  }

  if (!data.age || parseInt(data.age) < 0 || parseInt(data.age) > 120) {
    errors.push('Yaş geçersiz (0-120 arası olmalı)');
  }

  if (!data.gender || !['erkek', 'kadin', 'diger'].includes(data.gender)) {
    errors.push('Cinsiyet seçilmeli');
  }

  if (!data.symptoms || data.symptoms.trim().length < 10) {
    errors.push('Semptomlar en az 10 karakter olmalı');
  }

  if (data.temperature) {
    const temp = parseFloat(data.temperature);
    if (temp < 35 || temp > 45) {
      errors.push('Sıcaklık geçersiz (35-45°C arası olmalı)');
    }
  }

  return errors;
}
