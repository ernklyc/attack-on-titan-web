# Attack on Titan Web Projesi Kodlama Kuralları

Bu dosya, Attack on Titan Web projesinde tutarlı bir kodlama yaklaşımı sağlamak için izlenmesi gereken kuralları ve en iyi uygulamaları içerir.

## Genel Kurallar

1. **Metin İçeriği Yönetimi**
   - Tüm kullanıcıya gösterilen metinler `/src/data/textContent.ts` dosyasında merkezi olarak tanımlanmalıdır.
   - Hiçbir sayfa veya bileşende sabit metin (hard-coded) kullanılmamalıdır.
   - Yeni bir sayfa veya bileşen oluşturulduğunda ilgili metinler `textContent` nesnesine eklenmelidir.

2. **Stil Yönetimi**
   - Tüm stillendirmeler için Tailwind CSS kullanılmalıdır.
   - Tekrarlanan stil sınıfları için özel yardımcı sınıflar oluşturulmalı ve kullanılmalıdır.
   - Karmaşık stil kombinasyonları için bileşenlere özel CSS modülleri kullanılabilir.

3. **Bileşen Yapısı**
   - Sayfalar `/src/app` klasörü altında tanımlanmalıdır.
   - Yeniden kullanılabilir bileşenler `/src/components` klasörü altında bulunmalıdır.
   - Karmaşık bileşenler mantıksal olarak alt bileşenlere bölünmelidir.

4. **Tipler ve Arayüzler**
   - Tüm veri yapıları için TypeScript tiplerini `/src/types` klasörü altında tanımlayın.
   - Prop'lar için arayüzler (interfaces) kullanın.
   - "any" tip kullanımından kaçının. Mümkün olduğunca kesin tipler belirtin.

## Yeni Sayfa Oluştururken

1. **Klasör Yapısı**
   - Yeni bir sayfa için `/src/app/[sayfa-adı]/page.tsx` şeklinde klasör oluşturun.
   - Gerekirse `/src/app/[sayfa-adı]/metadata.tsx` dosyası ile meta verileri tanımlayın.

2. **Metin İçeriği Hazırlama**
   - Yeni sayfa için gerekli metinleri önce `/src/data/textContent.ts` dosyasına ekleyin:
   ```typescript
   export const textContent = {
     // ...existing content
     yeniSayfaAdi: {
       banner: {
         badge: 'Badge Metni',
         title: 'Sayfa Başlığı',
         description: 'Sayfa açıklaması...',
       },
       // diğer metin öğeleri...
     }
   };
   ```

3. **Sayfa İçeriği**
   - Oluşturduğunuz metin içeriğini sayfada kullanın:
   ```typescript
   'use client';

   import { textContent } from '@/data/textContent';

   export default function YeniSayfa() {
     const texts = textContent.yeniSayfaAdi;

     return (
       <div>
         <h1>{texts.banner.title}</h1>
         <p>{texts.banner.description}</p>
         {/* diğer içerikler... */}
       </div>
     );
   }
   ```

## Bileşen Geliştirme Kuralları

1. **Yeniden Kullanılabilirlik**
   - Bileşenler, farklı sayfa ve bağlamlarda yeniden kullanılabilecek şekilde tasarlanmalıdır.
   - Bileşenler, genel davranış için prop'ları kabul etmelidir.

2. **İsimlendirme**
   - Bileşen dosyaları PascalCase kullanmalıdır (örn. `CharacterCard.tsx`).
   - Fonksiyonlar ve değişkenler için camelCase kullanılmalıdır.
   - CSS sınıfları için kebab-case kullanılmalıdır (Tailwind'de zaten bu şekilde).

3. **Reaktif Tasarım**
   - Tüm bileşenler mobile-first yaklaşımıyla tasarlanmalıdır.
   - Tailwind'in tepkisel (responsive) öneklerini (`sm:`, `md:`, `lg:`, `xl:`) kullanarak farklı ekran boyutları için tasarım yapın.

## Veritabanı ve API İşlemleri

1. **Veri Alma ve İşleme**
   - API çağrıları için `fetch` API'sini kullanın.
   - Hataları uygun şekilde yakalayın ve kullanıcıya gösterin.
   - Veri yükleme durumları için yükleme göstergeleri (skeletons) kullanın.

2. **Veri Önbelleğe Alma (Caching)**
   - Sık değişmeyen veriler için önbelleğe alma tekniklerini kullanın.
   - API isteklerini optimize edin, gerekirse veri alma sıklığını sınırlayın.

## Erişilebilirlik Kuralları

1. **ARIA Özellikleri**
   - Tüm etkileşimli öğeler için uygun ARIA özelliklerini ekleyin.
   - Modal, açılır menü ve diğer karmaşık etkileşimli bileşenler için erişilebilirlik en iyi uygulamalarını izleyin.

2. **Klavye Navigasyonu**
   - Tüm etkileşimli öğelerin klavye ile kullanılabilir olduğundan emin olun.
   - Odak göstergelerini (`focus-visible`) uygun şekilde yapılandırın.

## Performans İyileştirmeleri

1. **Kod Bölme (Code Splitting)**
   - Büyük bileşenler veya sayfalar için dinamik içe aktarma kullanın (`dynamic import`).
   - Ağır bileşenleri gerektiğinde yükleyin.

2. **İmaj Optimizasyonu**
   - Tüm görseller için Next.js'in `Image` bileşenini kullanın.
   - Uygun boyut ve formatları sağlayın.
   - Yedek görselleri (fallback) ve yükleme durumları için hükümler koyun.

## Yeni Özellikler Eklerken

1. **Değişiklik Yaklaşımı**
   - Önce metin içeriğini `textContent.ts` dosyasına ekleyin.
   - Sonra sayfayı veya bileşeni oluşturun.
   - Son olarak, oluşturulan sayfayı veya bileşeni `textContent`'ten metinleri kullanacak şekilde güncelleyin.

2. **Test Stratejisi**
   - Değişikliklerinizi farklı tarayıcılarda ve ekran boyutlarında test edin.
   - Erişilebilirlik standartlarına uygunluğunu kontrol edin.

Bu kurallar, Attack on Titan Web projesinde tutarlı, sürdürülebilir ve yüksek kaliteli bir kod tabanı sağlamak için tasarlanmıştır. Herhangi bir katkı yapmadan önce lütfen bu kurallara başvurun.