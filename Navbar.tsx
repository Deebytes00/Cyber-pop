import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { buildDirectChatWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const whatsappUrl = buildDirectChatWhatsAppUrl();

  return (
    <header className="sticky top-0 z-40 border-b border-[#101426]/10 bg-[#FFF9EC]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9275FF]"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#101426] text-[#FFC94A]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 9.5C5.5 8 6.5 5 9 5C10 3.2 12.8 3 14 4.8C16 4 18.5 5.3 18.2 7.6C19.8 8.5 19.5 11 17.5 11.5H6.8C5.2 11 5.2 9.8 7 9.5Z"
                fill="#FFC94A"
              />
              <path d="M6.5 11.5H17.5L15.8 20.5H8.2L6.5 11.5Z" fill="#FFF9EC" />
            </svg>
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-[#101426]">
            {SITE_CONFIG.brand.name}
          </span>
        </a>

        {/* Zone 2: Minimal Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden sm:flex items-center gap-7 text-sm font-semibold text-[#101426]/75"
        >
          <a
            href="#home"
            className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#101426]"
          >
            Home
          </a>
          <a
            href="#our-pops"
            className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#101426]"
          >
            Shop Pops
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#101426]"
          >
            WhatsApp
          </a>
        </nav>

        {/* Zone 3: Cart Action */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={onOpenCart}
          aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#101426] px-4 py-2 text-sm font-semibold text-[#FFF9EC] transition-colors hover:bg-[#1a203c] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9275FF]"
        >
          <ShoppingBag className="h-4 w-4 text-[#FFC94A]" aria-hidden="true" />
          <span>Cart</span>
          <motion.span
            key={cartCount}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="font-mono-tech inline-flex min-w-[22px] items-center justify-center rounded-md bg-[#FFC94A] px-1.5 py-0.5 text-xs font-bold text-[#101426]"
          >
            {cartCount}
          </motion.span>
        </motion.button>
      </div>
    </header>
  );
}
