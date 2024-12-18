
    # Pathwise

    ## Akıllı Tarım Platformu

    ![Pathwise Logo](pathwise_logo.png)

    **Sürüm:** 1.0

    **Tarih:** 2023-11-15

    ## İçindekiler

    1. [Giriş](#giriş)
    2. [Proje Yapısı](#proje-yapısı)
    3. [Başlarken](#başlarken)
        *   [Ön Koşullar](#ön-koşullar)
        *   [Kurulum](#kurulum)
    4. [Kullanım](#kullanım)
        *   [Backend'i Çalıştırma](#backend'i-çalıştırma)
        *   [Frontend'i Çalıştırma](#frontend'i-çalıştırma)
    5. [API Dokümantasyonu](#api-dokümantasyonu)
        *   [Kullanıcılar](#kullanıcılar)
        *   [Üreticiler](#üreticiler)
        *   [Ürünler](#ürünler)
        *   [Siparişler](#siparişler)
        *   [Yorumlar](#yorumlar)
        *   [Mesajlar](#mesajlar)
        *   [Harita](#harita)
        *   [Öneriler](#öneriler)
        *   [Favoriler](#favoriler)
        *   [Ürün Karşılaştırma](#ürün-karşılaştırma)
        *   [Alışveriş Listeleri](#alışveriş-listeleri)
        *   [Forum](#forum)
        *   [Blog](#blog)
        *   [Sadakat Puanları](#sadakat-puanları)
    6. [Veritabanı Şeması](#veritabanı-şeması)
    7. [Teknolojiler](#teknolojiler)
    8. [Katkıda Bulunma](#katkıda-bulunma)
    9. [Lisans](#lisans)
    10. [İletişim](#iletişim)

    ## Giriş

    **Pathwise**, üreticileri ve tüketicileri doğrudan buluşturan, akıllı ve sürdürülebilir bir tarım platformudur. Bu platform, kullanıcıların yerel, doğal ve organik ürünlere kolayca ulaşmasını, üreticilerin ise ürünlerini daha geniş kitlelere ulaştırmasını sağlar. Pathwise, kullanıcı dostu arayüzü, akıllı arama ve filtreleme özellikleri, harita entegrasyonu, kişiselleştirilmiş öneri sistemi ve gerçek zamanlı iletişim gibi özellikleriyle hem tüketicilere hem de üreticilere benzersiz bir deneyim sunar.

    **Pathwise'in temel özellikleri şunlardır:**

    *   **Akıllı Ürün Arama ve Filtreleme:** Kullanıcılar, konum, kategori, organiklik, fiyat aralığı, besin değerleri, üretim yöntemi gibi birçok kritere göre ürünleri arayabilir ve filtreleyebilir.
    *   **Harita Entegrasyonu:** Kullanıcılar, harita üzerinde yakındaki üreticileri ve ürünleri görebilir, yol tarifi alabilir ve rota üzerindeki üreticileri keşfedebilir.
    *   **Üretici Profilleri:** Üreticiler, detaylı profil sayfaları oluşturabilir, ürünlerini listeleyebilir, sertifikalarını ekleyebilir ve müşteri yorumlarını yönetebilir.
    *   **Gerçek Zamanlı İletişim:** Üretici ve tüketiciler arasında anlık mesajlaşma ve arama özelliği.
    *   **Kişiselleştirilmiş Öneriler:** Kullanıcıların geçmiş alışverişlerine ve tercihlerine göre özelleştirilmiş ürün ve üretici önerileri.
    *   **Sipariş Yönetimi:** Kullanıcılar kolayca sipariş verebilir, sipariş durumunu takip edebilir ve geçmiş siparişlerini görüntüleyebilir.
    *   **Güvenli Ödeme Sistemi (Opsiyonel):** Entegre ödeme ağ geçitleri sayesinde güvenli ödeme imkanı.
    *   **Topluluk Forumu:** Üretici ve tüketicilerin etkileşim kurabileceği, bilgi paylaşabileceği ve sorularını sorabileceği bir platform.
    *   **Blog:** Yerel tarım, sağlıklı beslenme ve sürdürülebilirlik konularında bilgilendirici içerikler.

    ## Proje Yapısı

    ```
    pathwise/
    ├── backend/                 # Backend kaynak kodu
    │   ├── config.js            # Konfigürasyon dosyası
    │   ├── index.js             # Ana backend dosyası
    │   ├── middleware/          # Middleware'ler (örneğin, kimlik doğrulama)
    │   │   └── auth.js
    │   ├── routes/              # API rotaları
    │   │   ├── users.js
    │   │   ├── producers.js
    │   │   ├── products.js
    │   │   ├── orders.js
    │   │   ├── reviews.js
    │   │   ├── messages.js
    │   │   ├── map.js
    │   │   ├── recommendations.js
    │   │   ├── favorites.js
    │   │   ├── productComparisons.js
    │   │   └── shoppingLists.js
    │   ├── services/            # Harici servislerle entegrasyonlar (örneğin, öneri servisi)
    │   │   └── recommendationService.py
    │   └── utils/               # Yardımcı fonksiyonlar ve modüller
    │       ├── database.js      # Veritabanı bağlantı ve sorgu yardımcıları
    │       ├── cache.js         # Önbellekleme yardımcıları
    │       └── messageQueue.js  # Mesaj kuyruğu yardımcıları
    ├── frontend/                # Frontend (Flutter) kaynak kodu
    │   ├── android/             # Android'e özel dosyalar
    │   ├── ios/                 # iOS'a özel dosyalar
    │   ├── lib/                 # Uygulama kaynak kodu
    │   │   ├── api/             # API istemci sınıfları
    │   │   │   └── api_service.dart
    │   │   ├── main.dart        # Uygulamanın başlangıç noktası
    │   │   ├── models/          # Veri modelleri (User, Producer, Product, vb.)
    │   │   │   ├── user.dart
    │   │   │   ├── producer.dart
    │   │   │   └── product.dart
    │   │   ├── providers/       # Provider'lar (durum yönetimi için)
    │   │   │   ├── auth_provider.dart
    │   │   │   ├── producer_provider.dart
    │   │   │   └── product_provider.dart
    │   │   ├── screens/         # Uygulama ekranları (Login, Home, Map, vb.)
    │   │   │   ├── login_screen.dart
    │   │   │   ├── home_screen.dart
    │   │   │   ├── map_screen.dart
    │   │   │   ├── producers_list_screen.dart
    │   │   │   └── profile_screen.dart
    │   │   ├── utils/           # Yardımcı fonksiyonlar ve widget'lar
    │   │   │   └── location_service.dart
    │   │   └── widgets/         # Özel widget'lar
    │   │       ├── producer_card.dart
    │   │       └── product_card.dart
    │   ├── test/                # Test dosyaları
    │   ├── web/                 # Web'e özel dosyalar
    │   └── pubspec.yaml         # Flutter proje dosyası
    ├── scripts/                 # Veritabanı şeması, migrasyonlar vb. için betikler
    ├── .gitignore               # Git tarafından izlenmeyecek dosyalar
    ├── package.json             # Node.js bağımlılıkları ve betikler
    ├── README.md                # Bu dosya
    └── pathwise_logo.png       # Pathwise logosu
    ```

    ## Başlarken

    ### Ön Koşullar

    *   **Node.js:** \>= 14.x
    *   **npm:** \>= 6.x
    *   **PostgreSQL:** \>= 12.x (PostGIS eklentisi ile)
    *   **MongoDB:** \>= 4.x
    *   **Redis:** \>= 6.x
    *   **RabbitMQ:** \>= 3.8.x
    *   **Flutter:** \>= 3.x
    *   **Python:** \>= 3.8 (Öneri servisi için)
    *   **Google Cloud Platform hesabı:** Google Maps Platform API'sini kullanmak için.

    ### Kurulum

    1. **Depoyu klonlayın:**

        ```bash
        git clone <repository_url>
        cd pathwise
        ```

    2. **Backend bağımlılıklarını yükleyin:**

        ```bash
        npm install
        ```

    3. **Veritabanlarını oluşturun ve yapılandırın:**

        *   **PostgreSQL:**
            *   `pathwise_db` adında bir veritabanı oluşturun.
            *   PostGIS eklentisini etkinleştirin: `CREATE EXTENSION postgis;`
            *   `config.js` dosyasında PostgreSQL bağlantı bilgilerini güncelleyin.
            *   Veritabanı şemasını ve tabloları oluşturmak için `scripts/` klasöründeki SQL betiklerini çalıştırın.

        *   **MongoDB:**
            *   `pathwise_db` adında bir veritabanı oluşturun.
            *   `config.js` dosyasında MongoDB bağlantı bilgilerini güncelleyin.

    4. **Redis ve RabbitMQ'yu kurun ve çalıştırın:**

        *   İşletim sisteminize uygun kurulum talimatlarını takip edin.

    5. **Öneri servisini (Python) kurun ve çalıştırın (opsiyonel):**

        *   `services/recommendationService.py` dosyasındaki bağımlılıkları yükleyin: `pip install -r requirements.txt`
        *   Servisi başlatın: `python services/recommendationService.py`

    6. **Frontend bağımlılıklarını yükleyin:**

        ```bash
        cd pathwise-frontend
        flutter pub get
        ```

    7. **Google Maps Platform API anahtarını yapılandırın:**

        *   Google Cloud Platform Console'da bir API anahtarı oluşturun.
        *   `pathwise-frontend/lib/utils/constants.dart` dosyasında `YOUR_GOOGLE_MAPS_API_KEY` yerine kendi API anahtarınızı girin.

    ## Kullanım

    ### Backend'i Çalıştırma

    1. Backend dizinine gidin:

        ```bash
        cd backend
        ```

    2. Uygulamayı başlatın:

        ```bash
        npm start
        ```

        veya geliştirme modunda başlatmak için:

        ```bash
        npm run dev
        ```

    Backend API, `http://localhost:3000` adresinde çalışacaktır.

    ### Frontend'i Çalıştırma

    1. Frontend dizinine gidin:

        ```bash
        cd pathwise-frontend
        ```

    2. Uygulamayı başlatın (web tarayıcısında):

        ```bash
        flutter run -d chrome
        ```

        veya geliştirme modunda başlatmak için:

        ```bash
        npm run dev:frontend
        ```

    Uygulama, web tarayıcınızda açılacaktır.

    ## API Dokümantasyonu

    ### Kullanıcılar

    *   **POST /api/users/register**

        Yeni bir kullanıcı kaydı oluşturur.

        **İstek Gövdesi:**

        ```json
        {
          "full_name": "Kullanıcı Adı",
          "email": "kullanici@example.com",
          "password": "parola123",
          "phone_number": "05551234567",
          "user_type": "consumer" // veya "producer"
        }
        ```

        **Başarılı Yanıt (201):**

        ```json
        {
          "user_id": 1,
          "full_name": "Kullanıcı Adı",
          "email": "kullanici@example.com",
          "phone_number": "05551234567",
          "user_type": "consumer",
          "registration_date": "2023-11-15T12:00:00Z"
        }
        ```

    *   **POST /api/users/login**

        Kullanıcı girişi yapar.

        **İstek Gövdesi:**

        ```json
        {
          "email": "kullanici@example.com",
          "password": "parola123"
        }
        ```

        **Başarılı Yanıt (200):**

        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

    *   **GET /api/users/profile**

        Kimliği doğrulanmış kullanıcının profilini getirir.

        **Yetkilendirme:** Bearer Token

        **Başarılı Yanıt (200):**

        ```json
        {
          "user_id": 1,
          "full_name": "Kullanıcı Adı",
          "email": "kullanici@example.com",
          "phone_number": "05551234567",
          "user_type": "consumer",
          "registration_date": "2023-11-15T12:00:00Z",
          "location": {
            "type": "Point",
            "coordinates": [32.8597, 39.9334]
          },
          "is_verified": false,
          "preferences": {
            "favorite_categories": ["Meyve", "Sebze"],
            "dietary_restrictions": ["Gluten-free"]
          }
        }
        ```

    *   **PUT /api/users/profile**

        Kimliği doğrulanmış kullanıcının profilini günceller.

        **Yetkilendirme:** Bearer Token

        **İstek Gövdesi:**

        ```json
        {
          "full_name": "Yeni Kullanıcı Adı",
          "phone_number": "05559876543"
        }
        ```

        **Başarılı Yanıt (200):**

        ```json
        {
          "user_id": 1,
          "full_name": "Yeni Kullanıcı Adı",
          "email": "kullanici@example.com",
          "phone_number": "05559876543",
          "user_type": "consumer",
          "registration_date": "2023-11-15T12:00:00Z",
          "location": {
            "type": "Point",
            "coordinates": [32.8597, 39.9334]
          },
          "is_verified": false,
          "preferences": {
            "favorite_categories": ["Meyve", "Sebze"],
            "dietary_restrictions": ["Gluten-free"]
          }
        }
        ```

    *   **PATCH /api/users/location**

        Kimliği doğrulanmış kullanıcının konumunu günceller.

        **Yetkilendirme:** Bearer Token

        **İstek Gövdesi:**

        ```json
        {
          "location": "SRID=4326;POINT(32.8597 39.9334)"
        }
        ```

        **Başarılı Yanıt (200):**

        ```json
        {
          "user_id": 1,
          "full_name": "Yeni Kullanıcı Adı",
          "email": "kullanici@example.com",
          "phone_number": "05559876543",
          "user_type": "consumer",
          "registration_date": "2023-11-15T12:00:00Z",
          "location": {
            "type": "Point",
            "coordinates": [32.8597, 39.9334]
          },
          "is_verified": false,
          "preferences": {
            "favorite_categories": ["Meyve", "Sebze"],
            "dietary_restrictions": ["Gluten-free"]
          }
        }
        ```

    ### Üreticiler

    *   **POST /api/producers**

        Yeni bir üretici oluşturur.

        **Yetkilendirme:** Bearer Token

        **İstek Gövdesi:**

        ```json
        {
          "business_name": "Örnek Çiftlik",
          "description": "Organik meyve ve sebze üreticisi",
          "address": "Örnek Mahalle, Örnek Sokak, No: 1",
          "location": "SRID=4326;POINT(32.8597 39.9334)",
          "opening_hours": {
            "monday": "09:00-18:00",
            "tuesday": "09:00-18:00",
            "wednesday": "09:00-18:00",
            "thursday": "09:00-18:00",
            "friday": "09:00-18:00",
            "saturday": "10:00-16:00",
            "sunday": null
          },
          "contact_info": {
            "phone": "05551234567",
            "email": "info@example.com",
            "website": "https://example.com"
          },
          "is_organic_certified": true,
          "verification_document": "https://example.com/organic_certificate.pdf",
          "verification_level": "verified",
          "tags": ["organik", "meyve", "sebze", "yerel"]
        }
        ```

        **Başarılı Yanıt (201):**

        ```json
        {
          "producer_id": 1,
          "user_id": 2,
          "business_name": "Örnek Çiftlik",
          "description": "Organik meyve ve sebze üreticisi",
          "address": "Örnek Mahalle, Örnek Sokak, No: 1",
          "location": {
            "type": "Point",
            "coordinates": [32.8597, 39.9334]
          },
          "opening_hours": {
            "monday": "09:00-18:00",
            "tuesday": "09:00-18:00",
            "wednesday": "09:00-18:00",
            "thursday": "09:00-18:00",
            "friday": "09:00-18:00",
            "saturday": "10:00-16:00",
            "sunday": null
          },
          "contact_info": {
            "phone": "05551234567",
            "email": "info@example.com",
            "website": "https://example.com"
          },
          "is_organic_certified": true,
          "verification_document": "https://example.com/organic_certificate.pdf",
          "verification_level": "verified",
          "tags": ["organik", "meyve", "sebze", "yerel"],
          "average_rating": null
        }
        ```

    *   **GET /api/producers/{producer_id}**

        Belirli bir üreticiyi getirir.

        **Başarılı Yanıt (200):**

        ```json
        {
          "producer_id": 1,
          "user_id": 2,
          "business_name": "Örnek Çiftlik",
          "description": "Organik meyve ve sebze üreticisi",
          "address": "Örnek Mahalle, Örnek Sokak, No: 1",
          "location": {
            "type": "Point",
            "coordinates": [32.8597, 39.9334]
          },
          "opening_hours": {
            "monday": "09:00-18:00",
            "tuesday": "09:00-18:00",
            "wednesday": "09:00-18:00",
            "thursday": "09:00-18:00",
            "friday": "09:00-18:00",
            "saturday": "10:00-16:00",
            "sunday": null
          },
          "contact_info": {
            "phone": "05551234567",
            "email": "info@example.com",
            "website": "https://example.com"
          },
          "is_organic_certified": true,
          "verification_document": "https://example.com/organic_certificate.pdf",
          "verification_level": "verified",
          "tags": ["organik", "meyve", "sebze", "yerel"],
          "average_rating": 4.5
        }
        ```

    *   **PUT /api/producers/{producer_id}**

        Belirli bir üreticiyi günceller.

        **Yetkilendirme:** Bearer Token

        **İstek Gövdesi:**

        ```json
        {
          "business_name": "Yeni Çiftlik Adı",
          "description": "Güncellenmiş açıklama",
          "address": "Yeni Adres, No: 2",
          "location": "SRID=4326;POINT(32.8600 39.9340)",
          "opening_hours": {
            "monday": "08:00-19:00",
            "tuesday": "08:00-19:00",
            "wednesday": "08:00-19:00",
            "thursday": "08:00-19:00",
            "friday": "08:00-19:00",
            "saturday": "09:00-17:00",
            "sunday": null
          },
          "contact_info": {
            "phone": "05559876543",
            "email": "yeni_info@example.com",
            "website": "https://yeni_example.com"
          },
          "is_organic_certified": false,
          "verification_document": null,
          "verification_level": "basic",
          "tags": ["sürdürülebilir", "sebze", "yerel"]
        }
        ```

        **Başarılı Yanıt (200):**

        ```json
        {
          "producer_id": 1,
          "user_id": 2,
          "business_name": "Yeni Çiftlik Adı",
          "description": "Güncellenmiş açıklama",
          "address": "Yeni Adres, No: 2",
          "location": {
            "type": "Point",
            "coordinates": [32.8600, 39.9340]
          },
          "opening_hours": {
            "monday": "08:00-19:00",
            "tuesday": "08:00-19:00",
            "wednesday": "08:00-19:00",
            "thursday": "08:00-19:00",
            "friday": "08:00-19:00",
            "saturday": "09:00-17:00",
            "sunday": null
          },
          "contact_info": {
            "phone": "05559876543",
            "email": "yeni_info@example.com",
            "website": "https://yeni_example.com"
          },
          "is_organic_certified": false,
          "verification_document": null,
          "verification_level": "basic",
          "tags": ["sürdürülebilir", "sebze", "yerel"],
          "average_rating": 4.5
        }
        ```

    *   **GET /api/producers**

        Belirli bir konuma yakın üreticileri getirir.

        **Sorgu Parametreleri:**

        *   `lat` (gerekli): Enlem
        *   `lon` (gerekli): Boylam
        *   `radius` (gerekli): Metre cinsinden yarıçap

        **Başarılı Yanıt (200):**

        ```json
        [
          {
            "producer_id": 1,
            "user_id": 2,
            "business_name": "Örnek Çiftlik",
            "description": "Organik meyve ve sebze üreticisi",
            "address": "Örnek Mahalle, Örnek Sokak, No: 1",
            "location": {
              "type": "Point",
              "coordinates": [32.8597, 39.9334]
            },
            "opening_hours": {
              "monday": "09:00-18:00",
              "tuesday": "09:00-18:00",
              "wednesday": "09:00-18:00",
              "thursday": "09:00-18:00",
              "friday": "09:00-18:00",
              "saturday": "10:00-16:00",
              "sunday": null
            },
            "contact_info": {
              "phone": "05551234567",
              "email": "info@example.com",
              "website": "https://example.com"
            },
            "is_organic_certified": true,
            "verification_document": "https://example.com/organic_certificate.pdf",
            "verification_level": "verified",
            "tags": ["organik", "meyve", "sebze", "yerel"],
            "average_rating": 4.5
          },
          {
            "producer_id": 2,
            "user_id": 3,
            "business_name": "Başka Çiftlik",
            "description": "Doğal ürünler",
            "address": "Başka Mahalle, Başka Sokak, No: 2",
            "location": {
              "type": "Point",
              "coordinates": [32.8605, 39.9350]
            },
            "opening_hours": {
              "monday": "10:00-17:00",
              "tuesday": "10:00-17:00",
              "wednesday": "10:00-17:00",
              "thursday": "10:00-17:00",
              "friday": "10:00-17:00",
              "saturday": "10:00-15:00",
              "sunday": null
            },
            "contact_info": {
              "phone": "05559876543",
              "email": "info@baska.com",
              "website": "https://baska.com"
            },
            "is_organic_certified": false,
            "verification_document": null,
            "verification_level": "basic",
            "tags": ["doğal", "süt ürünleri", "yumurta"],
            "average_rating": 4.0
          }
        ]
        ```

    *   **GET /api/producers/search**

        Üreticileri anahtar kelimeye göre arar.

        **Sorgu Parametreleri:**

        *   `query` (gerekli): Arama terimi

        **Başarılı Yanıt (200):**

        ```json
        [
          {
            "producer_id": 1,
            "user_id": 2,
            "business_name": "Örnek Çiftlik",
            "description": "Organik meyve ve sebze üreticisi",
            "address": "Örnek Mahalle, Örnek Sokak, No: 1",
            "location": {
              "type": "Point",
              "coordinates": [32.8597, 39.9334]
            },
            "opening_hours": {
              "monday": "09:00-18:00",
              "tuesday": "09:00-18:00",
              "wednesday": "09:00-18:00",
              "thursday": "09:00-18:00",
              "friday": "09:00-18:00",
              "saturday": "10:00-16:00",
              "sunday": null
            },
            "contact_info": {
              "phone": "05551234567",
              