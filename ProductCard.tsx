import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PopcornProduct } from '../config/siteConfig';
import { formatNaira } from '../utils/whatsapp';

interface ProductCardProps {
  product: PopcornProduct;
  index: number;
  onAddToCart: (product: PopcornProduct, quantity: number) => void;
}

export function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(25, prev + 1));
  };

  const handleAdd = () => {
    if (!product.available) return;
    onAddToCart(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-[#101426]/10 bg-white transition-shadow duration-200 hover:shadow-lg"
    >
      {/* Normal-sized full product image (1 pack or 2-in-1 pair) */}
      <div className="flex aspect-[4/3] w-full items-center justify-center bg-white p-4">
        {product.imageCount === 2 ? (
          <div className="flex h-full w-full items-center justify-center -space-x-6">
            <img
              src={product.image}
              alt={`${product.imageAlt} pack 1`}
              loading="lazy"
              className="h-[92%] w-1/2 -rotate-3 object-contain"
            />
            <img
              src={product.image}
              alt={`${product.imageAlt} pack 2`}
              loading="lazy"
              className="h-[92%] w-1/2 rotate-3 object-contain"
            />
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col border-t border-[#101426]/6 p-5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-mono-tech font-semibold tracking-wider text-[#9275FF] uppercase">
            {product.label}
          </span>
          <span
            className={`font-medium ${
              product.available ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {product.available ? 'In Stock' : 'Sold Out'}
          </span>
        </div>

        <h3 className="font-display mt-2 text-xl font-bold text-[#101426]">
          {product.name}
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-[#101426]/70">
          {product.description}
        </p>

        {/* Price + Discount + Quantity + Add to Cart */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-[#101426]/8 pt-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-tech text-xl font-extrabold text-[#101426]">
                  {formatNaira(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono-tech text-xs text-[#101426]/45 line-through">
                    {formatNaira(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.discountText && (
                <span className="font-mono-tech block text-[11px] font-semibold text-[#FF914D]">
                  {product.discountText}
                </span>
              )}
            </div>

            <div
              className="inline-flex items-center rounded-xl border border-[#101426]/15 bg-[#FFF9EC]"
              role="group"
              aria-label={`Quantity for ${product.name}`}
            >
              <button
                type="button"
                onClick={handleDecrement}
                disabled={!product.available || quantity <= 1}
                aria-label={`Decrease ${product.name} quantity`}
                className="flex h-10 w-10 items-center justify-center rounded-l-xl text-[#101426] transition-colors hover:bg-[#FFC94A]/30 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span
                className="font-mono-tech min-w-[26px] text-center text-sm font-bold text-[#101426]"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                disabled={!product.available}
                aria-label={`Increase ${product.name} quantity`}
                className="flex h-10 w-10 items-center justify-center rounded-r-xl text-[#101426] transition-colors hover:bg-[#FFC94A]/30 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={handleAdd}
            disabled={!product.available}
            className={`mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9275FF] ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#101426] text-[#FFC94A] hover:bg-[#1c2342]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                <span>Add to Cart</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
