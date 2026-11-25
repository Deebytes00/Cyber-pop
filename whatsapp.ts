import { PopcornProduct, SITE_CONFIG } from '../config/siteConfig';

export interface CartItem {
  product: PopcornProduct;
  quantity: number;
}

export function formatNaira(amount: number): string {
  const formatted = new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${SITE_CONFIG.brand.currencySymbol}${formatted}`;
}

export function sanitizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 11) {
    return `234${digits.slice(1)}`;
  }
  return digits;
}

export function buildOrderMessage(items: CartItem[]): string {
  const lines = items.map((item, idx) => {
    const unitLabel = item.quantity === 1 ? 'pack' : 'packs';
    const lineTotal = formatNaira(item.product.price * item.quantity);
    return `${idx + 1}. ${item.product.name} — ${item.quantity} ${unitLabel} — ${lineTotal}`;
  });

  const grandTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return [
    'Hello Cyber Pop! 🍿',
    'I would like to place an order.',
    '',
    'MY ORDER:',
    ...lines,
    '',
    `TOTAL: ${formatNaira(grandTotal)}`,
  ].join('\n');
}

export function buildCartWhatsAppUrl(items: CartItem[]): string {
  const phone = sanitizeWhatsAppNumber(SITE_CONFIG.contact.whatsappNumber);
  const message = buildOrderMessage(items);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildDirectChatWhatsAppUrl(): string {
  const phone = sanitizeWhatsAppNumber(SITE_CONFIG.contact.whatsappNumber);
  const message = 'Hello Cyber Pop! 🍿 I want to order some fresh popcorn.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
