import { createContext, useState, useContext, useEffect } from 'react';

// Tema renk paleti
const themeColors = {
  light: {
    bg: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      accent: 'bg-blue-50',
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      muted: 'text-gray-500',
    },
    border: 'border-gray-200',
    shadow: 'shadow-sm',
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    }
  },
  dark: {
    bg: {
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      accent: 'bg-gray-750',
    },
    text: {
      primary: 'text-white',
      secondary: 'text-gray-200',
      muted: 'text-gray-400',
    },
    border: 'border-gray-700',
    shadow: 'shadow-lg shadow-gray-900/30',
    button: {
      primary: 'bg-blue-600 hover:bg-blue-500 text-white',
      secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
    }
  }
};

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [colors, setColors] = useState(themeColors.light);

  // Tema için localStorage kontrolü ve sistem teması kontrolü
  useEffect(() => {
    // Önce localStorage'ı kontrol et
    const savedTheme = localStorage.getItem('theme');
    
    // Eğer localStorage'da tema yoksa, sistem temasını kontrol et
    if (savedTheme === null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    } else {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Renkleri güncelle
  useEffect(() => {
    setColors(darkMode ? themeColors.dark : themeColors.light);
    // HTML sınıfını güncelle (Tailwind dark: önekleri için)
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Tema değişikliğini localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const value = {
    darkMode,
    colors,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
