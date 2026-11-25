import { PopcornProduct, SITE_CONFIG } from '../config/siteConfig';
import { ProductCard } from './ProductCard';

interface PopcornCollectionProps {
  onAddToCart: (product: PopcornProduct, quantity: number) => void;
}

export function PopcornCollection({ onAddToCart }: PopcornCollectionProps) {
  return (
    <section
      id="our-pops"
      className="border-t border-[#101426]/8 bg-[#FFF9EC] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono-tech text-xs font-semibold tracking-wider text-[#FF914D] uppercase">
              Fresh Batch Menu
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="font-display mt-1 text-3xl font-extrabold tracking-tight text-[#101426] sm:text-4xl"
            >
              Choose Your Crunch
            </h2>
          </div>
          <p className="text-sm text-[#101426]/70">
            Add your packs and tap <strong>Cart</strong> to check out via WhatsApp.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_CONFIG.products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
