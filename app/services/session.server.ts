import { createCookieSessionStorage, redirect } from '@remix-run/node';

const ADDRESS_SESSION_KEY = 'address';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET ?? ''],
    secure: process.env.NODE_ENV === 'production',
  },
});

const getSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');

  return sessionStorage.getSession(cookie);
};

export const getAccountAddress = async (request: Request): Promise<string | undefined> => {
  const session = await getSession(request);

  return session.get(ADDRESS_SESSION_KEY);
};

export const signIn = async ({ request, address }: { request: Request; address: string }) => {
  const session = await getSession(request);

  session.set(ADDRESS_SESSION_KEY, address);

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 1, // 1일
      }),
    },
  });
};

export const signOut = async (request: Request) => {
  const session = await getSession(request);

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};
