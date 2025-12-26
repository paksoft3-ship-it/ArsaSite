import homeContent from '@/data/home-content.json';
import Icon from '@/components/ui/Icon';

export default function TestimonialsSection() {
  const { testimonials } = homeContent;

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="section-title">{testimonials.title}</h2>
          <p className="section-description mx-auto">{testimonials.description}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card p-6 hover:shadow-card-hover transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    filled={i < testimonial.rating}
                    className={`!text-[20px] ${i < testimonial.rating ? 'text-amber-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-dark-charcoal leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="person" className="!text-[20px] text-primary" />
                </div>
                <div>
                  <div className="font-bold text-dark-charcoal">{testimonial.name}</div>
                  <div className="text-sm text-secondary-text flex items-center gap-1">
                    <Icon name="location_on" className="!text-[14px]" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
