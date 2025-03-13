import { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';
import { 
  db,
  addTodoToFirestore,
  updateTodoInFirestore, 
  deleteTodoFromFirestore,
  fetchUserTodos
} from '../firebase/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const TodoContext = createContext();

export function useTodos() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('default');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser, isAuthenticated } = useUser();
  
  // Firestore'dan kullanıcının todolarını dinle
  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      setTodos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Firestore sorgusunu oluştur
    const q = query(
      collection(db, 'todos'),
      where('userId', '==', currentUser.id)
    );
    
    // Gerçek zamanlı veri dinlemesi için snapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todoData = [];
      querySnapshot.forEach((doc) => {
        todoData.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todoData);
      setLoading(false);
    }, (error) => {
      console.error("Todoları dinlerken hata:", error);
      setLoading(false);
    });
    
    // Component unmount olduğunda dinlemeyi durdur
    return () => unsubscribe();
  }, [currentUser, isAuthenticated]);

  // Todo ekleme
  const addTodo = async (text, priority, description = '', dueDate = null, tags = []) => {
    if (!isAuthenticated || !currentUser) return;
    
    const newTodoData = {
      text,
      description,
      completed: false,
      priority,
      dueDate,
      userId: currentUser.id,
      tags: tags || [],
    };
    
    try {
      await addTodoToFirestore(currentUser.id, newTodoData);
      // onSnapshot dinleyicisi otomatik olarak todoları güncelleyecek
    } catch (error) {
      console.error("Todo eklenirken hata:", error);
    }
  };

  // Todo tamamlama durumunu değiştirme
  const toggleTodoComplete = async (id) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;
    
    try {
      await updateTodoInFirestore(id, {
        completed: !todoToUpdate.completed
      });
      // onSnapshot dinleyicisi otomatik olarak todoları güncelleyecek
    } catch (error) {
      console.error("Todo durumu güncellenirken hata:", error);
    }
  };

  // Todo silme
  const deleteTodo = async (id) => {
    try {
      await deleteTodoFromFirestore(id);
      if (selectedTodo && selectedTodo.id === id) {
        setSelectedTodo(null);
      }
      // onSnapshot dinleyicisi otomatik olarak todoları güncelleyecek
    } catch (error) {
      console.error("Todo silinirken hata:", error);
    }
  };

  // Todo güncelleme - tüm alanları kapsayan
  const updateTodo = async (id, updates) => {
    try {
      await updateTodoInFirestore(id, updates);
      // Seçili todo'yu da güncelle
      if (selectedTodo && selectedTodo.id === id) {
        setSelectedTodo({ ...selectedTodo, ...updates });
      }
      // onSnapshot dinleyicisi otomatik olarak todoları güncelleyecek
    } catch (error) {
      console.error("Todo güncellenirken hata:", error);
    }
  };

  // Sadece metin güncelleme (geriye dönük uyumluluk için)
  const updateTodoText = (id, text) => {
    updateTodo(id, { text });
  };

  // Todo'ya etiket ekleme
  const addTagToTodo = async (todoId, tag) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (!todoToUpdate) return;
    
    const updatedTags = [...(todoToUpdate.tags || [])];
    
    if (!updatedTags.includes(tag)) {
      updatedTags.push(tag);
      
      try {
        await updateTodoInFirestore(todoId, {
          tags: updatedTags
        });
        
        // Seçili todo'yu güncelle
        if (selectedTodo && selectedTodo.id === todoId) {
          setSelectedTodo({
            ...selectedTodo,
            tags: updatedTags
          });
        }
      } catch (error) {
        console.error("Todo etiketi eklenirken hata:", error);
      }
    }
  };

  // Todo'dan etiket silme
  const removeTagFromTodo = async (todoId, tagToRemove) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (!todoToUpdate || !todoToUpdate.tags) return;
    
    const updatedTags = todoToUpdate.tags.filter(tag => tag !== tagToRemove);
    
    try {
      await updateTodoInFirestore(todoId, {
        tags: updatedTags
      });
      
      // Seçili todo'yu güncelle
      if (selectedTodo && selectedTodo.id === todoId) {
        setSelectedTodo({
          ...selectedTodo,
          tags: updatedTags
        });
      }
    } catch (error) {
      console.error("Todo etiketi kaldırılırken hata:", error);
    }
  };

  // Tamamlanan görevleri temizleme
  const clearCompletedTasks = async () => {
    const completedTodos = todos.filter(todo => todo.completed);
    
    try {
      // Tamamlanan tüm todoları silmek için Promise.all kullan
      await Promise.all(
        completedTodos.map(todo => deleteTodoFromFirestore(todo.id))
      );
      
      if (selectedTodo && selectedTodo.completed) {
        setSelectedTodo(null);
      }
    } catch (error) {
      console.error("Tamamlanan todolar silinirken hata:", error);
    }
  };

  // Görevleri sıralama
  const sortTodos = (todosToSort) => {
    if (sortMethod === 'default') return todosToSort;
    
    return [...todosToSort].sort((a, b) => {
      if (sortMethod === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortMethod === 'alphabetical') {
        return a.text.localeCompare(b.text);
      } else if (sortMethod === 'date') {
        return b.id - a.id;
      } else if (sortMethod === 'dueDate') {
        // Son tarihe göre sıralama (null değerler sona gider)
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });
  };

  // Filtreleme ve arama
  const getFilteredTodos = () => {
    if (!isAuthenticated) return []; // Kullanıcı giriş yapmadıysa boş dizi döndür
    
    let result = todos.filter(todo => {
      // Sadece mevcut kullanıcının todo'larını göster
      if (todo.userId !== currentUser.id) return false;
      
      if (filter === 'all') return true;
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      if (filter === 'high' || filter === 'medium' || filter === 'low') 
        return todo.priority === filter;
      if (filter === 'today') {
        if (!todo.dueDate) return false;
        const today = new Date();
        const dueDate = new Date(todo.dueDate);
        return (
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
        );
      }
      if (filter === 'upcoming') {
        if (!todo.dueDate) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(todo.dueDate);
        return dueDate > today;
      }
      if (filter === 'overdue') {
        if (!todo.dueDate) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(todo.dueDate);
        return dueDate < today && !todo.completed;
      }
      if (filter.startsWith('tag:')) {
        const tag = filter.substring(4);
        return todo.tags && todo.tags.includes(tag);
      }
      return true;
    });
    
    // Arama sorgusu filtresi
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(todo => 
        todo.text.toLowerCase().includes(query) || 
        (todo.description && todo.description.toLowerCase().includes(query)) ||
        (todo.tags && todo.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return sortTodos(result);
  };

  // Tüm kullanılabilir etiketleri getirme
  const getAllTags = () => {
    if (!isAuthenticated) return [];
    
    const allTags = new Set();
    todos.forEach(todo => {
      if (todo.userId === currentUser.id && todo.tags) {
        todo.tags.forEach(tag => allTags.add(tag));
      }
    });
    return [...allTags];
  };

  // Belirli bir todo'yu seçme/görüntüleme
  const selectTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    setSelectedTodo(todo || null);
  };

  const value = {
    todos,
    filter,
    searchQuery,
    sortMethod,
    selectedTodo,
    filteredTodos: getFilteredTodos(),
    allTags: getAllTags(),
    loading,
    addTodo,
    toggleTodoComplete,
    deleteTodo,
    updateTodo,
    updateTodoText,
    addTagToTodo,
    removeTagFromTodo,
    clearCompletedTasks,
    setFilter,
    setSearchQuery,
    setSortMethod,
    selectTodo
  };
  
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}
