import Link from 'next/link';
import homeContent from '@/data/home-content.json';
import siteConfig from '@/data/site-config.json';
import Icon from '@/components/ui/Icon';

export default function CTASection() {
  const { contactCta } = homeContent;

  return (
    <section className="section bg-dark-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-map-pattern opacity-20" />

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            {contactCta.title}
          </h2>
          <p className="text-white/70 text-lg mb-8">
            {contactCta.description}
          </p>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Phone */}
            <a
              href={siteConfig.contact.phoneLink}
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-2xl px-6 py-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 text-dark-charcoal">
                  <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white/60 text-sm">Bizi Arayın</p>
                <p className="text-white font-bold text-lg">{siteConfig.contact.phone}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Merhaba, arsam hakkında bilgi almak istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-2xl px-6 py-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.664-.698c.975.551 1.803.842 2.803.843 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.774-5.771zm3.392 8.244c-1.352.766-1.895 1.391-2.909 1.258-1.577-.206-3.235-1.921-3.951-3.136-.379-.641-.186-1.488.468-2.076.166-.149.37-.215.549-.215.228 0 .395.006.474.019.222.035.348.118.423.298.196.475.642 1.638.691 1.748.061.135.035.298-.078.498-.148.263-.332.391-.482.569-.136.161-.284.281-.132.541.348.598 1.484 1.838 2.378 2.214.281.118.513.067.688-.135.201-.231.523-.695.696-.918.158-.205.356-.166.578-.083.216.082 1.383.652 1.62.77.237.118.395.176.452.275.059.1.059.576-.234 1.391zM12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5l-1.35 4.9 5.09-1.33C8.6 21.6 10.25 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white/60 text-sm">WhatsApp</p>
                <p className="text-white font-bold text-lg">Hemen Yazın</p>
              </div>
            </a>
          </div>

          {/* Main CTA Button */}
          <div className="mt-8">
            <Link href="/arsa-sat" className="btn-primary btn-lg">
              <Icon name="sell" className="mr-2 !text-[20px]" />
              Ücretsiz Teklif Al
            </Link>
          </div>

          {/* Trust Note */}
          <p className="mt-6 text-white/50 text-sm flex items-center justify-center gap-2">
            <Icon name="verified_user" className="!text-[18px]" />
            Tüm görüşmeleriniz gizli tutulur
          </p>
        </div>
      </div >
    </section >
  );
}
