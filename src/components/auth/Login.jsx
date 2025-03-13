import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/ThemeContext';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, authError } = useUser();
  const { darkMode } = useTheme();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-xl max-w-md w-full mx-auto`}>
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Todo Uygulamasına Hoş Geldiniz
        </h2>
        <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Görevlerinizi yönetmek için giriş yapın
        </p>
      </div>
      
      {authError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
          <p>{authError}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <button 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-lg font-medium transition duration-200 ${
            darkMode 
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="w-6 h-6"
          />
          {isLoading ? 'Giriş yapılıyor...' : 'Google ile Giriş Yap'}
        </button>
        
        <div className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>Google hesabınızı kullanarak güvenli bir şekilde giriş yapın</p>
          <p className="mt-2">Hesabınız yoksa, otomatik olarak oluşturulacaktır.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
