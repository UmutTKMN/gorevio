import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { TodoProvider } from "./contexts/TodoContext";
import { useUser } from "./contexts/UserContext";
import { useTheme } from "./contexts/ThemeContext";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoSearch from "./components/TodoSearch";
import TodoFilters from "./components/TodoFilters";
import TodoStats from "./components/TodoStats";
import TodoContainer from "./components/TodoContainer";
import Login from "./components/auth/Login";

// Ana içerik bileşeni
function TodoApp() {
  const { isAuthenticated, loading } = useUser();
  const { darkMode } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
        <div className="flex flex-col items-center">
          <div className="animate-spin relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-gray-200 dark:border-gray-700"></div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-4">
        <Login />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark:bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <Header />
      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-6">
        <TodoForm />
        <div className="flex flex-row md:flex-row gap-2">
          <div className="w-full">
            <TodoSearch />
            <TodoFilters />
            <TodoStats />
          </div>
        </div>
        <TodoContainer />
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
        <p>&copy; {new Date().getFullYear()} Minimalist Todo App</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <TodoProvider>
          <TodoApp />
        </TodoProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
