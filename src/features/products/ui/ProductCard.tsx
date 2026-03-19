'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductImageUrl } from '@/core/config';
import { formatPrice } from '@/core/constants';
import type { Product } from '@/domains/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const t = useTranslations('products');
  const inStock = product.stock > 0;

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={getProductImageUrl(product.id)}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex-1 p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground leading-tight">{product.name}</h3>
          <Badge variant={inStock ? 'secondary' : 'destructive'} className="shrink-0 text-xs">
            {inStock ? t('inStock') : t('outOfStock')}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={!inStock}
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="h-4 w-4" />
          {t('addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
}
