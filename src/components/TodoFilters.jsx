import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';

function TodoFilters() {
  const { darkMode } = useTheme();
  const { filter, setFilter, allTags } = useTodos();
  const [activeTab, setActiveTab] = useState('status');

  const tabs = [
    { id: 'status', name: 'Durum' },
    { id: 'priority', name: 'Öncelik' },
    { id: 'date', name: 'Tarih' },
    { id: 'tags', name: 'Etiketler' }
  ];

  return (
    <div className={`mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
      {/* Filtreleme Sekmeleri */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {tabs.map(tab => (
            <li className="mr-2" key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group
                  ${activeTab === tab.id 
                    ? `${darkMode ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600'}`
                    : `${darkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-600'}`
                  }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Filtre İçeriği */}
      <div className="p-4 overflow-x-auto">
        {activeTab === 'status' && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'active' 
                ? 'bg-blue-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Aktif
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'completed' 
                ? 'bg-blue-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Tamamlanan
            </button>
          </div>
        )}
        
        {activeTab === 'priority' && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'high' 
                ? 'bg-red-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Yüksek
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'medium' 
                ? 'bg-yellow-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Orta
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'low' 
                ? 'bg-green-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Düşük
            </button>
          </div>
        )}
        
        {activeTab === 'date' && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'today' 
                ? 'bg-blue-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Bugün
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'upcoming' 
                ? 'bg-blue-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Yakında
            </button>
            <button
              onClick={() => setFilter('overdue')}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === 'overdue' 
                ? 'bg-red-500 text-white' 
                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
            >
              Gecikmiş
            </button>
          </div>
        )}
        
        {activeTab === 'tags' && (
          <div className="flex flex-wrap gap-2">
            {allTags.length === 0 ? (
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Henüz etiket yok
              </p>
            ) : (
              allTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setFilter(`tag:${tag}`)}
                  className={`px-4 py-2 rounded-lg transition-colors ${filter === `tag:${tag}` 
                    ? 'bg-blue-500 text-white' 
                    : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}`}
                >
                  {tag}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoFilters;
