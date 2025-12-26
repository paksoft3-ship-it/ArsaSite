'use client';

import { useState } from 'react';
import siteConfig from '@/data/site-config.json';
import citiesData from '@/data/cities.json';
import Icon from '@/components/ui/Icon';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    subject: '',
    message: '',
    kvkkConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ad Soyad gereklidir';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası gereklidir';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesajınızı yazınız';
    }

    if (!formData.kvkkConsent) {
      newErrors.kvkkConsent = 'KVKK onayı gereklidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Build WhatsApp message
    const message = `Merhaba, web sitesi üzerinden mesaj göndermek istiyorum.

📋 *İletişim Bilgileri:*
👤 Ad Soyad: ${formData.name}
📱 Telefon: ${formData.phone}
${formData.email ? `📧 E-posta: ${formData.email}` : ''}
${formData.city ? `📍 Şehir: ${formData.city}` : ''}
${formData.subject ? `📌 Konu: ${formData.subject}` : ''}

💬 *Mesaj:*
${formData.message}`;

    // Redirect to WhatsApp
    const whatsappUrl = `${siteConfig.contact.whatsappLink}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
  };

  const subjectOptions = [
    { value: '', label: 'Konu Seçin' },
    { value: 'arsa-satmak', label: 'Arsami Satmak İstiyorum' },
    { value: 'arsa-almak', label: 'Arsa Almak İstiyorum' },
    { value: 'fiyat-bilgisi', label: 'Fiyat Bilgisi' },
    { value: 'ortaklik', label: 'İş Ortaklığı' },
    { value: 'diger', label: 'Diğer' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name & Phone Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            className={`input ${errors.name ? 'input-error' : ''}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
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
            className={`input ${errors.phone ? 'input-error' : ''}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Email & City Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        {/* City */}
        <div>
          <label htmlFor="city" className="label">
            Şehir
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
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
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
          rows={5}
          className={`input resize-y min-h-[120px] ${errors.message ? 'input-error' : ''}`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      {/* KVKK Checkbox */}
      <div className="flex items-start gap-3">
        <div className="flex h-6 items-center">
          <input
            type="checkbox"
            id="kvkkConsent"
            name="kvkkConsent"
            checked={formData.kvkkConsent}
            onChange={handleChange}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
        </div>
        <div className="text-sm leading-6">
          <label htmlFor="kvkkConsent" className="text-gray-600">
            <a href="/kvkk" className="font-bold text-dark-charcoal hover:underline">
              KVKK Aydınlatma Metni
            </a>
            &apos;ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
            <span className="text-red-500">*</span>
          </label>
          {errors.kvkkConsent && (
            <p className="text-red-500 text-xs mt-1">{errors.kvkkConsent}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary btn-lg"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Gönderiliyor...
          </>
        ) : (
          <>
            <Icon name="send" className="mr-2 !text-[20px]" />
            Mesajı Gönder
          </>
        )}
      </button>
    </form>
  );
}
