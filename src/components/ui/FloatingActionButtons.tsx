'use client';

import { useState, useEffect } from 'react';
import siteConfig from '@/data/site-config.json';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/Icon';

export default function FloatingActionButtons() {
    const [isVisible, setIsVisible] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        // Show after initial load
        const timer = setTimeout(() => setIsVisible(true), 2000);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const whatsappMessage = encodeURIComponent(
        'Merhaba, arsam hakkında bilgi almak istiyorum.'
    );

    return (
        <div
            className={cn(
                'fixed z-50 transition-all duration-300',
                // Mobile: Seamless horizontal strip (3 cols, no gap, no padding)
                'bottom-0 left-0 right-0 grid grid-cols-3 gap-0 shadow-lg',
                // Desktop: Vertical stack at bottom-right
                'sm:bg-transparent sm:backdrop-blur-none sm:border-none sm:shadow-none sm:bottom-6 sm:right-6 sm:left-auto sm:w-auto sm:flex sm:flex-col sm:gap-3 sm:items-end sm:block',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 sm:translate-y-4 sm:pointer-events-none'
            )}
        >
            {/* 1. Phone Button */}
            <div className="relative group col-span-1">
                <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-charcoal text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Hemen Ara
                </span>
                <a
                    href={siteConfig.contact.phoneLink}
                    className="flex h-14 w-full sm:w-14 sm:h-14 items-center justify-center rounded-none sm:rounded-full bg-blue-600 text-white shadow-none sm:shadow-lg sm:shadow-blue-900/30 hover:bg-blue-700 sm:hover:scale-110 sm:hover:shadow-xl transition-all duration-300"
                    aria-label="Telefon ile Ara"
                >
                    <svg
                        fill="currentColor"
                        height="24"
                        width="24"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    <span className="sm:hidden ml-2 font-bold text-sm">Hemen Ara</span>
                </a>
            </div>

            {/* 2. WhatsApp Button */}
            <div className="relative group col-span-1">
                <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-charcoal text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    WhatsApp
                </span>
                <a
                    href={`${siteConfig.contact.whatsappLink}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-full sm:w-14 sm:h-14 items-center justify-center rounded-none sm:rounded-full bg-[#25D366] text-white shadow-none sm:shadow-lg sm:shadow-green-900/30 hover:bg-[#20bd5a] sm:hover:scale-110 sm:hover:shadow-xl transition-all duration-300 whatsapp-btn"
                    aria-label="WhatsApp ile İletişime Geçin"
                >
                    <svg
                        fill="currentColor"
                        height="32"
                        width="32"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 sm:w-7 sm:h-7"
                    >
                        <path
                            d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                        />
                    </svg>
                    <span className="sm:hidden ml-2 font-bold text-sm">WhatsApp</span>
                </a>
            </div>

            {/* 3. Chat Bot Button */}
            <div className="relative group col-span-1">
                {/* Tooltip */}
                <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-charcoal text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    AI Asistan
                </span>
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)} // Placeholder logic
                    className="flex h-14 w-full sm:w-14 sm:h-14 items-center justify-center rounded-none sm:rounded-full bg-indigo-600 text-white shadow-none sm:shadow-lg sm:shadow-indigo-900/30 hover:bg-indigo-700 sm:hover:scale-110 sm:hover:shadow-xl transition-all duration-300"
                    aria-label="Chat Bot"
                >
                    <Icon name="smart_toy" className="!text-[20px] sm:!text-[24px]" />
                    <span className="sm:hidden ml-1.5 font-bold text-xs">Asistan</span>
                </button>
            </div>

            {/* Simple Chat Placeholder Modal */}
            {isChatOpen && (
                <div className="absolute bottom-full right-0 sm:right-0 sm:mb-4 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 transition-all animate-in fade-in slide-in-from-bottom-2 mb-4 mx-4 sm:mx-0 left-0 sm:left-auto">
                    <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2 font-bold text-dark-charcoal">
                            <Icon name="smart_toy" className="!text-[20px] text-indigo-600" />
                            Asistan
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-red-500">
                            <Icon name="close" className="!text-[20px]" />
                        </button>
                    </div>
                    <p className="text-sm text-secondary-text mb-4">
                        Merhaba! Ben yapay zeka asistanınızım. Şu an geliştirilme aşamasındayım. Size WhatsApp üzerinden hızlıca yardımcı olabiliriz.
                    </p>
                    <a
                        href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Merhaba, AI Asistan üzerinden yönlendirildim.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp btn-sm w-full text-center block"
                    >
                        WhatsApp'a Geç
                    </a>
                </div>
            )}
        </div>
    );
}
