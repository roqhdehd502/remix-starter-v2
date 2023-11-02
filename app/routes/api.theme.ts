import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { isTheme } from '~/hooks/use-theme';
import { getThemeSession } from '~/services/theme.server';

export const loader: LoaderFunction = () => redirect('/', { status: 404 });

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');

  if (!isTheme(theme)) {
    return json(
      {
        message: `theme value of ${theme} is not a valid theme.`,
      },
      400,
    );
  }

  themeSession.setTheme(theme);

  return json(true, { headers: { 'Set-Cookie': await themeSession.commit() } });
};
