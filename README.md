# Canım Çekiyor

Annemin sigara isteği geldiğinde 5 dakika beklemesine yardım eden küçük bir site.

- `index.html`: annemin sayfası ("Canım çekiyor" düğmesi, 5 dakikalık bekleme, oyun)
- `takip.html`: benim sayfam (bugün ve son 7 günün özeti, son hareketler)
- `firebase.js`: kayıtların tutulduğu Firebase Firestore bağlantısı
- `firestore.rules`: Firebase güvenlik kuralları (Firebase paneline yapıştırılır)

## Kedi fotoğrafları

1. Fotoğrafları `images/` klasörüne yükle (ör. `images/mutsuz.jpg`).
2. `index.html` içindeki `PHOTOS` satırına dosya adlarını yaz:
   `const PHOTOS = { home:"images/merhaba.jpg", ask:"images/mutsuz.jpg", ... };`

Ekranlar: `home` ana sayfa, `ask` canım çekiyor, `wait` bekleme, `check` geçti mi, `passed` aferin, `smoked` tamam iç.
