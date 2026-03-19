'use client';

import { useState, useEffect } from 'react';
import { productsApi, type Product } from '@/domains/products';

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    productsApi.fetchAll().then((data) => {
      if (!cancelled) {
        setProducts(data);
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, isLoading };
}
