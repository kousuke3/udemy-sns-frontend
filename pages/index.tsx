import Head from 'next/head';
import Timeline from '@/components/Timeline';

export default function Home() {
  return (
    <>
      <Head>
        <title>SNS Clone</title>
        <meta name="description" content="SNSクローンアプリケーション" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Timeline />
      </div>
    </>
  );
}
