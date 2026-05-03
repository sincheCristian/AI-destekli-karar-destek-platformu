import express from 'express';
import sql from 'mssql'; // On importe 'sql'
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    user: 'nodeuser',
    password: 'getthere',
    server: 'localhost', 
    database: 'SanteAI_DB',
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }
};

app.get('/api/latest-diagnosis', async (req, res) => {
    try {
        // On utilise 'sql' au lieu de 'mssql' ici
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .query(`
                SELECT TOP 1 * FROM Consultations 
                ORDER BY id DESC
            `);
        
        // Si la base est vide, on renvoie un objet vide pour éviter que React crash
        if (result.recordset.length === 0) {
            return res.json({ message: "Aucune donnée trouvée" });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error("Erreur SQL:", err.message);
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Backend lancé sur http://localhost:${PORT}`);
});