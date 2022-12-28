import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LocaleSwitcher from '../../components/locale-switcher';
import LinksBlock from '../../components/links-block';
import TranslationsBlock from '../../components/translations-block';

type GspPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function GspPage(props: GspPageProps) {
  const { isFallback, query } = useRouter();
  if (isFallback) {
    return 'Loading...'
  }

  const { t, i18n } = useTranslation();

  return (
    <div>
      <Head>
        <title>{t('test.title')}</title>
        <meta name="description" content={t('test.description') || ''} />
      </Head>
      <h1>getStaticProps page</h1>
      <p>Current slug: {query.slug}</p>
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

export const getStaticProps: GetStaticProps<Props> = async ({
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

export const getStaticPaths: GetStaticPaths = ({ locales = [] }) => {
  const paths = [];

  for (const locale of locales) {
    paths.push({ params: { slug: 'first' }, locale })
    paths.push({ params: { slug: 'second' }, locale })
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
