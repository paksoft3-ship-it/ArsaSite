'use client';

import { useState } from 'react';
import homeContent from '@/data/home-content.json';
import siteConfig from '@/data/site-config.json';
import citiesData from '@/data/cities.json';
import Icon from '@/components/ui/Icon';
import { generateWhatsAppLink } from '@/lib/utils';

export default function QuoteForm() {
    const { quickForm } = homeContent;
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        district: '',
        landType: '',
        size: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Generate WhatsApp message
        const message = `Merhaba, arsam için teklif almak istiyorum.

📋 Bilgilerim:
👤 Ad Soyad: ${formData.name}
📞 Telefon: ${formData.phone}
📍 Konum: ${formData.city}${formData.district ? ` / ${formData.district}` : ''}
${formData.landType ? `📌 Ada/Parsel: ${formData.landType}` : ''}
${formData.size ? `📐 Büyüklük: ${formData.size} m²` : ''}

Değerlendirmenizi bekliyorum. Teşekkürler.`;

        // Open WhatsApp with message
        const whatsappUrl = generateWhatsAppLink(siteConfig.contact.whatsapp, message);
        window.open(whatsappUrl, '_blank');

        setIsSubmitting(false);
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-dark-charcoal mb-2">{quickForm.title}</h3>
                <p className="text-sm text-secondary-text">{quickForm.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={quickForm.fields.find(f => f.name === 'name')?.placeholder}
                        required
                        className="input bg-gray-50 border-gray-100 focus:bg-white transition-colors"
                    />
                </div>

                {/* Phone */}
                <div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={quickForm.fields.find(f => f.name === 'phone')?.placeholder}
                        required
                        className="input bg-gray-50 border-gray-100 focus:bg-white transition-colors"
                    />
                </div>

                {/* City & District Row */}
                <div className="grid grid-cols-2 gap-3">
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="select bg-gray-50 border-gray-100 focus:bg-white transition-colors text-sm"
                    >
                        <option value="">{quickForm.fields.find(f => f.name === 'city')?.placeholder}</option>
                        {citiesData.cities.map((city) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder={quickForm.fields.find(f => f.name === 'district')?.placeholder}
                        // Removed required check to simplify for now, or check json. Assuming required.
                        className="input bg-gray-50 border-gray-100 focus:bg-white transition-colors text-sm"
                    />
                </div>

                {/* Land Type & Size Row */}
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        name="landType"
                        value={formData.landType}
                        onChange={handleChange}
                        placeholder={quickForm.fields.find(f => f.name === 'landType')?.placeholder}
                        className="input bg-gray-50 border-gray-100 focus:bg-white transition-colors text-sm"
                    />
                    <input
                        type="number"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        placeholder={quickForm.fields.find(f => f.name === 'size')?.placeholder}
                        className="input bg-gray-50 border-gray-100 focus:bg-white transition-colors text-sm"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-dark-charcoal font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 flex items-center justify-center gap-2 hover:-translate-y-0.5 duration-300"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <Icon name="sync" className="!text-[20px] animate-spin" />
                            {quickForm.submitButton.loadingLabel}
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            {quickForm.submitButton.label}
                            <Icon name="arrow_forward" className="!text-[20px]" />
                        </span>
                    )}
                </button>

                {/* Privacy Note */}
                <div className="text-center space-y-2">
                    <p className="text-xs text-gray-400">
                        {quickForm.privacyNote}
                    </p>
                    <div className="pt-3 border-t border-gray-50">
                        <p className="text-xs text-secondary-text flex items-center justify-center gap-1">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                            {quickForm.phoneNote.split(':')[0]}:
                            <a href={siteConfig.contact.phoneLink} className="font-bold text-dark-charcoal hover:text-primary">
                                {siteConfig.contact.phone}
                            </a>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
