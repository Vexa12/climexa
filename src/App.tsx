import { useState, useEffect } from 'react';
import { User } from './types';
import { storage } from './utils/storage';
import WelcomeScreen from './components/WelcomeScreen';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  useEffect(() => {
    const user = storage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleAuthSuccess = (email: string, name: string) => {
    if (authMode === 'register') {
      const existingUser = storage.getUserByEmail(email);
      if (existingUser) {
        alert('Este correo ya está registrado');
        return;
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      storage.addUser(newUser);
      storage.setCurrentUser(newUser);
      setCurrentUser(newUser);
      setAuthMode(null);
    } else {
      const existingUser = storage.getUserByEmail(email);
      if (!existingUser) {
        alert('Usuario no encontrado. Por favor regístrate.');
        return;
      }

      storage.setCurrentUser(existingUser);
      setCurrentUser(existingUser);
      setAuthMode(null);
    }
  };

  const handleLogout = () => {
    storage.setCurrentUser(null);
    setCurrentUser(null);
  };

  if (currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <>
      <WelcomeScreen
        onLogin={() => setAuthMode('login')}
        onRegister={() => setAuthMode('register')}
      />
      {authMode && (
        <AuthForm
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}

export default App;
