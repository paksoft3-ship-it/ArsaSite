import homeContent from '@/data/home-content.json';
import Icon from '@/components/ui/Icon';

export default function ProcessSection() {
  const { process } = homeContent;

  return (
    <section className="section bg-dark-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-map-pattern opacity-10" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="section-title text-white">{process.title}</h2>
          <p className="section-description text-gray-400 mx-auto">{process.description}</p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {process.steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line - Hidden on mobile, shown on lg */}
              {index < process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-primary/30">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                </div>
              )}

              {/* Step Card */}
              <div className="bg-surface-dark rounded-2xl p-6 text-center relative group hover:bg-primary/10 transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-dark-charcoal font-black flex items-center justify-center text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-2 group-hover:bg-primary group-hover:text-dark-charcoal transition-all duration-300">
                  <Icon name={step.icon} className="!text-[32px] text-primary group-hover:text-dark-charcoal" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{step.description}</p>

                {/* Duration Badge */}
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <Icon name="schedule" className="!text-[14px]" />
                  {step.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
