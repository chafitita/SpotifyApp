require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://shyntify.netlify.app/',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

app.post('/api/spotify/exchange-token', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', SPOTIFY_REDIRECT_URI);

  try {
    const spotifyResponse = await axios.post(
      SPOTIFY_TOKEN_ENDPOINT,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
      }
    );
    res.json({
      access_token: spotifyResponse.data.access_token,
      refresh_token: spotifyResponse.data.refresh_token,
      expires_in: spotifyResponse.data.expires_in
    });
  } catch (error) {
    console.error('Error exchanging token with Spotify:', error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to exchange token with Spotify' });
  }
});

app.post('/api/spotify/refresh-token', async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) {
        return res.status(400).json({ error: "Refresh token is missing" });
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);

    try {
        const spotifyResponse = await axios.post(
            SPOTIFY_TOKEN_ENDPOINT,
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
                }
            }
        );
        res.json({
            access_token: spotifyResponse.data.access_token,
            expires_in: spotifyResponse.data.expires_in,
        });
    } catch (error) {
        console.error('Error refreshing token with Spotify:', error.response ? error.response.data : error.message);
        res.status(error.response?.status || 500).json({ error: 'Failed to refresh token' });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor de backend para Spotify escuchando en el puerto ${PORT}`);
});