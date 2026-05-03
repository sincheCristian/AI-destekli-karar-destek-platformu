# 🏥 Guide d'Intégration n8n - Plateforme de Santé IA

## 📊 Structure des Données Envoyées

### Format JSON pour n8n Webhook
```json
{
  "age": "25",
  "gender": "erkek",
  "symptoms": "2 gündür yüksek ateşim var (39°C)\n- Şiddetli titreme ve terleme\n- Baş ağrısı",
  "temperature": "39",
  "duration": "1-3-gun",
  "location": "İstanbul",
  "timestamp": "2026-04-27T10:30:00.000Z"
}
```

---

## ✅ BONNES PRATIQUES (Ce qu'il FAUT faire)

### 1. Collecte de Données Structurées
- ✅ **Âge** : Essentiel pour le diagnostic (maladies pédiatriques vs adultes)
- ✅ **Genre** : Certaines maladies sont genre-spécifiques
- ✅ **Durée des symptômes** : Différencie aigu vs chronique
- ✅ **Température** : Indicateur clé de fièvre/infection
- ✅ **Localisation** : Important pour maladies endémiques (malaria, dengue)
- ✅ **Timestamp** : Pour traçabilité et analyse temporelle

### 2. Validation Frontend
- ✅ Champs obligatoires (*) clairement marqués
- ✅ Types de données corrects (number, select, textarea)
- ✅ Limites réalistes (âge: 0-120, température: 35-45°C)
- ✅ Placeholder avec exemples concrets
- ✅ Désactivation du formulaire pendant l'analyse

### 3. UX/UI Médical
- ✅ Instructions claires avant le formulaire
- ✅ Icônes médicales professionnelles
- ✅ Codes couleur médicaux (bleu = confiance, vert = action, rouge = urgence)
- ✅ Feedback visuel (barre de progression)
- ✅ Messages en temps réel

### 4. Préparation n8n
- ✅ Interface TypeScript pour typage fort
- ✅ Console.log pour debugging
- ✅ Structure JSON standardisée
- ✅ Timestamp ISO 8601 pour compatibilité base de données

---

## ❌ MAUVAISES PRATIQUES (Ce qu'il NE FAUT PAS faire)

### 1. Données Non-Structurées
- ❌ Collecter uniquement du texte libre sans métadonnées
- ❌ Pas de validation des entrées utilisateur
- ❌ Accepter des valeurs absurdes (âge: -5, température: 100°C)
- ❌ Pas de gestion des champs vides

### 2. UX Confuse
- ❌ Formulaires trop longs sans instructions
- ❌ Jargon médical complexe sans explication
- ❌ Pas de feedback pendant le chargement
- ❌ Erreurs techniques visibles à l'utilisateur

### 3. Sécurité & Privacy
- ❌ Stocker des données médicales sans consentement
- ❌ Afficher des clés API dans le frontend
- ❌ Pas de HTTPS en production
- ❌ Pas de disclaimer légal

### 4. Performance
- ❌ Envoyer des requêtes multiples inutiles
- ❌ Pas de debouncing sur les inputs
- ❌ Charger des images lourdes non optimisées
- ❌ Pas de gestion d'erreur réseau

---

## 🔧 Configuration n8n

### Étape 1 : Créer un Webhook Node
```javascript
// Dans n8n, créer un nœud Webhook
// Method: POST
// Path: /health-analysis
// Response Mode: When Last Node Finishes
```

### Étape 2 : Parser les Données
```javascript
// Nœud Function pour traiter les données
const patientData = $input.item.json.body;

return {
  age: parseInt(patientData.age),
  gender: patientData.gender,
  symptoms: patientData.symptoms,
  temperature: parseFloat(patientData.temperature) || null,
  duration: patientData.duration,
  location: patientData.location || 'Unknown',
  timestamp: new Date(patientData.timestamp)
};
```

### Étape 3 : Intégration Base de Données
```sql
-- Table PostgreSQL/MySQL recommandée
CREATE TABLE patient_consultations (
  id SERIAL PRIMARY KEY,
  age INTEGER NOT NULL,
  gender VARCHAR(10) NOT NULL,
  symptoms TEXT NOT NULL,
  temperature DECIMAL(3,1),
  duration VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  diagnosis_result JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Étape 4 : AI/ML Integration
```javascript
// Nœud HTTP Request vers API OpenAI/Claude
const prompt = `
Vous êtes un assistant médical IA.
Patient: ${age} ans, ${gender}
Symptômes: ${symptoms}
Température: ${temperature}°C
Durée: ${duration}
Localisation: ${location}

Fournissez:
1. Top 3 diagnostics probables avec pourcentages
2. Niveau d'urgence (ACİL/RANDEVU/GÖZLENİM)
3. Recommandations sans ordonnance
4. Protocole 1er jour
`;
```

---

## 🎯 Intégration Frontend → n8n

### Remplacer dans App.tsx (ligne ~45)
```typescript
// AVANT (Mock)
console.log('Données envoyées à n8n:', patientData);

// APRÈS (Production)
try {
  const response = await fetch('VOTRE_URL_N8N_WEBHOOK', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientData)
  });

  const result = await response.json();
  
  // Stocker le résultat pour affichage
  setDiagnosisResult(result);
  
} catch (error) {
  console.error('Erreur n8n:', error);
  alert('Une erreur est survenue. Veuillez réessayer.');
}
```

---

## 📋 Checklist Avant Production

- [ ] Remplacer l'URL webhook mock par l'URL n8n réelle
- [ ] Tester avec données valides et invalides
- [ ] Configurer CORS sur n8n
- [ ] Ajouter gestion d'erreurs réseau
- [ ] Implémenter rate limiting (max 5 requêtes/minute)
- [ ] Chiffrer les données sensibles (HTTPS obligatoire)
- [ ] Ajouter consentement RGPD/KVKK
- [ ] Logger les erreurs (Sentry, LogRocket)
- [ ] Tester sur mobile (responsive)
- [ ] Ajouter analytics (événements: form_start, form_submit, error)

---

## 🚀 Améliorations Futures

1. **Historique Patient** : Stocker consultations précédentes
2. **Export PDF** : Générer rapport diagnostic PDF
3. **Notifications** : Email/SMS avec résultats
4. **Multi-langue** : Support EN/TR/FR
5. **Upload Images** : Analyser photos de symptômes
6. **Géolocalisation Auto** : Détecter localisation pour maladies régionales
7. **Chatbot** : Poser questions de suivi automatiquement
8. **Intégration Calendrier** : Prendre RDV directement

---

## 📞 Support & Debug

### Console Browser
```javascript
// Activer debug mode
localStorage.setItem('DEBUG', 'true');

// Voir données envoyées
console.log('Patient Data:', patientData);
```

### Erreurs Communes
- **CORS Error** : Configurer headers dans n8n
- **Timeout** : Augmenter timeout fetch (30s recommandé)
- **Invalid JSON** : Vérifier structure données envoyées
- **500 Error** : Vérifier logs n8n workflow

---

**Auteur** : Plateforme Sağlık IA  
**Version** : 1.0  
**Date** : 2026-04-27
