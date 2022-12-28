import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LocaleSwitcher from '../components/locale-switcher';
import LinksBlock from '../components/links-block';
import TranslationsBlock from '../components/translations-block';

type GsspPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function GsspPage(props: GsspPageProps) {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t('test.title')}</title>
        <meta name="description" content={t('test.description') || ''} />
      </Head>
      <h1>getServerSideProps page</h1>
      <p>Current locale: {i18n.language}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <LocaleSwitcher />

      <hr />

      <LinksBlock />

      <hr />

      <TranslationsBlock />
    </div>
  );
}

type Props = {
  locale?: string
  locales?: string[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
  locales,
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', undefined, null, ['en', 'fr', 'nl', 'ru'])),
      locale,
      locales,
    },
  };
}
