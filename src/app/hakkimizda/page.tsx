import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta } from '@/lib/seo';
import aboutData from '@/data/about.json';
import Icon from '@/components/ui/Icon';

export const metadata: Metadata = genMeta({
  title: 'Hakkımızda',
  description: 'ArsaAl - Türkiye\'nin en güvenilir arsa alım satım platformu. Misyonumuz, vizyonumuz ve değerlerimiz.',
  url: '/hakkimizda',
});

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-background-light to-primary/5 py-12">
        <div className="container-custom">
          <h1 className="text-4xl sm:text-5xl font-black text-dark-charcoal tracking-tight mb-4">
            {aboutData.hero.title}
          </h1>
          <p className="text-lg text-secondary-text max-w-2xl">
            {aboutData.hero.description}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">{aboutData.story.title}</h2>
              <div className="space-y-4 text-secondary-text leading-relaxed">
                {aboutData.story.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl aspect-square flex items-center justify-center">
              <Icon name="apartment" className="!text-[100px] text-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-dark-charcoal">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-black text-primary mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-background-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={aboutData.mission.icon} className="!text-[28px] text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark-charcoal mb-3">{aboutData.mission.title}</h3>
              <p className="text-secondary-text leading-relaxed">{aboutData.mission.description}</p>
            </div>
            <div className="card p-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={aboutData.vision.icon} className="!text-[28px] text-primary" />
              </div>
              <h3 className="text-xl font-bold text-dark-charcoal mb-3">{aboutData.vision.title}</h3>
              <p className="text-secondary-text leading-relaxed">{aboutData.vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">{aboutData.values.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.items.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={value.icon} className="!text-[32px] text-primary" />
                </div>
                <h3 className="font-bold text-dark-charcoal mb-2">{value.title}</h3>
                <p className="text-secondary-text text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary/5">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">{aboutData.cta.title}</h2>
          <p className="text-secondary-text text-lg max-w-xl mx-auto mb-8">
            {aboutData.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={aboutData.cta.buttons.primary.href} className="btn-primary btn-lg">
              {aboutData.cta.buttons.primary.label}
            </Link>
            <Link href={aboutData.cta.buttons.secondary.href} className="btn-outline btn-lg">
              {aboutData.cta.buttons.secondary.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
