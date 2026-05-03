# 🏥 Yapay Zeka Destekli Sağlık Karar Platformu

## 📋 Description du Projet

Plateforme web moderne permettant aux patients d'obtenir un support de diagnostic IA préliminaire basé sur leurs symptômes. Le système collecte des données structurées, les envoie à n8n pour traitement IA, et retourne des recommandations médicales.

---

## 🎯 Objectifs du Projet

1. ✅ Collecte structurée de symptômes patients
2. ✅ Analyse IA via GPT-4/Claude
3. ✅ Recommandations de triage médical
4. ✅ Stockage en base de données pour analyse
5. ✅ Interface utilisateur médicale professionnelle

---

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│     n8n     │─────▶│  OpenAI API │
│  (React +   │      │  Workflow   │      │   (GPT-4)   │
│  Tailwind)  │      │  Automation │      └─────────────┘
└─────────────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  PostgreSQL │
                     │  Database   │
                     └─────────────┘
```

---

## 📊 Données Collectées

| Champ          | Type     | Obligatoire | Description                        |
|----------------|----------|-------------|------------------------------------|
| `age`          | Number   | ✅          | Âge du patient (0-120)             |
| `gender`       | String   | ✅          | Genre (erkek/kadin/diger)          |
| `symptoms`     | Text     | ✅          | Description détaillée symptômes    |
| `temperature`  | Number   | ❌          | Température corporelle (35-45°C)   |
| `duration`     | String   | ✅          | Durée des symptômes                |
| `location`     | String   | ❌          | Localisation géographique          |
| `timestamp`    | DateTime | Auto        | Horodatage de la consultation      |

---

## 🚀 Installation & Configuration

### 1. Frontend (React)

```bash
# Installation dépendances (déjà fait dans ce projet)
pnpm install

# Lancer dev server (NE PAS FAIRE - déjà en cours)
# Le serveur tourne automatiquement dans Figma Make
```

### 2. Configuration n8n

#### A. Importer le Workflow
1. Ouvrir n8n
2. Cliquer "Import from File"
3. Sélectionner `N8N_WORKFLOW_EXAMPLE.json`
4. Configurer les credentials (PostgreSQL, OpenAI, Telegram)

#### B. Obtenir l'URL Webhook
1. Activer le nœud "Webhook"
2. Copier l'URL générée (ex: `https://your-n8n.com/webhook/health-analysis`)

#### C. Mettre à jour le Frontend
Dans `src/app/App.tsx`, ligne ~47 :
```typescript
// Remplacer
console.log('Données envoyées à n8n:', patientData);

// Par
const response = await fetch('VOTRE_URL_N8N_ICI', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(patientData)
});
```

### 3. Base de Données PostgreSQL

```sql
-- Créer la table
CREATE TABLE patient_consultations (
  id SERIAL PRIMARY KEY,
  patient_id VARCHAR(50) UNIQUE,
  age INTEGER NOT NULL,
  gender VARCHAR(10) NOT NULL,
  symptoms TEXT NOT NULL,
  temperature DECIMAL(3,1),
  duration VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  diagnosis_result JSONB,
  severity VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour performance
CREATE INDEX idx_created_at ON patient_consultations(created_at DESC);
CREATE INDEX idx_severity ON patient_consultations(severity);
```

---

## 🎨 Structure Frontend

### Composants Principaux

```
src/
├── app/
│   ├── App.tsx                 # Composant principal
│   └── components/
│       └── figma/
│           └── ImageWithFallback.tsx
├── styles/
│   ├── theme.css              # Thème Tailwind
│   └── fonts.css              # Polices
```

### États React
```typescript
// Données Patient
const [age, setAge] = useState('');
const [gender, setGender] = useState('');
const [symptoms, setSymptoms] = useState('');
const [temperature, setTemperature] = useState('');
const [duration, setDuration] = useState('');
const [location, setLocation] = useState('');

// États UI
const [showResults, setShowResults] = useState(false);
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [progress, setProgress] = useState(0);
```

---

## ✅ Validation Frontend

### Règles Implémentées
- ✅ Âge : 0-120 ans
- ✅ Température : 35-45°C
- ✅ Champs obligatoires : age, gender, symptoms, duration
- ✅ Désactivation pendant chargement
- ✅ Messages d'erreur clairs

### Fonction de Validation
```typescript
const isFormValid = () => {
  return symptoms.trim() && age && gender && duration;
};
```

---

## 🔄 Flux de Données

### 1. Soumission Formulaire
```
User Input → Validation → Create PatientData Object → Send to n8n
```

### 2. Traitement n8n
```
Webhook → Validate → Save DB → AI Analysis → Format Response → Return
```

### 3. Affichage Résultats
```
Receive Response → Parse JSON → Update UI → Show Results
```

---

## 📦 Exemple Réponse n8n

```json
{
  "success": true,
  "patientId": "PAT-1714234567890",
  "diagnosis": {
    "diseases": [
      { "name": "Sıtma", "probability": 70 },
      { "name": "Mevsimsel Grip", "probability": 20 },
      { "name": "Tifüs", "probability": 10 }
    ],
    "urgency": "ACİL",
    "urgencyMessage": "Lütfen en yakın sağlık kuruluşuna başvurun.",
    "recommendations": [
      "Bol sıvı tüketin",
      "Ateş düşürücü (Parasetamol) kullanın",
      "Dinlenin"
    ],
    "dayOneProtocol": [
      "Sıcaklığı 2 saatte bir kontrol et",
      "TDR testi yaptır",
      "3L su iç"
    ]
  },
  "timestamp": "2026-04-27T10:30:00.000Z"
}
```

---

## 🎨 Design System

### Couleurs
- **Primary (Confiance)** : `#0056b3` - Bleu médical foncé
- **Success (Action)** : `#10b981` - Vert validation
- **Warning (Attention)** : `#f59e0b` - Jaune avertissement
- **Danger (Urgence)** : `#dc2626` - Rouge alerte
- **Background** : `#f8f9fa` - Gris clair

### Typographie
- **Titres** : Inter/Roboto, Medium (500)
- **Corps** : Inter/Roboto, Regular (400)
- **Taille base** : 16px

### Spacing
- **Cards** : `rounded-2xl` (2rem = 32px)
- **Buttons** : `rounded-full` (9999px)
- **Padding** : 4-6 unités Tailwind

---

## 🔒 Sécurité & Conformité

### Implémenté
- ✅ Disclaimer légal visible
- ✅ Validation côté client
- ✅ Pas de stockage local de données médicales
- ✅ Timestamp pour audit trail

### À Implémenter
- ⚠️ Chiffrement HTTPS (obligatoire en production)
- ⚠️ Consentement RGPD/KVKK explicite
- ⚠️ Rate limiting (max 5 req/min par IP)
- ⚠️ Sanitization inputs (XSS protection)
- ⚠️ Authentification utilisateur

---

## 📈 Métriques à Tracker

### Analytics Recommandés
```javascript
// Événements à logger
analytics.track('form_started');
analytics.track('form_submitted', { age, gender, symptoms });
analytics.track('analysis_completed', { duration: 5000 });
analytics.track('error_occurred', { type: 'network_error' });
```

### KPIs
- Nombre de consultations/jour
- Temps moyen d'analyse
- Taux d'urgence (ACİL vs RANDEVU)
- Maladies les plus fréquentes
- Taux d'abandon formulaire

---

## 🐛 Debug & Troubleshooting

### Activer Mode Debug
```javascript
// Console navigateur
localStorage.setItem('DEBUG', 'true');
location.reload();
```

### Erreurs Communes

| Erreur                  | Cause                      | Solution                           |
|-------------------------|----------------------------|------------------------------------|
| CORS Error              | n8n pas configuré          | Ajouter headers CORS dans n8n      |
| Network Timeout         | Webhook trop lent          | Augmenter timeout fetch à 30s      |
| Invalid JSON            | Mauvaise structure données | Vérifier console.log PatientData   |
| 500 Internal Error      | Erreur workflow n8n        | Checker logs n8n execution         |

---

## 🚀 Roadmap Futures Features

### Phase 2 (Court terme)
- [ ] Historique des consultations
- [ ] Export PDF du diagnostic
- [ ] Envoi email résultats
- [ ] Version mobile (PWA)

### Phase 3 (Moyen terme)
- [ ] Authentification utilisateur
- [ ] Dashboard admin
- [ ] Analytics avancées
- [ ] Multi-langue (EN/FR)

### Phase 4 (Long terme)
- [ ] Upload photos symptômes
- [ ] Intégration calendrier RDV
- [ ] Chatbot conversationnel
- [ ] API publique pour partenaires

---

## 📚 Ressources & Documentation

### Fichiers Importants
- `INTEGRATION_GUIDE.md` - Guide détaillé bonnes pratiques
- `N8N_WORKFLOW_EXAMPLE.json` - Workflow n8n prêt à l'emploi
- `src/app/App.tsx` - Code source principal

### Technologies Utilisées
- **Frontend** : React 18.3, TypeScript, Tailwind CSS v4
- **Icons** : Lucide React
- **Automation** : n8n
- **AI** : OpenAI GPT-4 ou Anthropic Claude
- **Database** : PostgreSQL

---

## 👨‍💻 Auteur

**Projet Étudiant** - Plateforme de Santé IA  
📅 Date : Avril 2026  
📝 Version : 1.0.0

---

## ⚠️ Disclaimer

**IMPORTANT** : Cette plateforme est un projet éducatif. Les informations fournies ne constituent pas un avis médical professionnel et ne doivent pas remplacer une consultation médicale. En cas d'urgence, appelez le 112.

---

## 📄 License

Projet éducatif - Usage académique uniquement
