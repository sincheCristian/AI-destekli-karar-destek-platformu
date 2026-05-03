# 🏥 Yapay Zeka Destekli Sağlık Karar Platformu

> Plateforme de diagnostic IA avec architecture modulaire - Prêt pour démo et production

---

## 🎯 Vue d'Ensemble

Application web moderne permettant aux patients d'obtenir une analyse IA de leurs symptômes. Architecture **modulaire** avec composants React séparés, prête pour démo et facile à connecter à une vraie base de données.

### ✨ Fonctionnalités

- ✅ Formulaire patient simplifié (âge, genre, symptômes, température)
- ✅ Animation de chargement 5 secondes
- ✅ Affichage résultats : diagnostic, urgence, recommandations, protocole
- ✅ Mock API intégré pour démo
- ✅ Architecture modulaire (7 composants séparés)
- ✅ Prêt pour intégration backend

---

## 📁 Structure du Projet

```
src/
├── app/
│   ├── App.tsx                    # Point d'entrée (70 lignes)
│   └── components/
│       ├── Header.tsx             # En-tête
│       ├── HeroSection.tsx        # Formulaire patient
│       ├── PlaceholderCards.tsx   # Cartes placeholders
│       ├── ResultsSection.tsx     # Résultats diagnostic
│       ├── Disclaimer.tsx         # Avertissement légal
│       ├── Footer.tsx             # Pied de page
│       └── figma/
│           └── ImageWithFallback.tsx
└── services/
    └── apiService.ts              # Logique API centralisée
```

---

## 🚀 Démarrage Rapide

### Mode Démo (Sans Backend)

L'application fonctionne **immédiatement** en mode démo avec mock API :

```bash
# Le serveur dev est déjà lancé dans Figma Make
# Ouvrir simplement l'aperçu
```

**Tester** :
1. Remplir : Âge (25), Cinsiyet (Erkek), Sıcaklık (39), Semptomlar (ateş, titreme)
2. Cliquer "Analiz Et ve Karar Ver"
3. Attendre 5 secondes → Résultats s'affichent

---

## 🔌 Connecter à une Vraie Base de Données

### Fichier à Modifier : `src/services/apiService.ts`

**Ligne 30** : Remplacer `mockAnalyzeSymptoms` par votre API

```typescript
// AVANT (Mock)
export async function mockAnalyzeSymptoms(data: PatientData) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { /* mock data */ };
}

// APRÈS (Production)
export async function analyzeSymptoms(data: PatientData) {
  const response = await fetch('https://votre-api.com/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

**Puis dans `src/app/App.tsx` ligne 37** :
```typescript
// Remplacer
const result = await mockAnalyzeSymptoms(patientData);
// Par
const result = await analyzeSymptoms(patientData);
```

**C'est tout !** 🎉

---

## 📊 Données Collectées

```typescript
{
  name: string;          // Obligatoire - Nom complet du patient
  email: string;         // Obligatoire - Adresse e-mail
  age: string;           // Obligatoire
  gender: string;        // Obligatoire (erkek/kadin/diger)
  symptoms: string;      // Obligatoire (texte libre)
  temperature: string;   // Optionnel (35-45°C)
  timestamp: string;     // Auto-généré (ISO 8601)
}
```

---

## 📈 Format Réponse API Attendu

Votre backend doit retourner ce JSON :

```json
{
  "success": true,
  "patientId": "PAT-123456789",
  "diseases": [
    { "name": "Sıtma", "probability": 70, "color": "#dc2626" },
    { "name": "Grip", "probability": 20, "color": "#f59e0b" }
  ],
  "urgency": "ACİL",
  "urgencyMessage": "Lütfen sağlık kuruluşuna başvurun",
  "recommendations": ["Bol sıvı", "Ateş düşürücü", "Dinlenin"],
  "dayOneProtocol": ["Sıcaklık kontrolü", "Test", "3L su"]
}
```

---

## 🛠️ Technologies

- **Frontend** : React 18.3 + TypeScript
- **Styling** : Tailwind CSS v4
- **Icons** : Lucide React
- **State** : React Hooks
- **Build** : Vite

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| `DEMO_READY.md` | ⭐ Guide complet intégration BD |
| `INTEGRATION_GUIDE.md` | Bonnes pratiques n8n |
| `N8N_WORKFLOW_EXAMPLE.json` | Workflow n8n prêt à l'emploi |
| `API_INTEGRATION_EXAMPLES.ts` | Exemples code API |
| `QUICK_START_GUIDE.md` | Démarrage production 35 min |

---

## ✅ Statut du Projet

- [x] Architecture modulaire
- [x] Composants séparés
- [x] Mock API fonctionnel
- [x] Animation loading
- [x] Affichage résultats
- [x] Validation frontend
- [x] Documentation complète
- [ ] Connexion backend réelle
- [ ] Tests production
- [ ] Analytics

---

## 🎨 Personnalisation

### Modifier les couleurs
```typescript
// Rechercher et remplacer dans tous les fichiers
#0056b3 → VOTRE_COULEUR_PRIMAIRE
```

### Ajouter un champ au formulaire
Fichier : `src/app/components/HeroSection.tsx`

```typescript
const [nouveauChamp, setNouveauChamp] = useState('');

// Ajouter dans JSX
<input value={nouveauChamp} onChange={(e) => setNouveauChamp(e.target.value)} />

// Passer au parent
onAnalysisStart({ age, gender, symptoms, temperature, nouveauChamp });
```

---

## 🔒 Sécurité

⚠️ **Important pour Production** :

- [ ] Activer HTTPS (obligatoire)
- [ ] Valider inputs côté serveur
- [ ] Rate limiting (max 5 req/min)
- [ ] Sanitization XSS
- [ ] Consentement RGPD/KVKK
- [ ] Chiffrement données médicales

---

## 📞 Support

### Debug
```typescript
// Activer logs détaillés
localStorage.setItem('DEBUG', 'true');
```

### Erreurs Communes

| Erreur | Solution |
|--------|----------|
| Formulaire vide | Remplir champs obligatoires (*) |
| Pas de résultats | Vérifier console (F12) |
| API timeout | Augmenter timeout dans apiService.ts |

---

## 📄 License

Projet éducatif - Usage académique uniquement

---

## ⚠️ Disclaimer

**Cette plateforme est un projet étudiant.** Les informations ne constituent pas un avis médical professionnel. En cas d'urgence, appelez le **112**.

---

**Version** : 2.0  
**Statut** : ✅ DEMO READY  
**Dernière mise à jour** : Avril 2026

---

## 🎯 Quick Links

- 📖 [Guide Intégration BD](./DEMO_READY.md)
- 🔧 [Exemples API](./API_INTEGRATION_EXAMPLES.ts)
- 🚀 [Quick Start Production](./QUICK_START_GUIDE.md)
- 🔄 [Workflow n8n](./N8N_WORKFLOW_EXAMPLE.json)
