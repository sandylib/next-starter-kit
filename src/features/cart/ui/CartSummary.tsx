'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/core/constants';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onClearCart: () => void;
}

export function CartSummary({ totalItems, totalPrice, onClearCart }: CartSummaryProps) {
  const t = useTranslations('cart');

  const handleCheckout = () => {
    toast.success('Checkout is not implemented in this demo.');
  };

  return (
    <div className="space-y-4">
      <Separator />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {t('subtotal')} ({totalItems} {totalItems === 1 ? t('item') : t('items')})
        </span>
        <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
      </div>
      <Button className="w-full" onClick={handleCheckout}>
        {t('checkout')}
      </Button>
      <Button variant="outline" className="w-full" onClick={onClearCart}>
        {t('clearCart')}
      </Button>
    </div>
  );
}
