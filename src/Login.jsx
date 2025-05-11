
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI || "http://localhost:5173/callback";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-library-read"
].join(" ");

export function Login() {
  const handleLogin = () => {
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: scopes,
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