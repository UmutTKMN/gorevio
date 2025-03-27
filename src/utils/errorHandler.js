// Özel hata sınıfı
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', status = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
  }
}

// Firebase hatalarını işleme
export const handleFirebaseError = (error) => {
  const errorMessages = {
    'auth/email-already-in-use': 'Bu e-posta adresi zaten kullanımda.',
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/operation-not-allowed': 'Bu işlem şu anda kullanılamıyor.',
    'auth/weak-password': 'Şifre çok zayıf.',
    'auth/user-disabled': 'Bu hesap devre dışı bırakılmış.',
    'auth/user-not-found': 'Kullanıcı bulunamadı.',
    'auth/wrong-password': 'Hatalı şifre.',
    'permission-denied': 'Bu işlem için yetkiniz yok.',
    'not-found': 'İstenen kayıt bulunamadı.',
    'network-request-failed': 'Ağ bağlantısı hatası.',
  };

  const errorCode = error.code || 'unknown';
  const message = errorMessages[errorCode] || 'Beklenmeyen bir hata oluştu.';

  throw new AppError(message, errorCode);
};

// Global hata yakalayıcı
export const setupErrorBoundary = (error, errorInfo) => {
  console.error('Hata:', error);
  console.error('Hata Bilgisi:', errorInfo);
  
  // Hata loglama servisi entegrasyonu buraya eklenebilir
  // Örnek: Sentry.captureException(error, { extra: errorInfo });
};

// API isteklerini güvenli hale getirme
export const safeApiCall = async (apiFunction, ...args) => {
  try {
    return await apiFunction(...args);
  } catch (error) {
    handleFirebaseError(error);
  }
}; 