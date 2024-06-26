import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

import Template from '~/components/template';
import { templateState } from '~/recoil/atoms';

export { meta } from './server';

export default function Index() {
  const { t, i18n } = useTranslation();
  const templateValue = useRecoilValue(templateState);

  return (
    <section className="p-4 text-center">
      <h1 className="text-6xl">{templateValue}</h1>
      <div className="mt-4">
        <h1 className="text-3xl font-bold underline">{i18n.language}</h1>
        <p>{t('hello')}</p>
        <button
          className="info"
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ko' : 'en')}
        >
          {t('localeChange')}
        </button>
      </div>
      <Template
        title={t('button')}
        name={t('button')}
      />
    </section>
  );
}
