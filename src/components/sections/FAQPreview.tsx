'use client';

import { useState } from 'react';
import Link from 'next/link';
import homeContent from '@/data/home-content.json';
import Icon from '@/components/ui/Icon';

export default function FAQPreview() {
  const { faq } = homeContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-background-light">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Header */}
          <div className="lg:sticky lg:top-28">
            <h2 className="section-title">{faq.title}</h2>
            <p className="section-description mt-4 mb-8">
              Aklınıza takılan sorular mı var? En çok sorulan soruların cevaplarını burada bulabilirsiniz.
            </p>
            <Link
              href={faq.viewAllLink.href}
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            >
              {faq.viewAllLink.label}
              <Icon name="arrow_forward" className="!text-[18px]" />
            </Link>
          </div>

          {/* Right - FAQ Items */}
          <div className="space-y-4">
            {faq.items.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-dark-charcoal pr-4">
                    {item.question}
                  </span>
                  <Icon
                    name={openIndex === index ? 'remove' : 'add'}
                    className={`!text-[24px] flex-shrink-0 transition-colors ${
                      openIndex === index ? 'text-primary' : 'text-gray-400'
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-secondary-text leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
