# 🚀 GUIDE DE DÉMARRAGE RAPIDE

## ✅ Checklist Mise en Production

### 📋 ÉTAPE 1 : Configuration n8n (15 min)

- [ ] **Importer le workflow**
  ```bash
  1. Ouvrir n8n
  2. Menu → Import from File
  3. Sélectionner N8N_WORKFLOW_EXAMPLE.json
  ```

- [ ] **Configurer les credentials**
  - [ ] PostgreSQL (base de données)
  - [ ] OpenAI API (GPT-4) OU Anthropic Claude
  - [ ] Telegram (optionnel - pour alertes urgence)
  - [ ] Email SMTP (optionnel - pour notifications)

- [ ] **Activer le webhook**
  - [ ] Cliquer sur nœud "Webhook"
  - [ ] Copier URL générée (ex: `https://n8n.example.com/webhook/abc123`)

---

### 🗄️ ÉTAPE 2 : Base de Données PostgreSQL (5 min)

```sql
-- Exécuter ce script SQL
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

CREATE INDEX idx_created_at ON patient_consultations(created_at DESC);
CREATE INDEX idx_severity ON patient_consultations(severity);
```

**Vérification** :
```sql
SELECT COUNT(*) FROM patient_consultations; -- Doit retourner 0
```

---

### 💻 ÉTAPE 3 : Configuration Frontend (10 min)

#### Option A : Production (Recommandé)
```typescript
// Dans src/app/App.tsx, ligne ~45

// AVANT (Mock)
console.log('Données envoyées à n8n:', patientData);

// APRÈS (Production)
try {
  const response = await fetch('VOTRE_URL_N8N_WEBHOOK_ICI', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData)
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const result = await response.json();
  console.log('Résultat:', result);

  // TODO: Stocker et afficher le résultat
  // setDiagnosisResult(result);

} catch (error) {
  console.error('Erreur:', error);
  alert('Une erreur est survenue. Veuillez réessayer.');
}
```

#### Option B : Développement (Test avec Mock)
```typescript
// Utiliser mockDiagnosisAPI pour tester sans backend
import { mockDiagnosisAPI } from './API_INTEGRATION_EXAMPLES';

const result = await mockDiagnosisAPI(patientData);
```

---

### 🧪 ÉTAPE 4 : Test du Système (5 min)

#### Test 1 : Formulaire
- [ ] Remplir tous les champs obligatoires
- [ ] Vérifier validation (âge incorrect → erreur)
- [ ] Cliquer "Analiz Et ve Karar Ver"
- [ ] Observer barre de progression (5 secondes)

#### Test 2 : n8n Workflow
- [ ] Ouvrir n8n → Executions
- [ ] Vérifier qu'une nouvelle exécution apparaît
- [ ] Vérifier statut = ✅ Success (pas ❌ Error)
- [ ] Ouvrir l'exécution → voir données JSON

#### Test 3 : Base de Données
```sql
SELECT * FROM patient_consultations ORDER BY created_at DESC LIMIT 1;
```
**Attendu** : Une ligne avec vos données test

#### Test 4 : Résultat Frontend
- [ ] Les 3 cartes placeholders s'activent
- [ ] Données affichées (maladies, recommandations, protocole)
- [ ] Pas d'erreur dans Console navigateur (F12)

---

### 🎨 ÉTAPE 5 : Personnalisation (Optionnel)

#### Changer les couleurs
```typescript
// Dans src/app/App.tsx
// Remplacer #0056b3 par votre couleur primaire
text-[#0056b3] → text-[#VOTRE_COULEUR]
```

#### Modifier le logo
```typescript
// Ligne ~80 dans App.tsx
<Activity className="w-9 h-9 text-[#0056b3]" />
// Remplacer par votre logo
```

#### Ajouter des champs
```typescript
// Exemple : Ajouter poids
const [weight, setWeight] = useState('');

<input
  type="number"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
  placeholder="Kilo (kg)"
/>
```

---

## 🐛 Dépannage Express

| ❌ Problème | ✅ Solution |
|------------|------------|
| **CORS Error** | Dans n8n → Webhook Settings → Add CORS Headers: `Access-Control-Allow-Origin: *` |
| **Timeout** | Augmenter timeout : `signal: AbortSignal.timeout(60000)` (60s) |
| **400 Bad Request** | Vérifier structure JSON envoyée avec `console.log(patientData)` |
| **500 Server Error** | Vérifier logs n8n → Executions → Détails de l'erreur |
| **Pas de données en DB** | Vérifier connexion PostgreSQL dans n8n credentials |
| **AI ne répond pas** | Vérifier clé API OpenAI valide et crédit disponible |

---

## 📊 Monitoring & Analytics

### Logs à Surveiller

#### 1. Frontend (Console Navigateur)
```javascript
// Activer debug mode
localStorage.setItem('DEBUG', 'true');
```

#### 2. n8n (Executions)
- Taux de succès : **>95%** ✅
- Temps d'exécution : **<10s** ✅
- Erreurs : **<5%** ⚠️

#### 3. Base de Données
```sql
-- Consultations par jour
SELECT DATE(created_at), COUNT(*)
FROM patient_consultations
GROUP BY DATE(created_at)
ORDER BY DATE(created_at) DESC;

-- Urgences (ACİL)
SELECT COUNT(*)
FROM patient_consultations
WHERE severity = 'HIGH';
```

---

## 🎯 Prochaines Étapes

### Priorité Haute 🔴
1. [ ] Implémenter affichage résultats réels (pas mock)
2. [ ] Ajouter gestion erreurs réseau
3. [ ] Tester en conditions réelles (10+ consultations)
4. [ ] Activer HTTPS (Let's Encrypt)

### Priorité Moyenne 🟡
5. [ ] Ajouter authentification utilisateur
6. [ ] Créer dashboard admin
7. [ ] Export PDF résultats
8. [ ] Notifications email

### Priorité Basse 🟢
9. [ ] Historique consultations
10. [ ] Multi-langue (EN/FR)
11. [ ] Version mobile (PWA)
12. [ ] Analytics avancées

---

## 📞 Support & Ressources

### Documentation Complète
- 📖 `INTEGRATION_GUIDE.md` - Bonnes pratiques détaillées
- 🔧 `API_INTEGRATION_EXAMPLES.ts` - Exemples code prêts à l'emploi
- 📋 `README_PROJET.md` - Vue d'ensemble complète
- 🔄 `N8N_WORKFLOW_EXAMPLE.json` - Workflow n8n

### Outils Utiles
- [n8n Documentation](https://docs.n8n.io/)
- [OpenAI API Reference](https://platform.openai.com/docs/)
- [PostgreSQL Guide](https://www.postgresql.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Debug Tools
```javascript
// Console navigateur (F12)
console.table(patientData); // Afficher données structurées
console.time('API Call'); fetch(...); console.timeEnd('API Call'); // Mesurer temps
```

---

## ✨ Exemple Complet Fonctionnel

### Configuration Minimale (5 min)
```typescript
// 1. Dans App.tsx
const N8N_URL = 'https://your-n8n.com/webhook/abc123';

const handleAnalysis = async () => {
  const data = { age, gender, symptoms, temperature, duration, location, timestamp: new Date().toISOString() };

  setIsAnalyzing(true);

  try {
    const res = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result);
    setShowResults(true);

  } catch (err) {
    alert('Erreur: ' + err.message);
  } finally {
    setIsAnalyzing(false);
  }
};
```

**C'est tout !** 🎉

---

## 🏁 Validation Finale

Avant de considérer le projet terminé :

- [ ] ✅ Formulaire fonctionne sans erreur
- [ ] ✅ Données arrivent dans n8n
- [ ] ✅ Données sauvegardées en base
- [ ] ✅ IA retourne diagnostic
- [ ] ✅ Résultats affichés frontend
- [ ] ✅ Disclaimer légal visible
- [ ] ✅ HTTPS activé (production)
- [ ] ✅ Tests avec 10+ cas différents

**Si tous les ✅ cochés → PROJET PRÊT ! 🚀**

---

**Temps total estimé : 35-45 minutes** ⏱️

Bon courage ! 💪
