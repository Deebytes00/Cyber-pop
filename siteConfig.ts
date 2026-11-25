export interface PopcornProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountText?: string;
  image: string;
  imageAlt: string;
  imageCount?: 1 | 2;
  label: string;
  available: boolean;
}

export const POPCORN_IMAGE =
  '/assets/aistudio/file_00000000d43481f4b3de523c7ea91f02_7f3de6ba.png';

export const SITE_CONFIG = {
  brand: {
    name: 'CYBER POP',
    slogan: 'Crunch Mode: Activated.',
    currencySymbol: '₦',
    heroImage: POPCORN_IMAGE,
    heroImageAlt: 'Close-up of freshly popped golden Cyber Pop popcorn',
  },
  contact: {
    whatsappNumber: '2348147331150',
  },
  products: [
    {
      id: 'classic-pack',
      name: 'Classic Pack',
      description: 'Fresh, light and crunchy. Your everyday campus snack.',
      price: 800,
      image: POPCORN_IMAGE,
      imageAlt: 'Classic Pack Cyber Pop popcorn',
      imageCount: 1,
      label: 'NORMAL PRICE',
      available: true,
    },
    {
      id: 'made-with-love',
      name: 'Made With Love',
      description: 'Made with love. Extra rich, golden and impossible to resist.',
      price: 1000,
      image: POPCORN_IMAGE,
      imageAlt: 'Made With Love Cyber Pop popcorn',
      imageCount: 1,
      label: 'BEST SELLER',
      available: true,
    },
    {
      id: 'two-in-one-classic',
      name: '2-in-1 Crunch Duo',
      description: 'Two classic packs together at a sweet campus discount.',
      price: 1500,
      originalPrice: 1600,
      discountText: 'Save ₦100',
      image: POPCORN_IMAGE,
      imageAlt: '2-in-1 Crunch Duo Cyber Pop popcorn',
      imageCount: 2,
      label: '2-IN-1 DISCOUNT',
      available: true,
    },
    {
      id: 'two-in-one-love',
      name: '2-in-1 Special Duo',
      description: 'Double the popcorn for study nights, hangouts or sharing.',
      price: 2000,
      image: POPCORN_IMAGE,
      imageAlt: '2-in-1 Special Duo Cyber Pop popcorn',
      imageCount: 2,
      label: '2-IN-1 SPECIAL',
      available: true,
    },
  ] as PopcornProduct[],
};
