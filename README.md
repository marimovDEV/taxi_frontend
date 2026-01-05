# 🚀 Taxi UZ Admin Panel - Demo Frontend

Bu Taxi UZ transport xizmatlari uchun to'liq ishlaydigan admin panel demo versiyasi! 

## ✨ Xususiyatlar

- 🎨 **Zamonaviy UI/UX** - Tailwind CSS va shadcn/ui komponentlari
- 🌍 **Ko'p tilli qo'llab-quvvatlash** - O'zbek va rus tillari
- 📱 **Responsive dizayn** - Barcha qurilmalarda ishlaydi
- 🔐 **Demo rejim** - API serverisiz ishlaydi
- 📊 **Real-time statistika** - Trading-style dashboard
- 🚗 **Haydovchilar boshqaruvi** - Arizalar va tasdiqlash
- 💳 **To'lovlar boshqaruvi** - Ball sotib olish so'rovlari
- 📦 **Buyurtmalar boshqaruvi** - Taxi, pasilka, gruz xizmatlari
- ✈️ **Biletlar boshqaruvi** - Avia va poyezd biletlari
- ⭐ **Reytinglar** - Haydovchilar reytingi
- ⚙️ **Sozlamalar** - Tizim konfiguratsiyasi

## 🚀 O'rnatish va ishga tushirish

### Talablar
- Node.js 18+ 
- npm yoki pnpm

### O'rnatish
```bash
# Dependencelarni o'rnatish
npm install

# Yoki pnpm bilan
pnpm install
```

### Ishga tushirish
```bash
# Development serverini ishga tushirish
npm run dev

# Yoki pnpm bilan
pnpm dev
```

Frontend http://localhost:3000 da ochiladi.

## 🔐 Demo ma'lumotlari

Demo rejimda quyidagi ma'lumotlar bilan kirish mumkin:

- **Foydalanuvchi nomi:** `admin`
- **Parol:** `admin123`

💡 **Eslatma:** Demo rejimda har qanday ma'lumotlar bilan kirish mumkin!

## 📊 Demo ma'lumotlar

### Haydovchilar
- **Aziz Karimov** - Chevrolet Cobalt, Tasdiqlangan
- **Malika Yusupova** - Nexia 3, Gruz xizmati
- **Jasur Rahimov** - Lacetti, Kutayotgan

### Buyurtmalar
- **Taxi:** Toshkent, Chorsu → Tashkent City
- **Pasilka:** Samarqand → Toshkent, Mebellar
- **Gruz:** Andijon → Toshkent, Sanoat jihozlari

### To'lovlar
- **Tasdiqlangan:** 100 so'm, Aziz Karimov
- **Kutayotgan:** 150 so'm, Malika Yusupova
- **Rad etilgan:** 200 so'm, Olimjon Sobirov

### Biletlar
- **Avia:** Toshkent → Istanbul, Ish safari
- **Poyezd:** Qarshi → Toshkent, O'qish uchun

## 🏗️ Loyiha tuzilishi

```
frontend/
├── app/                    # Next.js app router
│   ├── dashboard/         # Boshqaruv paneli
│   ├── drivers/          # Haydovchilar
│   ├── orders/           # Buyurtmalar
│   ├── payments/         # To'lovlar
│   ├── ratings/          # Reytinglar
│   ├── settings/         # Sozlamalar
│   └── statistics/       # Statistika
├── components/           # React komponentlari
│   ├── ui/              # shadcn/ui komponentlari
│   └── ...              # Maxsus komponentlar
├── lib/                 # Utility fayllar
│   ├── api.ts          # API service
│   ├── i18n.ts         # Ko'p tilli qo'llab-quvvatlash
│   └── mock-data.ts    # Demo ma'lumotlar
└── hooks/              # Custom React hooks
```

## 🔧 API integratsiyasi

Frontend quyidagi API endpointlarini qo'llab-quvvatlaydi:

- `GET /api/drivers/` - Haydovchilar ro'yxati
- `GET /api/orders/` - Buyurtmalar ro'yxati
- `GET /api/payments/` - To'lovlar ro'yxati
- `GET /api/ratings/` - Reytinglar ro'yxati
- `GET /api/flight-tickets/` - Avia biletlar
- `GET /api/train-tickets/` - Poyezd biletlar
- `GET /api/stats/general/` - Umumiy statistika

## 🌍 Ko'p tilli qo'llab-quvvatlash

Tizim quyidagi tillarni qo'llab-quvvatlaydi:
- 🇺🇿 O'zbek tili (asosiy)
- 🇷🇺 Rus tili

Tillar dinamik ravishda JSON fayllardan yuklanadi.

## 🎨 UI/UX xususiyatlari

- **Dark/Light mode** - Avtomatik tema almashish
- **Responsive design** - Barcha ekran o'lchamlari
- **Loading states** - Yuklash holatlari
- **Error handling** - Xatoliklarni boshqarish
- **Toast notifications** - Bildirishnomalar
- **Search & Filter** - Qidirish va filtrlash
- **Pagination** - Sahifalash

## 📱 Mobil qo'llab-quvvatlash

- **Touch gestures** - Sensorli harakatlar
- **Mobile-first design** - Mobilga moslashgan
- **Optimized performance** - Optimallashtirilgan ishlash
- **Offline support** - Demo rejimda offline ishlaydi

## 🔒 Xavfsizlik

- **Token-based auth** - Token asosida autentifikatsiya
- **Route protection** - Yo'l himoyasi
- **Input validation** - Kirish ma'lumotlarini tekshirish
- **XSS protection** - XSS hujumlaridan himoya

## 🚀 Production deployment

```bash
# Build yaratish
npm run build

# Production serverini ishga tushirish
npm start
```

## 📞 Qo'llab-quvvatlash

Agar savollaringiz bo'lsa yoki yordam kerak bo'lsa:

- 📧 Email: support@taxiuz.com
- 💬 Telegram: @taxiuz_support
- 🌐 Website: https://taxiuz.com

## 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi.

---

**Taxi UZ Admin Panel** - Transport xizmatlari boshqaruvi uchun zamonaviy yechim! 🚗✨ # taxi_frontend
