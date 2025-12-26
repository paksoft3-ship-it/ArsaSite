'use client';

import { useState } from 'react';
import siteConfig from '@/data/site-config.json';
import homeContent from '@/data/home-content.json';
import citiesData from '@/data/cities.json';
import Icon from '@/components/ui/Icon';
import { generateWhatsAppLink } from '@/lib/utils';

export default function ArsaSatPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    neighborhood: '',
    adaParsel: '',
    size: '',
    imarDurumu: '',
    message: '',
    kvkk: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `Merhaba, arsam için teklif almak istiyorum.

📋 Kişisel Bilgiler:
👤 Ad Soyad: ${formData.name}
📞 Telefon: ${formData.phone}
📧 E-posta: ${formData.email || 'Belirtilmedi'}

🏞️ Arsa Bilgileri:
📍 Konum: ${formData.city}${formData.district ? ` / ${formData.district}` : ''}${formData.neighborhood ? ` / ${formData.neighborhood}` : ''}
📌 Ada/Parsel: ${formData.adaParsel || 'Belirtilmedi'}
📐 Büyüklük: ${formData.size ? formData.size + ' m²' : 'Belirtilmedi'}
🏗️ İmar Durumu: ${formData.imarDurumu || 'Belirtilmedi'}

💬 Ek Bilgiler:
${formData.message || 'Yok'}

Değerlendirmenizi bekliyorum. Teşekkürler.`;

    window.open(generateWhatsAppLink(siteConfig.contact.whatsapp, message), '_blank');
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark-charcoal to-surface-dark py-16 overflow-hidden">
        <div className="absolute inset-0 bg-map-pattern opacity-10" />
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Icon name="bolt" className="!text-[18px]" />
              Aynı Gün Nakit Teklif
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Arsanızı <span className="text-primary">Hızlıca</span> Satın
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Formu doldurun, uzman ekibimiz arsanızı değerlendirsin. 24 saat içinde size özel nakit teklifimizi sunalım.
            </p>
            <div className="flex flex-wrap gap-6">
              {homeContent.hero.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-black text-primary">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section bg-background-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card p-6 sm:p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-dark-charcoal mb-2">Arsa Bilgilerinizi Girin</h2>
                <p className="text-secondary-text mb-8">
                  Ne kadar detaylı bilgi verirseniz, o kadar doğru bir değerlendirme yapabiliriz.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="font-bold text-dark-charcoal mb-4 flex items-center gap-2">
                      <Icon name="person" className="!text-[20px] text-primary" />
                      Kişisel Bilgiler
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="label">
                          Ad Soyad <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Adınız Soyadınız"
                          required
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="label">
                          Telefon <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="05XX XXX XX XX"
                          required
                          className="input"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="email" className="label">E-posta</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ornek@email.com"
                          className="input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div>
                    <h3 className="font-bold text-dark-charcoal mb-4 flex items-center gap-2">
                      <Icon name="location_on" className="!text-[20px] text-primary" />
                      Konum Bilgileri
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="label">
                          Şehir <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="select"
                        >
                          <option value="">Şehir Seçin</option>
                          {citiesData.cities.map((city) => (
                            <option key={city.id} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="district" className="label">İlçe</label>
                        <input
                          type="text"
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          placeholder="İlçe Adı"
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="neighborhood" className="label">Mahalle/Köy</label>
                        <input
                          type="text"
                          id="neighborhood"
                          name="neighborhood"
                          value={formData.neighborhood}
                          onChange={handleChange}
                          placeholder="Mahalle veya Köy"
                          className="input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Info */}
                  <div>
                    <h3 className="font-bold text-dark-charcoal mb-4 flex items-center gap-2">
                      <Icon name="landscape" className="!text-[20px] text-primary" />
                      Arsa Bilgileri
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="adaParsel" className="label">Ada/Parsel No</label>
                        <input
                          type="text"
                          id="adaParsel"
                          name="adaParsel"
                          value={formData.adaParsel}
                          onChange={handleChange}
                          placeholder="Örn: 123/4"
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="size" className="label">Büyüklük (m²)</label>
                        <input
                          type="number"
                          id="size"
                          name="size"
                          value={formData.size}
                          onChange={handleChange}
                          placeholder="Örn: 500"
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="imarDurumu" className="label">İmar Durumu</label>
                        <select
                          id="imarDurumu"
                          name="imarDurumu"
                          value={formData.imarDurumu}
                          onChange={handleChange}
                          className="select"
                        >
                          <option value="">Seçin</option>
                          <option value="konut-imarli">Konut İmarlı</option>
                          <option value="ticari-imarli">Ticari İmarlı</option>
                          <option value="villa-imarli">Villa İmarlı</option>
                          <option value="turizm-imarli">Turizm İmarlı</option>
                          <option value="sanayi-imarli">Sanayi İmarlı</option>
                          <option value="tarla">Tarla</option>
                          <option value="imarsiz">İmarsız</option>
                          <option value="bilmiyorum">Bilmiyorum</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <label htmlFor="message" className="label">Ek Bilgiler</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Arsanız hakkında eklemek istediğiniz bilgiler (örn: yola cephesi var, elektrik mevcut, vb.)"
                      rows={4}
                      className="input resize-y"
                    />
                  </div>

                  {/* KVKK */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="kvkk"
                      name="kvkk"
                      checked={formData.kvkk}
                      onChange={handleChange}
                      required
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                    />
                    <label htmlFor="kvkk" className="text-sm text-gray-600">
                      <a href="/kvkk" className="font-bold text-dark-charcoal hover:underline">
                        KVKK Aydınlatma Metni
                      </a>
                      'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.kvkk}
                    className="btn-primary btn-lg w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="sync" className="!text-[20px] mr-2 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Icon name="send" className="!text-[20px] mr-2" />
                        Teklif İste
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Us Card */}
              <div className="card p-6">
                <h3 className="font-bold text-dark-charcoal mb-4">Neden Bizi Tercih Etmelisiniz?</h3>
                <div className="space-y-4">
                  {homeContent.whyUs.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} className="!text-[20px] text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-dark-charcoal text-sm">{feature.title}</div>
                        <div className="text-xs text-secondary-text">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="card p-6 bg-dark-charcoal text-white">
                <h3 className="font-bold mb-4">Hemen Arayın</h3>
                <a
                  href={siteConfig.contact.phoneLink}
                  className="text-2xl font-black text-primary hover:text-primary-dark transition-colors block mb-2"
                >
                  {siteConfig.contact.phone}
                </a>
                <p className="text-gray-400 text-sm mb-4">{siteConfig.contact.workingHours}</p>
                <a
                  href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Merhaba, arsam hakkında bilgi almak istiyorum.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp btn-md w-full flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  WhatsApp ile Yazın
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Nasıl Çalışır?</h2>
            <p className="section-description mx-auto">4 basit adımda arsanızı nakite çevirin.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeContent.process.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={step.icon} className="!text-[32px] text-primary" />
                </div>
                <div className="text-primary font-bold text-sm mb-2">Adım {step.number}</div>
                <h3 className="font-bold text-dark-charcoal mb-2">{step.title}</h3>
                <p className="text-secondary-text text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
