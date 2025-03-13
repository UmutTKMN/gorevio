import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../contexts/TodoContext';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { darkMode } = useTheme();
  const { todos } = useTodos();

  // Bildirimleri kontrol et ve güncelle
  useEffect(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    
    const todayEnd = new Date(tomorrowStart);
    todayEnd.setSeconds(todayEnd.getSeconds() - 1);
    
    // Bugün içinde olan ve tamamlanmamış görevler
    const todayTodos = todos.filter(todo => {
      if (!todo.dueDate || todo.completed) return false;
      const dueDate = new Date(todo.dueDate);
      return dueDate >= todayStart && dueDate <= todayEnd;
    });
    
    // Gecikmiş görevler
    const overdueTodos = todos.filter(todo => {
      if (!todo.dueDate || todo.completed) return false;
      return new Date(todo.dueDate) < todayStart;
    });
    
    // Yaklaşan görevler (yarın)
    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
    tomorrowEnd.setSeconds(tomorrowEnd.getSeconds() - 1);
    
    const tomorrowTodos = todos.filter(todo => {
      if (!todo.dueDate || todo.completed) return false;
      const dueDate = new Date(todo.dueDate);
      return dueDate > todayEnd && dueDate <= tomorrowEnd;
    });
    
    // Bildirimleri oluştur
    const newNotifications = [];
    
    if (overdueTodos.length > 0) {
      newNotifications.push({
        id: 'overdue',
        type: 'danger',
        message: `${overdueTodos.length} görev gecikmiş durumda`,
        time: new Date()
      });
    }
    
    if (todayTodos.length > 0) {
      newNotifications.push({
        id: 'today',
        type: 'warning',
        message: `Bugün için ${todayTodos.length} göreviniz var`,
        time: new Date()
      });
    }
    
    if (tomorrowTodos.length > 0) {
      newNotifications.push({
        id: 'tomorrow',
        type: 'info',
        message: `Yarın için ${tomorrowTodos.length} göreviniz var`,
        time: new Date()
      });
    }
    
    setNotifications(newNotifications);
  }, [todos]);

  // Bildirim sayısı
  const notificationCount = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Bildirimler"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {notificationCount}
          </span>
        )}
      </button>
      
      {showNotifications && (
        <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 animate-scaleUp`}>
          <div className="py-2">
            <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Bildirimler</h3>
            </div>
            
            {notifications.length === 0 ? (
              <div className="px-4 py-3 text-center">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Bildirim bulunmuyor
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`px-4 py-3 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-150`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      {notification.type === 'danger' && (
                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      {notification.type === 'warning' && (
                        <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {notification.type === 'info' && (
                        <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                        {new Date(notification.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
