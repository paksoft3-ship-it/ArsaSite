'use client';

import { useState } from 'react';
import siteConfig from '@/data/site-config.json';
import Icon from '@/components/ui/Icon';
import { generateWhatsAppLink } from '@/lib/utils';

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
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

    const message = `Merhaba, web siteniz üzerinden iletişime geçiyorum.

📋 Bilgilerim:
👤 Ad Soyad: ${formData.name}
📞 Telefon: ${formData.phone}
📧 E-posta: ${formData.email || 'Belirtilmedi'}
📌 Konu: ${formData.subject || 'Genel'}

💬 Mesaj:
${formData.message}`;

    const whatsappUrl = generateWhatsAppLink(siteConfig.contact.whatsapp, message);
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black text-dark-charcoal tracking-tight mb-4">
            Bize Ulaşın
          </h1>
          <p className="text-lg text-secondary-text leading-relaxed max-w-xl">
            Sorularınız mı var? Arsanızı satmak veya portföyümüzdeki arsalar hakkında bilgi almak için size yardımcı olmaya hazırız.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left - Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl bg-dark-charcoal p-8 sm:p-10 text-white shadow-xl h-full flex flex-col">
              <div className="absolute inset-0 bg-map-pattern opacity-30 pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <h2 className="text-2xl font-bold mb-8">İletişim Kanalları</h2>

                {/* Phone */}
                <div className="flex flex-col gap-2 mb-8 group cursor-pointer">
                  <span className="text-primary text-sm font-bold uppercase tracking-wider">
                    Telefon
                  </span>
                  <a
                    href={siteConfig.contact.phoneLink}
                    className="text-3xl sm:text-4xl font-black text-white group-hover:text-primary transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  <span className="text-gray-400 text-sm">{siteConfig.contact.workingHours}</span>
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-2 mb-8 group cursor-pointer">
                  <span className="text-primary text-sm font-bold uppercase tracking-wider">
                    WhatsApp
                  </span>
                  <a
                    href={siteConfig.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Icon name="chat_bubble" className="!text-[24px]" />
                    Hemen Yazın
                  </a>
                  <span className="text-gray-400 text-sm">7/24 Mesaj Atabilirsiniz</span>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 mb-8 group cursor-pointer">
                  <span className="text-primary text-sm font-bold uppercase tracking-wider">
                    E-posta
                  </span>
                  <a
                    href={siteConfig.contact.emailLink}
                    className="text-xl font-bold text-white group-hover:text-primary transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-2 mt-auto pt-8 border-t border-white/10">
                  <span className="text-primary text-sm font-bold uppercase tracking-wider">
                    Adres
                  </span>
                  <p className="text-gray-300 leading-relaxed">
                    {siteConfig.contact.address.full}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-dark-charcoal mb-2">
                Mesaj Gönderin
              </h2>
              <p className="text-secondary-text mb-8">
                Formu doldurun, en kısa sürede size dönüş yapalım.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
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

                  {/* Phone */}
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

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="label">
                      E-posta
                    </label>
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

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="label">
                      Konu
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="select"
                    >
                      <option value="">Konu Seçin</option>
                      <option value="arsa-satis">Arsa Satmak İstiyorum</option>
                      <option value="arsa-al">Arsa Almak İstiyorum</option>
                      <option value="degerlendirme">Değerlendirme Talebi</option>
                      <option value="genel">Genel Bilgi</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="label">
                    Mesajınız <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Sorunuzu veya talebinizi buraya yazabilirsiniz..."
                    required
                    rows={5}
                    className="input resize-y min-h-[140px]"
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
                      Mesajı Gönder
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-80 sm:h-96 relative grayscale hover:grayscale-0 transition-all duration-700">
        <div className="w-full h-full bg-gray-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect fill="url(#grid)" width="100%" height="100%" />
            </svg>
          </div>
          <div className="bg-white px-6 py-3 rounded-full shadow-lg z-10 flex items-center gap-2 border border-gray-100">
            <Icon name="pin_drop" className="text-primary" />
            <span className="font-bold text-sm">{siteConfig.contact.address.short}</span>
          </div>
        </div>
      </section>
    </>
  );
}
