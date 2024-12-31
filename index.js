const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB-Verbindungsstring (Ersetze mit deinem eigenen Verbindungsstring)
const uri = "mongodb+srv://timschaeferkontakt:77Zeichen%21@cluster0.42sox.mongodb.net/WixUserDatabase?retryWrites=true&w=majority";

app.use(express.json()); // Damit JSON-Daten empfangen werden können

// POST-Route für das Hinzufügen eines Banners
app.post('/addBanner', async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("adSystem");
        const collection = database.collection("banners");

        const banner = req.body;  // Banner-Daten aus der Anfrage
        const result = await collection.insertOne(banner);

        res.status(200).json({ success: true, id: result.insertedId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
