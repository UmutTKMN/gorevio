import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';

function TodoStats() {
  const { darkMode } = useTheme();
  const { todos } = useTodos();
  const [showStats, setShowStats] = useState(false);

  if (todos.length === 0) {
    return null;
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const completionRate = Math.round((completedCount / todos.length) * 100);
  
  const highPriorityCount = todos.filter(todo => todo.priority === 'high').length;
  const mediumPriorityCount = todos.filter(todo => todo.priority === 'medium').length;
  const lowPriorityCount = todos.filter(todo => todo.priority === 'low').length;

  const withDueDateCount = todos.filter(todo => todo.dueDate).length;
  const overdueCount = todos.filter(todo => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  }).length;

  const toggleStats = () => setShowStats(!showStats);

  return (
    <div className={`mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-colors duration-300`}>
      <div 
        onClick={toggleStats}
        className={`p-4 flex justify-between items-center cursor-pointer transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
      >
        <h3 className={`font-medium transition-colors duration-300 ${darkMode ? 'text-gray-200' : 'text-gray-800'} flex items-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 6a1 1 0 000 2h9a1 1 0 100-2H3zm0 6a1 1 0 100 2h5a1 1 0 100-2H3z" clipRule="evenodd" />
          </svg>
          İstatistikler
        </h3>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${showStats ? 'transform rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      
      {showStats && (
        <div className={`p-4 transition-colors duration-300 ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Görev Durumu</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Tamamlanma Oranı</span>
                    <span className={darkMode ? 'text-green-400' : 'text-green-600'}>{completionRate}%</span>
                  </div>
                  <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{activeCount}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aktif Görevler</div>
                  </div>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{completedCount}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tamamlanan Görevler</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Öncelik Dağılımı</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Yüksek</span>
                  </div>
                  <div className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{highPriorityCount}</div>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Orta</span>
                  </div>
                  <div className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{mediumPriorityCount}</div>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Düşük</span>
                  </div>
                  <div className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lowPriorityCount}</div>
                </div>
              </div>
              
              <h4 className={`text-sm font-semibold mb-3 mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Zaman</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{withDueDateCount}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Son Tarihli</div>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={`text-xl font-bold ${overdueCount > 0 ? 'text-red-500' : (darkMode ? 'text-gray-200' : 'text-gray-800')}`}>{overdueCount}</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gecikmiş</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoStats;
