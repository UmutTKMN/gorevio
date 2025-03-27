import { useState, useEffect } from "react";

/**
 * Tarayıcı takip önleme uyarısını gösteren bileşen
 * Bu bileşen, tarayıcının takip önleme özelliği nedeniyle yerel depolamaya erişim engellendiğinde
 * kullanıcıya bilgi veren bir uyarı gösterir.
 */
function TrackingWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Tarayıcının localStorage'a erişimini kontrol et
    const checkStorage = () => {
      try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
      } catch (e) {
        return false;
      }
    };

    const hasStorageAccess = checkStorage();
    setShowWarning(!hasStorageAccess);
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-md z-50">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Tarayıcı Depolama Erişimi Engellendi
            </h3>
            <div className="mt-2 text-xs text-yellow-700">
              <p>
                Tarayıcınızın takip önleme özelliği, uygulamanın sorunsuz
                çalışması için gereken depolama alanına erişimi engelliyor. Bu
                sorunu çözmek için:
              </p>
              <ul className="list-disc list-inside mt-1">
                <li>Tarayıcı gizlilik/güvenlik ayarlarınızı kontrol edin</li>
                <li>Gizli/özel tarama modundan çıkın</li>
                <li>Çerezlere izin verin</li>
              </ul>
            </div>
            <div className="mt-3">
              <button
                onClick={() => setShowWarning(false)}
                className="text-xs font-medium text-yellow-800 hover:text-yellow-600"
              >
                Anladım, kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingWarning;
