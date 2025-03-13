import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useUser } from "../contexts/UserContext";
import Notifications from "./Notifications";

function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const { currentUser, logout } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  // Menü dışına tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`py-4 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm transition-colors duration-300 sticky top-0 z-30`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo ve başlık */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h1
              className={`ml-3 text-xl font-semibold transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Görevio
            </h1>
          </div>

          {/* Sağ taraftaki kontroller */}
          <div className="flex items-center space-x-3">
            {currentUser && <Notifications />}

            {/* Tema değiştirici */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-200 ${
                darkMode
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-100 text-indigo-600"
              }`}
              aria-label="Tema değiştir"
              title={darkMode ? "Açık tema" : "Koyu tema"}
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Kullanıcı menüsü */}
            {currentUser && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={`flex items-center space-x-2 py-1 px-2 rounded-full transition-colors duration-200
                    ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || currentUser.email}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-700"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold 
                      bg-gradient-to-br from-blue-500 to-indigo-600"
                    >
                      {currentUser.displayName?.charAt(0) ||
                        currentUser.email?.charAt(0) ||
                        "?"}
                    </div>
                  )}
                  <span
                    className={`text-sm font-medium hidden sm:inline transition-colors duration-300 ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {currentUser.displayName ||
                      currentUser.email?.split("@")[0]}
                  </span>
                </button>

                {showProfileMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-48 py-2 rounded-lg shadow-xl z-10 transition-colors duration-300
                    ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white border border-gray-100"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 border-b transition-colors duration-300 ${
                        darkMode ? "border-gray-700" : "border-gray-100"
                      }`}
                    >
                      <p
                        className={`font-medium text-sm transition-colors duration-300 ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {currentUser.displayName ||
                          currentUser.email?.split("@")[0]}
                      </p>
                      <p
                        className={`text-xs truncate transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {currentUser.email}
                      </p>
                    </div>
                    <button
                      onClick={logout}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center transition-colors duration-200
                        ${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
