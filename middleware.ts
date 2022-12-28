import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import locales from './locales';

const localesAllowed = locales.filter((locale) => locale !== 'default');

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookieLang = request.cookies.get('lang');
    if (request.nextUrl.locale === 'default') {
        if (cookieLang && localesAllowed.includes(cookieLang.value)) {
            return NextResponse.rewrite(new URL(`/${cookieLang.value}${request.nextUrl.pathname}`, request.url));
        }
        // rewrite to en by default
        return NextResponse.rewrite(new URL(`/en${request.nextUrl.pathname}`, request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/gssp', '/gsp', '/gsp/:path*'],
}