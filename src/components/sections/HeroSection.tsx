import Link from 'next/link';
import Image from 'next/image';
import homeContent from '@/data/home-content.json';
import siteConfig from '@/data/site-config.json';
import Icon from '@/components/ui/Icon';
import QuoteForm from '@/components/forms/QuoteForm';

export default function HeroSection() {
  const { hero } = homeContent;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background-light via-white to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-map-pattern opacity-30" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 py-12 sm:py-16 lg:py-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit">
              <Icon name="bolt" className="!text-[18px]" />
              {hero.badge}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark-charcoal tracking-tight leading-tight mb-6">
              {hero.title.line1}{' '}
              <span className="text-primary">{hero.title.line2}</span>
              <br />
              <span className="text-secondary-text text-3xl sm:text-4xl lg:text-5xl font-bold">
                {hero.title.highlight}
              </span>{' '}
              {hero.title.line3}
            </h1>

            {/* Description */}
            <p className="text-lg text-secondary-text leading-relaxed mb-8 max-w-xl">
              {hero.description}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {hero.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-dark-charcoal">
                  <Icon name={feature.icon} className="!text-[20px] text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={hero.cta.primary.href}
                className="btn-primary btn-lg group"
              >
                {hero.cta.primary.label}
                <Icon name={hero.cta.primary.icon} className="!text-[20px] ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Merhaba, arsam hakkında bilgi almak istiyorum.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-lg flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                {hero.cta.secondary.label}
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-gray-200">
              {hero.stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-3xl font-black text-dark-charcoal">{stat.value}</div>
                  <div className="text-sm text-secondary-text">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Quote Form */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
