'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ProductList } from '@/features/products';
import { useCartStore } from '@/features/cart';
import { getProductImageUrl } from '@/core/config';
import type { Product } from '@/domains/products';

export default function ProductsPage() {
  const t = useTranslations('products');
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: getProductImageUrl(product.id),
    });
    openCart();
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <ProductList onAddToCart={handleAddToCart} />
    </>
  );
}
