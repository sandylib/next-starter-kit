'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/domains/products';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

export function ProductList({ onAddToCart }: ProductListProps) {
  const t = useTranslations('products');
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-12">{t('loading')}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
