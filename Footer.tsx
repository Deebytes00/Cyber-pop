import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildDirectChatWhatsAppUrl } from '../utils/whatsapp';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildDirectChatWhatsAppUrl();

  return (
    <footer className="bg-[#101426] text-[#FFF9EC]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <span className="font-display text-lg font-extrabold tracking-tight text-[#FFC94A]">
            {SITE_CONFIG.brand.name}
          </span>
          <p className="mt-1 text-xs text-[#FFF9EC]/70">
            Powered by Popcorn. Protected by Good Vibes. © {currentYear}{' '}
            {SITE_CONFIG.brand.name}.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-[#FFF9EC] transition-colors hover:border-[#FFC94A] hover:text-[#FFC94A]"
        >
          <MessageCircle className="h-4 w-4 text-[#FFC94A]" aria-hidden="true" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </footer>
  );
}
