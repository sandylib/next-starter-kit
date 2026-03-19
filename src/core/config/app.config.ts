export const APP_CONFIG = {
  name: 'Next Starter Kit',
  imageBaseUrl: 'https://picsum.photos/seed',
} as const;

export function getProductImageUrl(productId: string, width = 400, height = 300) {
  return `${APP_CONFIG.imageBaseUrl}/${productId}/${width}/${height}`;
}
