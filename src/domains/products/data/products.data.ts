import type { Product } from '../types/products.types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-wireless-headphones',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and comfortable over-ear design.',
    price: 89.99,
    stock: 25,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'prod-mechanical-keyboard',
    name: 'Mechanical Keyboard',
    description: 'Compact 75% mechanical keyboard with hot-swappable switches, RGB backlighting, and USB-C connectivity.',
    price: 129.99,
    stock: 12,
    createdAt: '2025-01-16T10:00:00Z',
    updatedAt: '2025-01-16T10:00:00Z',
  },
  {
    id: 'prod-usb-c-hub',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI 4K output, 100W power delivery, SD card reader, and 3 USB-A ports.',
    price: 49.99,
    stock: 50,
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
  },
  {
    id: 'prod-laptop-stand',
    name: 'Adjustable Laptop Stand',
    description: 'Ergonomic aluminium laptop stand with adjustable height and angle. Supports laptops up to 17 inches.',
    price: 39.99,
    stock: 0,
    createdAt: '2025-02-10T10:00:00Z',
    updatedAt: '2025-02-10T10:00:00Z',
  },
  {
    id: 'prod-webcam-hd',
    name: 'Webcam HD Pro',
    description: '1080p HD webcam with auto-focus, built-in microphone, and adjustable wide-angle lens for video calls.',
    price: 69.99,
    stock: 8,
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-03-01T10:00:00Z',
  },
];
