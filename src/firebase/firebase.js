import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

// Firebase yapılandırma bilgileri 
// NOT: Bu bilgileri Firebase konsolundan edinebilirsiniz 
// https://console.firebase.google.com
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firestore veritabanını başlat
const db = getFirestore(app);

// Todo koleksiyonu referansı
const todosCollection = collection(db, 'todos');

// Google ile giriş fonksiyonu
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      user: result.user,
      success: true
    };
  } catch (error) {
    console.error("Google ile giriş hatası:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Çıkış yapma fonksiyonu
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Çıkış yapma hatası:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Todo CRUD işlemleri
export const addTodoToFirestore = async (userId, todoData) => {
  try {
    const docRef = await addDoc(todosCollection, {
      ...todoData,
      userId,
      createdAt: new Date().toISOString()
    });
    return {
      id: docRef.id,
      ...todoData,
      userId,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Todo eklenirken hata oluştu:", error);
    throw error;
  }
};

export const updateTodoInFirestore = async (todoId, updatedData) => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    await updateDoc(todoRef, updatedData);
    return true;
  } catch (error) {
    console.error("Todo güncellenirken hata oluştu:", error);
    throw error;
  }
};

export const deleteTodoFromFirestore = async (todoId) => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    await deleteDoc(todoRef);
    return true;
  } catch (error) {
    console.error("Todo silinirken hata oluştu:", error);
    throw error;
  }
};

export const fetchUserTodos = async (userId) => {
  try {
    const q = query(todosCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    
    return todos;
  } catch (error) {
    console.error("Todoları getirirken hata oluştu:", error);
    throw error;
  }
};

// Auth servisi ve DB servislerini dışarı aktar
export { auth, db };
