import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('home');

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          {t('gettingStarted')}
        </h2>
        <ul className="space-y-3 text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">1.</span>
            {t('steps.explore')}
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">2.</span>
            {t('steps.features')}
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">3.</span>
            {t('steps.build')}
          </li>
        </ul>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {t('resources')}
        </h2>
        <div className="flex flex-col gap-2">
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            {t('links.nextjs')}
          </Link>
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            {t('links.shadcn')}
          </Link>
          <Link
            href="https://next-intl.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            {t('links.nextIntl')}
          </Link>
        </div>
      </div>
    </>
  );
}
