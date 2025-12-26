import homeContent from '@/data/home-content.json';
import Icon from '@/components/ui/Icon';

export default function WhyUsSection() {
  const { whyUs } = homeContent;

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="section-title">{whyUs.title}</h2>
          <p className="section-description mx-auto">{whyUs.description}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyUs.features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-dark-charcoal transition-all duration-300">
                <Icon name={feature.icon} className="!text-[28px] text-primary group-hover:text-dark-charcoal" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-dark-charcoal mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
