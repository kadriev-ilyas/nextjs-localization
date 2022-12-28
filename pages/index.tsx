import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LocaleSwitcher from '../components/locale-switcher';
import LinksBlock from '../components/links-block';
import TranslationsBlock from '../components/translations-block';

export default function IndexPage() {
  const { locales } = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t('test.title')}</title>
        <meta name="description" content={t('test.description') || ''} />
      </Head>
      <h1>Index page</h1>
      <p>Current locale: {i18n.language}</p>
      <p>Configured locales: {JSON.stringify(locales)}</p>

      <LocaleSwitcher />

      <hr />

      <LinksBlock />

      <hr />

      <TranslationsBlock />
    </div>
  );
}

export const getStaticProps = async ({
  locale,
}: {
  locale: string;
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', undefined, null, ['en', 'fr', 'nl', 'ru'])),
    },
  };
}
