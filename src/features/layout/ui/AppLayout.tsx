'use client';

import { useState } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import {
  Home,
  Mail,
  Package,
  ShoppingCart,
  Sun,
  Moon,
  Monitor,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartSheet, useCartStore } from '@/features/cart';
import { cn } from '@/lib/utils';

const THEME_ICON: Record<string, React.ElementType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const THEME_CYCLE: Record<string, 'light' | 'dark' | 'system'> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  route: string;
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();
  const { theme = 'system', setTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const totalItems = useCartStore((s) => s.getTotalItems());
  const openCart = useCartStore((s) => s.openCart);

  const navItems: NavItem[] = [
    { id: 'home', label: t('home'), icon: Home, route: '' },
    { id: 'products', label: t('products'), icon: Package, route: '/products' },
    { id: 'contact', label: t('contact'), icon: Mail, route: '/contact' },
  ];

  const activeId = (() => {
    if (pathname.includes('/products')) return 'products';
    if (pathname.includes('/contact')) return 'contact';
    return 'home';
  })();

  const ThemeIcon = THEME_ICON[theme] ?? Monitor;

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={cn(
          'flex flex-col border-r bg-card transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-14' : 'w-64',
        )}
      >
        <div className="flex items-center gap-1 p-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setTheme(THEME_CYCLE[theme])}
            aria-label={`Theme: ${theme}`}
          >
            <ThemeIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 relative"
            onClick={openCart}
            aria-label="Open cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center">
                {totalItems}
              </Badge>
            )}
          </Button>
          {!isCollapsed && (
            <span className="ml-auto text-sm font-semibold text-foreground truncate">
              {t('appName')}
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeId;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  isCollapsed && 'justify-center px-0',
                )}
                onClick={() => router.push(`/${locale}${item.route}`)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>

      <CartSheet />
    </div>
  );
}
