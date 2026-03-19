'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/core/constants';
import type { CartItem } from '@/domains/cart';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  return (
    <div className="flex gap-3 py-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex justify-between gap-2">
          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
          <p className="text-sm font-medium text-foreground shrink-0">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 ml-auto text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.productId)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
