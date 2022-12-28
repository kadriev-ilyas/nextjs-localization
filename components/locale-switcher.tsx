import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function LocaleSwitcher() {
  const { locales } = useRouter();
  const { i18n } = useTranslation();

  return (
    <div>
      <p>Locale switcher:</p>
      <select defaultValue={i18n.language} onChange={(event) => {
        const locale = event.target.value;
        if (document && i18n) {
          // document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
          document.cookie = `lang=${locale};SameSite=None;path=/;max-age=31536000`;
          i18n.changeLanguage(locale);
        }
      }}>
        {(locales || []).filter((locale) => locale !== 'default').map((locale) => {
          return (<option value={locale} key={locale}>{locale}</option>);
        })}
      </select>
    </div>
  );
}
