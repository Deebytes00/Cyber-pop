import { useCallback, useEffect, useMemo, useState } from 'react';
import { PopcornProduct, SITE_CONFIG } from '../config/siteConfig';
import { CartItem } from '../utils/whatsapp';

const STORAGE_KEY = 'cyberpop_cart_v1';

interface StoredCartEntry {
  id: string;
  quantity: number;
}

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: StoredCartEntry[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((entry) => {
        const product = SITE_CONFIG.products.find((p) => p.id === entry.id);
        if (!product || !product.available || entry.quantity <= 0) return null;
        return {
          product,
          quantity: Math.min(99, Math.floor(entry.quantity)),
        };
      })
      .filter((item): item is CartItem => item !== null);
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart);

  useEffect(() => {
    try {
      const compact: StoredCartEntry[] = items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // Ignore storage quota / private mode errors gracefully
    }
  }, [items]);

  const addItem = useCallback((product: PopcornProduct, quantity = 1) => {
    if (!product.available || quantity <= 0) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
            : i
        );
      }
      return [...prev, { product, quantity: Math.min(99, quantity) }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, nextQuantity: number) => {
    setItems((prev) => {
      if (nextQuantity <= 0) {
        return prev.filter((i) => i.product.id !== productId);
      }
      return prev.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(99, nextQuantity) }
          : i
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    totalAmount,
  };
}
