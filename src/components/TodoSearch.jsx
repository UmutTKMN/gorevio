import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';

function TodoSearch() {
  const { darkMode } = useTheme();
  const { searchQuery, setSearchQuery, sortMethod, setSortMethod } = useTodos();

  return (
    <div className={`mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-3`}>
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Görevlerde ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`pl-10 w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
            aria-label="Aramayı temizle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="flex items-center shrink-0">
        <label className={`mr-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Sıralama:
        </label>
        <select 
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
          className={`p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        >
          <option value="default">Varsayılan</option>
          <option value="priority">Öncelik</option>
          <option value="alphabetical">Alfabetik</option>
          <option value="dueDate">Son Tarih</option>
          <option value="date">Eklenme Tarih</option>
        </select>
      </div>
    </div>
  );
}

export default TodoSearch;
