// Önceliğe göre stil (renk) belirle
export const getPriorityStyle = (priority) => {
  switch(priority) {
    case 'high': return { 
      color: 'text-red-800', 
      bg: 'bg-red-100', 
      ringColor: 'ring-red-400', 
      hoverBg: 'hover:bg-red-200' 
    };
    case 'medium': return { 
      color: 'text-yellow-800', 
      bg: 'bg-yellow-100', 
      ringColor: 'ring-yellow-400', 
      hoverBg: 'hover:bg-yellow-200' 
    };
    case 'low': return { 
      color: 'text-green-800', 
      bg: 'bg-green-100', 
      ringColor: 'ring-green-400', 
      hoverBg: 'hover:bg-green-200' 
    };
    default: return { 
      color: 'text-blue-800', 
      bg: 'bg-blue-100', 
      ringColor: 'ring-blue-400', 
      hoverBg: 'hover:bg-blue-200' 
    };
  }
};

// Öncelik etiketi metnini elde etme
export const getPriorityLabel = (priority) => {
  switch(priority) {
    case 'high': return 'Yüksek Öncelik';
    case 'medium': return 'Orta Öncelik';
    case 'low': return 'Düşük Öncelik';
    default: return 'Öncelik Belirtilmemiş';
  }
};
