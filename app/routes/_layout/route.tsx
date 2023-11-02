import { Outlet, useLoaderData } from '@remix-run/react';
import { RecoilRoot } from 'recoil';

import { templateState } from '~/recoil/atoms';

import Footer from './footer';
import Header from './header';
import type { loader } from './server';

export { loader } from './server';

export default function Default() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(templateState, data);
      }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </RecoilRoot>
  );
}
