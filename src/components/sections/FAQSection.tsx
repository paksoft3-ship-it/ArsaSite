'use client';

import { useState } from 'react';
import Link from 'next/link';
import homeContent from '@/data/home-content.json';
import faqData from '@/data/faq.json';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  isPreview?: boolean;
}

export default function FAQSection({ isPreview = false }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faq } = homeContent;
  
  // Show only first 5 questions on preview, all on full page
  const questions = isPreview ? faqData.questions.slice(0, 5) : faqData.questions;

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="section-title">{faq.title}</h2>
          </div>
          {isPreview && (
            <Link
              href="/sss"
              className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors group"
            >
              {faq.viewAllLink.label}
              <Icon name="arrow_forward" className="ml-1 !text-[20px] group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {questions.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'bg-background-light rounded-xl overflow-hidden transition-all duration-300',
                openIndex === index && 'ring-1 ring-primary/20'
              )}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-primary/5 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-dark-charcoal pr-8">
                  {item.question}
                </span>
                <span
                  className={cn(
                    'flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center transition-all duration-300',
                    openIndex === index && 'bg-primary rotate-180'
                  )}
                >
                  <Icon
                    name="expand_more"
                    className={cn(
                      '!text-[24px] transition-colors',
                      openIndex === index ? 'text-dark-charcoal' : 'text-secondary-text'
                    )}
                  />
                </span>
              </button>

              {/* Answer */}
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <p className="px-5 pb-5 text-secondary-text leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        {isPreview && (
          <div className="mt-10 text-center">
            <p className="text-secondary-text mb-4">
              Başka bir sorunuz mu var?
            </p>
            <Link href="/iletisim" className="btn-outline btn-md">
              <Icon name="mail" className="mr-2 !text-[20px]" />
              Bize Yazın
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
