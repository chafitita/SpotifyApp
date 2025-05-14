import { useEffect } from 'react';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI || "https://shyntify.netlify.app/callback";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-library-read"
].join(" ");

function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function Login() {
  const handleLogin = () => {
    const state = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', state);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: scopes,
      state: state,
      show_dialog: true
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  return (
    <div className="login-container">
      <h1>Bienvenido a Synthify</h1>
      <button onClick={handleLogin} className="login-btn">
        Login con Spotify
      </button>
    </div>
  );
}