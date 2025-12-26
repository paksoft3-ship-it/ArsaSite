import homeContent from '@/data/home-content.json';
import siteConfig from '@/data/site-config.json';
import Icon from '@/components/ui/Icon';

export default function ContactCTA() {
  const { contactCta } = homeContent;

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Icon name="support_agent" className="!text-[36px] text-primary" />
          </div>

          {/* Content */}
          <h2 className="section-title mb-4">{contactCta.title}</h2>
          <p className="text-secondary-text text-lg max-w-xl mx-auto mb-8">
            {contactCta.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.contact.phoneLink}
              className="btn-primary btn-lg"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
              {siteConfig.contact.phone}
            </a>
            <a
              href={siteConfig.contact.emailLink}
              className="btn-outline btn-lg"
            >
              <Icon name="mail" className="!text-[20px] mr-2" />
              {contactCta.buttons.email.label}
            </a>
          </div>

          {/* Working Hours */}
          <p className="mt-6 text-sm text-secondary-text">
            <Icon name="schedule" className="!text-[16px] inline mr-1" />
            {siteConfig.contact.workingHours}
          </p>
        </div>
      </div>
    </section>
  );
}
