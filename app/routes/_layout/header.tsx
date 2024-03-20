import { THEME } from '~/common/constants';
import { HamburgerLight, ThemeLightDark } from '~/components/icons';
import { useTheme } from '~/hooks/use-theme';

export default function Header() {
  const [theme, setTheme] = useTheme();

  return (
    <header data-container>
      <div>
        <div className="flex justify-start align-middle gap-3">
          <button>Logo</button>
          <HamburgerLight className="w-7" />
        </div>
        <div className="flex grow justify-center">
          <input
            className="border border-gray-300 rounded-md p-2 w-fit"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="flex justify-end align-middle gap-3">
          <button>Sign In</button>
          <ThemeLightDark
            className="w-7 cursor-pointer"
            onClick={() => setTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK)}
          />
        </div>
      </div>
    </header>
  );
}
