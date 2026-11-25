import { MotionConfig } from 'motion/react';
import { useRef, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { PopcornCollection } from './components/PopcornCollection';
import { Toast } from './components/Toast';
import { PopcornProduct } from './config/siteConfig';
import { useCart } from './hooks/useCart';

export default function App() {
  const {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    totalAmount,
  } = useCart();

  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const handleAddToCart = (product: PopcornProduct, quantity: number) => {
    addItem(product, quantity);
    const unit = quantity === 1 ? 'pack' : 'packs';
    setToastMessage(`Added ${quantity} ${unit} of ${product.name}`);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#FFF9EC] text-[#101426]">
        <Navbar cartCount={totalCount} onOpenCart={() => setCartOpen(true)} />

        <main className="flex-1">
          <Hero />
          <PopcornCollection onAddToCart={handleAddToCart} />
        </main>

        <Footer />

        <CartDrawer
          isOpen={cartOpen}
          items={items}
          totalAmount={totalAmount}
          totalCount={totalCount}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
        />

        <Toast
          message={toastMessage}
          onViewCart={() => {
            setToastMessage(null);
            setCartOpen(true);
          }}
        />
      </div>
    </MotionConfig>
  );
}
