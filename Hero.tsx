import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';

export function Hero() {
  return (
    <section id="home" className="overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="font-mono-tech mb-3 text-xs font-semibold tracking-wider text-[#9275FF] uppercase">
              Fresh Campus Popcorn · Crunch Mode Active
            </p>

            <h1
              style={{ textWrap: 'balance' }}
              className="font-display text-4xl font-extrabold tracking-tight text-[#101426] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]"
            >
              POP INTO A DIFFERENT UNIVERSE.
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#101426]/75 sm:text-lg">
              Pick your packs, add to cart, and check out straight to WhatsApp in
              seconds. No stress, just fresh crunch.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#our-pops"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#FFC94A] px-6 py-3 text-sm font-bold tracking-wide text-[#101426] shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#ffbe24] active:translate-y-0 whitespace-nowrap shrink-0"
              >
                <span>SHOP POPCORN</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Right Hero Image: First image nicely zoomed in on the golden kernels */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="flex justify-center lg:col-span-6"
          >
            <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-[#101426]/10 bg-white shadow-md">
              <motion.img
                src={SITE_CONFIG.brand.heroImage}
                alt={SITE_CONFIG.brand.heroImageAlt}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  transformOrigin: '50% 18%',
                }}
                className="h-full w-full scale-[1.85] object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
