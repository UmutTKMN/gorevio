import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';
import TodoItem from './TodoItem';

function TodoList({ onTodoClick }) {
  const { darkMode } = useTheme();
  const { filteredTodos } = useTodos();

  if (filteredTodos.length === 0) {
    return (
      <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-lg">Görev bulunamadı</p>
        <p className="mt-2">Yeni bir görev ekleyin veya farklı bir filtre seçin</p>
      </div>
    );
  }

  return (
    <ul>
      {filteredTodos.map((todo, index) => (
        <li 
          key={todo.id}
          onClick={() => onTodoClick(todo.id)}
          className="todo-item cursor-pointer"
        >
          <TodoItem todo={todo} index={index} />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
