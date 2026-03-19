import { AppLayout } from '@/features/layout';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
