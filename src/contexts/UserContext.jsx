import { createContext, useState, useContext, useEffect } from 'react';
import { auth, signInWithGoogle, logoutUser } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(true);

  // Firebase auth state değişikliklerini dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Kullanıcı oturum açtı
        const userData = {
          id: user.uid,
          displayName: user.displayName || user.email.split('@')[0],
          email: user.email,
          photoURL: user.photoURL,
          createdAt: user.metadata.creationTime
        };
        setCurrentUser(userData);
        setIsAuthenticated(true);
      } else {
        // Kullanıcı oturum açmadı
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google ile giriş
  const login = async () => {
    setAuthError('');
    const result = await signInWithGoogle();
    
    if (!result.success) {
      setAuthError(result.error || 'Google ile giriş başarısız');
      return false;
    }
    
    return true;
  };

  // Çıkış yapma
  const logout = async () => {
    const result = await logoutUser();
    if (!result.success) {
      setAuthError(result.error || 'Çıkış yapma hatası');
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    authError,
    loading,
    login,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}
