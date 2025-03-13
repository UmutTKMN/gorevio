import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';

function TodoForm() {
  const [inputValue, setInputValue] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { darkMode } = useTheme();
  const { addTodo } = useTodos();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isSubmitting) return;
    
    // Son tarihi normalize et
    const normalizedDueDate = dueDate ? new Date(dueDate).toISOString() : null;
    
    // Etiketleri ayır
    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    setIsSubmitting(true);
    
    try {
      await addTodo(inputValue, priority, description, normalizedDueDate, tagArray);
      
      // Formu temizle
      setInputValue('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setTags('');
      setShowAdvanced(false);
    } catch (error) {
      console.error("Görev eklenirken hata oluştu:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg transition-all duration-300`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <input
            type="text"
            placeholder="Yeni görev ekle..."
            className={`flex-grow p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            value={inputValue}
            onChange={handleInputChange}
          />
          
          <select 
            value={priority}
            onChange={handlePriorityChange}
            className={`p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            title="Öncelik"
          >
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
          </select>
        </div>
        
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={toggleAdvanced}
            className={`text-sm flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              {showAdvanced ? (
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              )}
            </svg>
            {showAdvanced ? 'Detayları Gizle' : 'Detayları Göster'}
          </button>
        </div>
        
        {showAdvanced && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label 
                htmlFor="description" 
                className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Açıklama
              </label>
              <textarea
                id="description"
                rows="3"
                placeholder="Görev açıklaması..."
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="dueDate" 
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Son Tarih
                </label>
                <input
                  id="dueDate"
                  type="datetime-local"
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
              </div>
              <div>
                <label 
                  htmlFor="tags" 
                  className={`block mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Etiketler (virgülle ayır)
                </label>
                <input
                  id="tags"
                  type="text"
                  placeholder="örn: iş, okul, kişisel"
                  className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  value={tags}
                  onChange={handleTagsChange}
                />
              </div>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex justify-center items-center ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ekleniyor...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Görev Ekle
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
