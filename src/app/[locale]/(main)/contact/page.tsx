import { useTranslations } from 'next-intl';
import { ContactForm } from '@/features/contact';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <ContactForm />
    </>
  );
}
