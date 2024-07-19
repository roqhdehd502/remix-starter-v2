import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix Starter V2' },
    {
      property: 'og:title',
      content: 'Remix Starter V2',
    },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};
