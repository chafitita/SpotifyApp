import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import qs from 'qs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());

app.post('/auth/callback', async (req, res) => {
  const { code } = req.body;
  console.log("Code recibido en backend:", code);

  const data = qs.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  });

  console.log("Data enviada a Spotify:", data);

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log("Token recibido de Spotify:", response.data);

    console.log("Body recibido:", req.body);

    res.json(response.data);
  } catch (error) {
    console.error("Error pidiendo token a Spotify:", error.response?.data || error.message);
    console.error("Error pidiendo token a Spotify:", error.response ? error.response.data : error.message);
    res.status(400).json({ error: 'Error al obtener token de Spotify' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
