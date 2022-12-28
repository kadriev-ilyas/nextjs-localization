import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'react-i18next';

import locales from '../locales';

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

const localesAllowed = locales.filter((locale) => locale !== 'default');
const localesPathesAllowed = localesAllowed.map(locale => `/${locale}/`);

const MyApp = ({ Component, pageProps }) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const locale = getCookie('lang');
        if (locale && localesAllowed.includes(locale)) {
            const { i18n } = useTranslation();
            const pathname = new URL(window.location.href).pathname;
            const isLocalizedPath = localesPathesAllowed.some((localePath) => pathname.startsWith(localePath) || pathname === localePath.slice(0, 3));

            if (!isLocalizedPath && i18n && i18n.language !== locale && i18n.changeLanguage && typeof i18n.changeLanguage === 'function') {
                console.log('DEBUG', 'change language from', i18n?.language, 'to', locale, window.location.href, pathname);
                i18n.changeLanguage(locale);
            }
            console.log('DEBUG', 'render with', i18n?.language, 'selected', locale);
        }
    }

    return (<Component {...pageProps} />);
};

export default appWithTranslation(MyApp);
