import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTodos } from '../../contexts/TodoContext';
import { getPriorityStyle, getPriorityLabel } from '../../utils/helpers';

function TodoModal({ isOpen, onClose, todoId }) {
  const { darkMode } = useTheme();
  const { todos, updateTodo, addTagToTodo, removeTagFromTodo } = useTodos();
  const [todo, setTodo] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [formValues, setFormValues] = useState({});
  const [newTag, setNewTag] = useState('');
  const modalRef = useRef();

  // Todo'yu bul
  useEffect(() => {
    if (todoId) {
      const foundTodo = todos.find(t => t.id === todoId);
      setTodo(foundTodo);
      if (foundTodo) {
        setFormValues({
          text: foundTodo.text || '',
          description: foundTodo.description || '',
          priority: foundTodo.priority || 'medium',
          dueDate: foundTodo.dueDate ? new Date(foundTodo.dueDate).toISOString().slice(0, 16) : '',
        });
      }
    }
  }, [todoId, todos]);

  // Dışarı tıklandığında kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC tuşu ile kapat
  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !todo) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const toggleEditMode = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field]
    });
  };

  const handleSave = (field) => {
    let value = formValues[field];
    
    // Tarih alanı için ISO formatına dönüştür
    if (field === 'dueDate' && value) {
      value = new Date(value).toISOString();
    }
    
    updateTodo(todo.id, { [field]: value });
    toggleEditMode(field);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() === '') return;
    
    addTagToTodo(todo.id, newTag.trim());
    setNewTag('');
  };

  const handleRemoveTag = (tag) => {
    removeTagFromTodo(todo.id, tag);
  };

  // Tarih formatını okunaklı hale getir
  const formatDate = (dateString) => {
    if (!dateString) return 'Belirtilmemiş';
    
    const date = new Date(dateString);
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const priorityStyle = getPriorityStyle(todo.priority);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
        
        <div 
          ref={modalRef}
          className={`relative rounded-lg shadow-xl max-w-2xl w-full transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Modal Başlığı */}
          <div className={`p-6 border-b transition-colors duration-300 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {editMode.text ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  name="text"
                  value={formValues.text}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                  autoFocus
                />
                <button
                  onClick={() => handleSave('text')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => toggleEditMode('text')}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors"
                >
                  İptal
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {todo.text}
                </h2>
                <button
                  onClick={() => toggleEditMode('text')}
                  className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  title="Başlığı düzenle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          {/* Modal İçeriği */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Açıklama */}
              <div className="col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Açıklama
                  </h3>
                  <button
                    onClick={() => toggleEditMode('description')}
                    className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {editMode.description ? (
                  <div className="space-y-2">
                    <textarea
                      name="description"
                      rows="4"
                      value={formValues.description}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    ></textarea>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleSave('description')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-lg transition-colors"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => toggleEditMode('description')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 text-sm rounded-lg transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {todo.description ? (
                      <p className={`whitespace-pre-wrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {todo.description}
                      </p>
                    ) : (
                      <p className={`italic text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Açıklama eklenmemiş
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Öncelik */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Öncelik
                  </h3>
                  <button
                    onClick={() => toggleEditMode('priority')}
                    className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {editMode.priority ? (
                  <div className="space-y-2">
                    <select 
                      name="priority"
                      value={formValues.priority}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      <option value="high">Yüksek Öncelik</option>
                      <option value="medium">Orta Öncelik</option>
                      <option value="low">Düşük Öncelik</option>
                    </select>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleSave('priority')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-lg transition-colors"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => toggleEditMode('priority')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 text-sm rounded-lg transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${priorityStyle.bg}`}>
                    <span className={`font-medium ${priorityStyle.color}`}>
                      {getPriorityLabel(todo.priority)}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Son Tarih */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Son Tarih
                  </h3>
                  <button
                    onClick={() => toggleEditMode('dueDate')}
                    className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {editMode.dueDate ? (
                  <div className="space-y-2">
                    <input
                      type="datetime-local"
                      name="dueDate"
                      value={formValues.dueDate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleSave('dueDate')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-lg transition-colors"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => toggleEditMode('dueDate')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 text-sm rounded-lg transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {formatDate(todo.dueDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Etiketler */}
            <div className="pt-4">
              <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Etiketler
              </h3>
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {todo.tags && todo.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {todo.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                          darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(tag)} 
                          className="ml-1 text-gray-500 hover:text-gray-700" 
                          title="Etiketi kaldır"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className={`italic text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mb-3`}>
                    Etiket eklenmemiş
                  </p>
                )}
                
                <form onSubmit={handleAddTag} className="flex">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Yeni etiket..."
                    className={`flex-grow px-3 py-1 text-sm rounded-l-lg border focus:outline-none focus:ring-2 ${
                      darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-r-lg transition-colors"
                  >
                    Ekle
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className={`px-6 py-4 border-t transition-colors duration-300 ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Oluşturulma: {formatDate(todo.createdAt)}
            </div>
            <div className="flex">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Kapat
              </button>
              <button
                onClick={() => updateTodo(todo.id, { completed: !todo.completed })}
                className={`ml-2 px-4 py-2 rounded-lg ${
                  todo.completed
                    ? (darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600')
                    : (darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600')
                } text-white`}
              >
                {todo.completed ? 'Yapılmadı İşaretle' : 'Tamamlandı İşaretle'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoModal;
