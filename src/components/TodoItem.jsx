import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';
import { getPriorityStyle, getPriorityLabel } from '../utils/helpers';

function TodoItem({ todo, index }) {
  const [editValue, setEditValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { darkMode } = useTheme();
  const { toggleTodoComplete, deleteTodo, updateTodo, updateTodoText, removeTagFromTodo } = useTodos();
  const priorityStyle = getPriorityStyle(todo.priority);

  const handleEditStart = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = () => {
    if (editValue.trim() === '') return;
    updateTodoText(todo.id, editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    } else if (e.key === 'Enter') {
      handleEditSave();
    }
  };

  // Tarih formatını okunaklı hale getir
  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();
    const isTomorrow = new Date(now.setDate(now.getDate() + 2)).toDateString() === date.toDateString();
    
    const options = { hour: '2-digit', minute: '2-digit' };
    const timeStr = date.toLocaleTimeString('tr-TR', options);
    
    if (isToday) return `Bugün, ${timeStr}`;
    if (isYesterday) return `Dün, ${timeStr}`;
    if (isTomorrow) return `Yarın, ${timeStr}`;
    
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Son tarih geçmiş mi kontrol et
  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRemoveTag = (tag) => {
    removeTagFromTodo(todo.id, tag);
  };

  return (
    <li 
      className={`border-b transition-colors duration-300 ${darkMode ? 'border-gray-700' : 'border-gray-200'} last:border-b-0 
        ${todo.completed ? (darkMode ? 'bg-gray-700/50' : 'bg-gray-50') : isOverdue() ? (darkMode ? 'bg-red-900/10' : 'bg-red-50') : ''}`}
    >
      <div className={`p-4 ${index % 2 === 0 && !todo.completed ? (darkMode ? 'bg-gray-750' : 'bg-gray-50/50') : ''}`}>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              className={`flex-grow p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              value={editValue}
              onChange={handleEditChange}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              onClick={handleEditSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors"
              aria-label="Kaydet"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded transition-colors"
              aria-label="İptal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center flex-grow min-w-0">
                <div className="relative flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodoComplete(todo.id)}
                    className="w-5 h-5 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <div className="ml-3 flex-grow min-w-0">
                  <p 
                    className={`pr-4 ${
                      todo.completed ? `line-through ${darkMode ? 'text-gray-500' : 'text-gray-400'}` : (darkMode ? 'text-gray-100' : 'text-gray-800')
                    } break-words`}
                  >
                    {todo.text}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span 
                      className={`inline-block text-xs px-2 py-1 rounded-full ${priorityStyle.bg} ${priorityStyle.color}`}
                    >
                      {getPriorityLabel(todo.priority)}
                    </span>
                    
                    {todo.dueDate && (
                      <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                        isOverdue() 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatDate(todo.dueDate)}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 space-x-2">
                <button
                  onClick={toggleDetails}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                  title={showDetails ? "Detayları gizle" : "Detayları göster"}
                  aria-label={showDetails ? "Detayları gizle" : "Detayları göster"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                    {showDetails ? (
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    )}
                  </svg>
                </button>
                <button
                  onClick={handleEditStart}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                  title="Düzenle"
                  aria-label="Düzenle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                  title="Sil"
                  aria-label="Sil"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-red-400' : 'text-red-600'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {showDetails && (
              <div className={`mt-4 pl-8 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {todo.description && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold mb-1">Açıklama:</h4>
                    <p className="text-sm whitespace-pre-wrap">{todo.description}</p>
                  </div>
                )}
                
                {todo.createdAt && (
                  <div className="mb-3 text-xs">
                    <span className="font-semibold">Oluşturulma Tarihi:</span>{' '}
                    {formatDate(todo.createdAt)}
                  </div>
                )}
                
                {todo.tags && todo.tags.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold mb-1">Etiketler:</h4>
                    <div className="flex flex-wrap gap-1">
                      {todo.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className={`inline-flex items-center text-xs px-2 py-1 rounded-full 
                            ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {tag}
                          <button 
                            onClick={() => handleRemoveTag(tag)} 
                            className="ml-1 text-gray-500 hover:text-gray-700"
                            aria-label={`${tag} etiketini kaldır`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
