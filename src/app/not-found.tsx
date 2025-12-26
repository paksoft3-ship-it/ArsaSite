import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="container-custom text-center">
        <Icon name="search_off" className="!text-[80px] text-gray-300 mb-6" />
        <h1 className="text-4xl font-black text-dark-charcoal mb-4">Sayfa Bulunamadı</h1>
        <p className="text-secondary-text text-lg mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary btn-lg">
            <Icon name="home" className="!text-[20px] mr-2" />
            Ana Sayfaya Dön
          </Link>
          <Link href="/iletisim" className="btn-outline btn-lg">
            <Icon name="mail" className="!text-[20px] mr-2" />
            İletişime Geç
          </Link>
        </div>
      </div>
    </section>
  );
}
