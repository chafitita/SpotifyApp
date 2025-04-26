import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

function Callback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");

      if (!code) {
        console.error("No se encontró code");
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/auth/callback', 
            qs.stringify({ code }), 
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              }
            }
        )
        
        console.log("Code recibido:", code);

        const accessToken = response.data.access_token;
        window.localStorage.setItem("spotify_access_token", accessToken);

        navigate("/");
      } catch (error) {
        console.error("Error al obtener access_token desde backend", error);
      }
    };

    fetchToken();
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Conectando con Spotify...</h2>
    </div>
  );
}

export default Callback;
