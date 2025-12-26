'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import faqData from '@/data/faq.json';
import Icon from '@/components/ui/Icon';

export default function FAQPageContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const filteredQuestions = useMemo(() => {
    let result = faqData.questions;

    if (activeCategory !== 'all') {
      result = result.filter((q) => q.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-background-light to-primary/5 py-12">
        <div className="container-custom">
          <h1 className="text-4xl sm:text-5xl font-black text-dark-charcoal tracking-tight mb-4">
            {faqData.pageTitle}
          </h1>
          <p className="text-lg text-secondary-text max-w-2xl mb-8">
            {faqData.pageDescription}
          </p>

          {/* Search */}
          <div className="max-w-xl">
            <div className="relative">
              <Icon name="search" className="!text-[20px] absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={faqData.searchPlaceholder}
                className="input pl-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-gray-100 bg-white sticky top-16 sm:top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {faqData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`badge transition-all ${activeCategory === cat.id
                    ? 'bg-primary text-dark-charcoal'
                    : 'bg-gray-100 text-secondary-text hover:bg-gray-200'
                  }`}
              >
                <Icon name={cat.icon} className="!text-[16px] mr-1" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section bg-background-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((item) => (
                <div key={item.id} className="card overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-dark-charcoal pr-4">{item.question}</span>
                    <Icon
                      name={openIndex === item.id ? 'remove' : 'add'}
                      className={`!text-[24px] flex-shrink-0 transition-colors ${openIndex === item.id ? 'text-primary' : 'text-gray-400'
                        }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === item.id ? 'max-h-96' : 'max-h-0'
                      }`}
                  >
                    <p className="px-5 pb-5 text-secondary-text leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Icon name="search_off" className="!text-[48px] text-gray-300 mb-4" />
                <p className="text-secondary-text">Aramanızla eşleşen soru bulunamadı.</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <div className="card p-8 bg-primary/5">
              <h3 className="text-xl font-bold text-dark-charcoal mb-2">{faqData.cta.title}</h3>
              <p className="text-secondary-text mb-6">{faqData.cta.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={faqData.cta.buttons.primary.href} className="btn-primary btn-md">
                  {faqData.cta.buttons.primary.label}
                </Link>
                <a href={faqData.cta.buttons.secondary.href} className="btn-outline btn-md">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4.5 h-4.5 mr-2">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                  {faqData.cta.buttons.secondary.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
