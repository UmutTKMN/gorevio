import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import TodoModal from './modal/TodoModal';

function TodoContainer() {
  const { darkMode } = useTheme();
  const { filteredTodos, loading } = useTodos();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const handleTodoClick = (id) => {
    setSelectedTodoId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTodoId(null);
  };

  if (loading) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8 flex justify-center items-center transition-colors duration-300`}>
        <div className="flex flex-col items-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className={`mt-3 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Görevleriniz yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-colors duration-300`}>
        <TodoList onTodoClick={handleTodoClick} />
        <TodoFooter />
      </div>

      <TodoModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        todoId={selectedTodoId} 
      />
    </>
  );
}

export default TodoContainer;
