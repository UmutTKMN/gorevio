# 📝 Görevio - Modern Görev Yönetim Uygulaması

<div align="center">
  <img src="/public/g.png" alt="Görevio Uygulaması" width="150px">
</div>

## 📋 İçerik

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Güvenlik Özellikleri](#-güvenlik-özellikleri)
- [Tarayıcı Desteği](#-tarayıcı-desteği)
- [Lisans](#-lisans)

## 📝 Proje Hakkında

Görevio, modern ve kullanıcı dostu arayüzü ile görevlerinizi etkili bir şekilde yönetmenizi sağlayan bir web uygulamasıdır. Firebase kimlik doğrulama ve gerçek zamanlı veritabanı entegrasyonu sayesinde görevlerinizi her yerden güvenli bir şekilde yönetebilirsiniz.

Sezgisel kullanıcı arayüzü, karanlık/aydınlık tema desteği ve gerçek zamanlı güncellemeler ile görev yönetimi deneyiminizi zenginleştirir.

## ✨ Özellikler

- **🔐 Google ile Giriş**: Güvenli ve hızlı giriş deneyimi
- **🌓 Aydınlık/Karanlık Tema**: Göz yormayan arayüz seçenekleri
- **➕ Görev Ekleme/Düzenleme/Silme**: Tam kapsamlı görev yönetimi
- **🔍 Görev Arama**: Görevleriniz arasında hızlıca arama yapın
- **🏷️ Etiketler ve Öncelikler**: Görevlerinizi kategorize edin ve önemlerine göre sıralayın
- **📊 Görev İstatistikleri**: Görev tamamlama oranları ve performans takibi
- **🔔 Bildirimler**: Önemli görevler için hatırlatmalar
- **📱 Responsive Tasarım**: Mobil ve masaüstü cihazlarda kusursuz deneyim
- **🔄 Gerçek Zamanlı Güncelleme**: Firebase ile anlık veri senkronizasyonu
- **⏱️ Son Tarih Takibi**: Görevleriniz için bitiş tarihi belirleyin ve takip edin
- **📂 Görev Organizasyonu**: Görevlerinizi kategorilere ayırın ve düzenleyin

## 📸 Ekran Görüntüleri

<div align="center">
  <img src="screenshots/login.png" alt="Giriş Ekranı" width="600px">
  <p><em>Giriş Ekranı</em></p>
  
  <img src="screenshots/list.png" alt="Görev Listesi" width="600px">
  <p><em>Görev Listesi</em></p>
  
  <img src="screenshots/create.png" alt="Görev Ekleme" width="600px">
  <p><em>Görev Ekleme ve Düzenleme</em></p>
</div>

## 🛠️ Teknolojiler

Bu projede aşağıdaki teknolojileri kullanıyoruz:

- **Frontend**:
  - [React 19](https://react.dev/) - Modern kullanıcı arayüzü geliştirme
  - [Tailwind CSS](https://tailwindcss.com/) - Stil ve tasarım
  - [Context API](https://react.dev/reference/react/createContext) - State yönetimi
- **Backend**:
  - [Firebase Authentication](https://firebase.google.com/docs/auth) - Kullanıcı kimlik doğrulama
  - [Firestore Database](https://firebase.google.com/docs/firestore) - Gerçek zamanlı veritabanı
- **Geliştirme Araçları**:
  - [Vite.js](https://vitejs.dev/) - Hızlı geliştirme ortamı
  - [ESLint](https://eslint.org/) - Kod kalitesi
  - [PNPM](https://pnpm.io/) - Hızlı ve verimli paket yönetimi

## 🚀 Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edin:

### Ön Koşullar

- Node.js (v18 veya üzeri)
- PNPM
- Firebase Hesabı

### Adımlar

1. Repoyu klonlayın:

   ```bash
   git clone https://github.com/kullaniciadi/gorevio.git
   cd gorevio
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   pnpm install
   ```

3. `.env.example` dosyasını `.env` olarak kopyalayın:

   ```bash
   cp .env.example .env
   ```

4. `.env` dosyasını açın ve Firebase yapılandırma bilgilerinizi ekleyin:

   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

   > 📝 **Not**: Firebase yapılandırma bilgilerinizi [Firebase Console](https://console.firebase.google.com/) üzerinden alabilirsiniz.

5. Uygulamayı başlatın:

   ```bash
   pnpm dev
   ```

6. Tarayıcınızda şu adresi açın: `http://localhost:5173`

## 🛡️ Güvenlik Özellikleri

Görevio uygulaması, verilerinizin güvenliği için tasarlanmıştır:

- **Veri Doğrulama**: Tüm kullanıcı girdileri sunucu tarafında doğrulanır
- **XSS Koruması**: Metin girdileri otomatik olarak temizlenir
- **Rate Limiting**: API istekleri için hız sınırlaması
- **Firebase Güvenlik Kuralları**: Kullanıcıların yalnızca kendi verilerine erişmesini sağlar
- **Güvenli Kimlik Doğrulama**: Google oturum açma ve güvenli şifre yönetimi

## 📱 Tarayıcı Desteği

Görevio, modern tarayıcıların tüm versiyonlarında en iyi performansı gösterir:

- Chrome (son 2 sürüm)
- Firefox (son 2 sürüm)
- Safari (son 2 sürüm)
- Edge (son 2 sürüm)

**Not**: Tarayıcı takip önleme özelliği aktif olduğunda, bazı işlevler sınırlı olabilir. Bu durumda uygulama size yardımcı olmak için bir uyarı gösterecektir.

## 📄 Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır. Detaylı bilgi için lisans dosyasını inceleyebilirsiniz.

---

<div align="center">
  <p>❤️ ile geliştirildi</p>
  <p>
    <a href="https://github.com/kahrastudio">GitHub</a> •
    <a href="https://twitter.com/kahrastudio">Twitter</a>
  </p>
</div>
