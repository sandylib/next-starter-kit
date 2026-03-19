import type { Product } from '../types/products.types';
import { MOCK_PRODUCTS } from '../data/products.data';

const SIMULATED_DELAY_MS = 300;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch all products.
 * In production, swap this for a real HTTP call:
 *   return httpClient.get<Product[]>('/products');
 */
export async function fetchAll(): Promise<Product[]> {
  await delay(SIMULATED_DELAY_MS);
  return [...MOCK_PRODUCTS];
}

/**
 * Fetch a single product by ID.
 * In production, swap this for a real HTTP call:
 *   return httpClient.get<Product>(`/products/${id}`);
 */
export async function fetchById(id: string): Promise<Product | undefined> {
  await delay(SIMULATED_DELAY_MS);
  return MOCK_PRODUCTS.find((p) => p.id === id);
}
