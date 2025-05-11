export function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      navigate('/login'); // Redirige si no hay código
      return;
    }

    const getToken = async () => {
      try {
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/callback',
            client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
            client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        localStorage.setItem('spotify_access_token', response.data.access_token);
        navigate('/'); // Redirige al home después del login
      } catch (error) {
        console.error('Error:', error);
        navigate('/login');
      }
    };

    getToken();
  }, [navigate]);

  return <div>Autenticando...</div>;
}