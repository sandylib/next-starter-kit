'use client';

import { ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCartStore } from '../stores/cartStore';
import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';

export function CartSheet() {
  const t = useTranslations('cart');
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{t('title')}</SheetTitle>
          <SheetDescription>
            {totalItems > 0
              ? `${totalItems} ${totalItems === 1 ? t('item') : t('items')}`
              : t('empty')}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="font-medium text-foreground">{t('empty')}</p>
              <p className="text-sm text-muted-foreground">{t('emptyDescription')}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6 divide-y">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <CartSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              onClearCart={clearCart}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
