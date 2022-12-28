import { useTranslation } from 'next-i18next';

export default function TranslationsBlock() {
    const { t } = useTranslation();

    return (<div>
        <span>{t('test.testPhraseOne')}</span>
        <br />
        <span>{t('test.testPhraseTwo')}</span>
        <br />
        <span>{t('test.testPhraseThree')}</span>
    </div>);
};
