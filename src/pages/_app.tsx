import { GeistSans } from 'geist/font/sans';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { ChakraBaseProvider } from '@chakra-ui/react';

import { api } from 'pn/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraBaseProvider>
      <SessionProvider session={session}>
        <main className={GeistSans.className}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </ChakraBaseProvider>
  );
};

export default api.withTRPC(MyApp);
