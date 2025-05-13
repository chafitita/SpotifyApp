import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

export function Callback() { 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get("code");
        const receivedState = urlParams.get("state");
        const storedState = localStorage.getItem('spotify_auth_state');

        if (!code) {
          throw new Error("No se encontró el código de autorización");
        }

        if (!receivedState || receivedState !== storedState) {
          localStorage.removeItem('spotify_auth_state');
          throw new Error("El parámetro 'state' no coincide. Posible ataque CSRF.");
        }
        localStorage.removeItem('spotify_auth_state');

        const response = await axios.post(
          `${backendBaseUrl}/api/spotify/exchange-token`,
          { code: code },
          { headers: { "Content-Type": "application/json" } }
        );


        const { access_token, expires_in, refresh_token } = response.data;

        if (!access_token) {
            throw new Error("No se recibió el token de acceso desde el backend.");
        }

        localStorage.setItem("spotify_access_token", access_token);

        const expiresInMilliseconds = expires_in * 1000;
        const expiryTime = Date.now() + expiresInMilliseconds;
        localStorage.setItem("spotify_token_expiry", expiryTime.toString());

        if (refresh_token) {
            localStorage.setItem("spotify_refresh_token", refresh_token);
        }

        navigate("/");
      } catch (error) {
        console.error("Error en la autenticación:", error.message || error);
        navigate("/login", { state: { error: "Error al iniciar sesión con Spotify. Intenta de nuevo." } });
      }
    };

    handleAuth();
  }, [navigate, location]);

  return <div>Procesando autenticación...</div>;
}