import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const isLoggedIn = localStorage.getItem('loggedIn');

  return isLoggedIn ? children : null;
}

export default ProtectedRoute;
