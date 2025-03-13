# Görevio Uygulaması

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş minimalist bir todo uygulamasıdır. Kullanıcılar görevlerini ekleyebilir, düzenleyebilir, tamamlayabilir ve silebilirler.

## Özellikler

- 📝 Yeni görev ekleme
- ✅ Görevleri tamamlandı olarak işaretleme
- 🗑️ Görevleri silme
- ✏️ Görevleri düzenleme
- 🔖 Görevleri kategori/öncelik ile filtreleme
- 🌐 Google ile giriş yapabilme
- 💾 Firebase kullanarak verileri bulut ortamında saklama
- 📱 Responsive tasarım (mobil ve masaüstü uyumlu)

## Teknolojiler

- **Frontend**: React 19, Vite
- **Stil**: Tailwind CSS 4
- **Backend/Veritabanı**: Firebase (Authentication, Firestore)
- **Paket Yöneticisi**: pnpm
- **Diğer**: ESLint

## Kurulum

### Ön Koşullar

- Node.js (v18 veya üzeri)
- pnpm
- Firebase hesabı

### Adımlar

1. Projeyi klonlayın
   ```bash
   git clone https://github.com/kullaniciadi/görevio.git
   cd görevio
   ```

2. Bağımlılıkları yükleyin
   ```bash
   pnpm install
   ```

3. `.env.example` dosyasını .env olarak kopyalayın ve Firebase yapılandırma bilgilerinizi girin
   ```bash
   cp .env.example .env
   ```

4. Geliştirme sunucusunu başlatın
   ```bash
   pnpm dev
   ```

## Firebase Yapılandırması

Bu uygulama, kullanıcı kimlik doğrulama ve veri depolama için Firebase kullanmaktadır. Kendi Firebase projenizi oluşturmak için:

1. [Firebase Console](https://console.firebase.google.com)'a gidin
2. Yeni bir proje oluşturun
3. Authentication bölümünden Google Authentication'ı etkinleştirin
4. Firestore Database'i oluşturun
5. Proje ayarlarından web uygulamanızı kaydedin ve yapılandırma bilgilerini alın
6. Bu bilgileri .env dosyanıza ekleyin

## Kullanım

Uygulama başladıktan sonra:

1. Google hesabınızla giriş yapın
2. "Yeni görev ekle" alanından görevinizi yazın
3. Görevinize kategori veya öncelik atayabilirsiniz
4. Görevlerinizi tamamladığınızda işaretleyin
5. Gerektiğinde görevleri düzenleyin veya silin

## Dağıtım

Projeyi canlı ortama almak için:

```bash
pnpm build
```

Bu komut, `dist` klasöründe dağıtıma hazır dosyalar oluşturacaktır.

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.