import Link from 'next/link';

export default function LinksBlock() {
    return (<>
        <Link href="/" locale={false}>To index page</Link>
        <br />

        <Link href="/gsp" locale={false}>To getStaticProps page</Link>
        <br />

        <Link href="/gsp/first" locale={false}>To dynamic getStaticProps page</Link>
        <br />

        <Link href="/gssp" locale={false}>To getServerSideProps page</Link>
    </>);
}
