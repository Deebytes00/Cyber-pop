import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import {
  buildCartWhatsAppUrl,
  buildOrderMessage,
  CartItem,
  formatNaira,
} from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  totalAmount: number;
  totalCount: number;
  onClose: () => void;
  onUpdateQuantity: (productId: string, nextQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  totalAmount,
  totalCount,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const checkoutUrl = buildCartWhatsAppUrl(items);
  const messagePreview = items.length > 0 ? buildOrderMessage(items) : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#101426]/60 backdrop-blur-xs"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#FFF9EC] text-[#101426] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#101426]/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#101426]" aria-hidden="true" />
                <h2
                  id="cart-drawer-title"
                  className="font-display text-lg font-extrabold text-[#101426]"
                >
                  Your Cart ({totalCount})
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#101426]/15 bg-white text-[#101426] transition-colors hover:bg-[#FFC94A]/30 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFC94A]/25 text-[#101426]">
                    <ShoppingBag className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-4 text-xl font-bold text-[#101426]">
                    Your cart is empty
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-[#101426]/70">
                    Pick any flavour to get started.
                  </p>
                  <a
                    href="#our-pops"
                    onClick={onClose}
                    className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#101426] px-6 py-2.5 text-sm font-bold text-[#FFC94A] transition-colors hover:bg-[#1c2342]"
                  >
                    Browse Popcorn
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3.5 rounded-2xl border border-[#101426]/10 bg-white p-3.5"
                      >
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
                          {item.product.imageCount === 2 ? (
                            <div className="flex h-full w-full items-center justify-center -space-x-2">
                              <img
                                src={item.product.image}
                                alt={`${item.product.imageAlt} pack 1`}
                                className="h-[90%] w-1/2 -rotate-3 object-contain"
                              />
                              <img
                                src={item.product.image}
                                alt={`${item.product.imageAlt} pack 2`}
                                className="h-[90%] w-1/2 rotate-3 object-contain"
                              />
                            </div>
                          ) : (
                            <img
                              src={item.product.image}
                              alt={item.product.imageAlt}
                              className="h-full w-full object-contain"
                            />
                          )}
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-display text-sm font-bold text-[#101426]">
                                {item.product.name}
                              </h3>
                              <p className="font-mono-tech text-xs text-[#101426]/65">
                                {formatNaira(item.product.price)} each
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              aria-label={`Remove ${item.product.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#101426]/55 transition-colors hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="inline-flex items-center rounded-lg border border-[#101426]/15 bg-[#FFF9EC]">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity - 1)
                                }
                                aria-label={`Decrease quantity of ${item.product.name}`}
                                className="flex h-9 w-8 items-center justify-center text-[#101426] hover:bg-[#FFC94A]/30 cursor-pointer"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="font-mono-tech min-w-[24px] text-center text-xs font-bold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity + 1)
                                }
                                aria-label={`Increase quantity of ${item.product.name}`}
                                className="flex h-9 w-8 items-center justify-center text-[#101426] hover:bg-[#FFC94A]/30 cursor-pointer"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <span className="font-mono-tech text-sm font-bold text-[#101426]">
                              {formatNaira(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-xs font-semibold text-[#101426]/60 underline-offset-2 hover:text-rose-700 hover:underline cursor-pointer"
                    >
                      Clear cart
                    </button>
                  </div>

                  {/* Order Message Preview */}
                  <div className="rounded-2xl border border-[#101426]/10 bg-white/80 p-3.5">
                    <span className="font-mono-tech text-[11px] font-semibold tracking-wider text-[#9275FF] uppercase">
                      WhatsApp Message Preview
                    </span>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#101426]/80">
                      {messagePreview}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Checkout CTA */}
            {items.length > 0 && (
              <div className="border-t border-[#101426]/10 bg-white px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#101426]/75">
                    Total ({totalCount} {totalCount === 1 ? 'pack' : 'packs'})
                  </span>
                  <span className="font-mono-tech text-2xl font-extrabold text-[#101426]">
                    {formatNaira(totalAmount)}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-2.5">
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#101426] px-5 py-3 text-sm font-bold text-[#FFC94A] transition-colors hover:bg-[#1c2342] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9275FF]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>CHECKOUT ON WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-[#101426]/15 bg-[#FFF9EC] px-4 py-2.5 text-xs font-bold text-[#101426] transition-colors hover:bg-[#FFC94A]/20 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
