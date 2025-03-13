import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';

function TodoFooter() {
  const { darkMode } = useTheme();
  const { todos, clearCompletedTasks } = useTodos();
  
  const activeTodoCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center flex-wrap gap-3`}>
      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="font-medium">{activeTodoCount}</span> görev tamamlanmayı bekliyor
      </div>
      {hasCompletedTodos && (
        <button 
          onClick={clearCompletedTasks}
          className={`text-sm py-1 px-3 rounded hover:bg-opacity-80 transition ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
        >
          Tamamlananları Temizle
        </button>
      )}
    </div>
  );
}

export default TodoFooter;
