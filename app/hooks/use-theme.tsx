import { useFetcher } from '@remix-run/react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  createContext, useContext, useEffect, useRef, useState,
} from 'react';

import { THEME } from '~/common/constants';

type ThemeContextType = [THEME | null, Dispatch<SetStateAction<THEME | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const prefersDarkMQ = '(prefers-color-scheme: dark)';

const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? THEME.DARK : THEME.LIGHT;

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    console.warn('theme is not applied');
  } else {
    cl.add(theme);
  }
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn('meta is not applied');
  }
})();
`;

function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
  const [theme] = useTheme();

  return (
    <>
      <meta
        name="color-scheme"
        content={theme === 'light' ? 'light dark' : 'dark light'}
      />
      {ssrTheme ? null : <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />}
    </>
  );
}

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: ReactNode;
  specifiedTheme: THEME | null;
}) {
  const [theme, setTheme] = useState<THEME | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme;
      } else {
        return null;
      }
    }

    if (typeof window !== 'object') {
      return null;
    }

    return getPreferredTheme();
  });

  const persistTheme = useFetcher();

  // TODO: remove this when persistTheme is memoized properly
  const persistThemeRef = useRef(persistTheme);

  useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;

      return;
    }

    if (!theme) {
      return;
    }

    persistThemeRef.current.submit({ theme }, { action: 'api/theme', method: 'post' });
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ);

    const handleChange = () => {
      setTheme(mediaQuery.matches ? THEME.DARK : THEME.LIGHT);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

const themes: Array<THEME> = Object.values(THEME);

function isTheme(value: unknown): value is THEME {
  return typeof value === 'string' && themes.includes(value as THEME);
}

export {
  isTheme, NonFlashOfWrongThemeEls, ThemeProvider, useTheme,
};
