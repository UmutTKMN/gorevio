// XSS koruması için metin temizleme
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Şifre güvenlik kontrolü
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

// Rate limiting için basit bir yardımcı
export const createRateLimiter = (limit, windowMs) => {
  const requests = new Map();

  return (key) => {
    const now = Date.now();
    const windowStart = now - windowMs;
    const requestTimestamps = requests.get(key) || [];
    const recentRequests = requestTimestamps.filter(time => time > windowStart);

    if (recentRequests.length >= limit) {
      return false;
    }

    recentRequests.push(now);
    requests.set(key, recentRequests);
    return true;
  };
};

// Güvenli veri doğrulama
export const validateTodoData = (todo) => {
  const requiredFields = ['title', 'userId', 'createdAt'];
  const hasRequiredFields = requiredFields.every(field => field in todo);
  
  if (!hasRequiredFields) {
    throw new Error('Eksik zorunlu alanlar');
  }

  if (typeof todo.title !== 'string' || todo.title.trim().length === 0) {
    throw new Error('Geçersiz başlık');
  }

  return {
    ...todo,
    title: sanitizeInput(todo.title),
    description: todo.description ? sanitizeInput(todo.description) : '',
    updatedAt: new Date().toISOString()
  };
}; 