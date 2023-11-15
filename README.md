# Remix Starter V2

기존 [remix-starter](https://github.com/crispy43/remix-starter/tree/main)의 v2 버전입니다.  
다크&라이트 테마, postcss와 SCSS, tailwind, i18next, remix-development-tools, recoil, eslint, husky, remix-validated-form과 yup이 적용되어 있는 remix starter 탬플릿입니다.

## 추가 업데이트 내역

### WebSocket connection to 'ws://localhost:8080/socket' failed: (2023-11-15 작성)

StreamingSSR 관련 문제로 [WebSocket 연결이 끊어지는 현상](https://github.com/remix-run/remix/issues/7663)이 있었습니다.

따라서, remix.config.js 파일에서 다음과 같은 설정을 추가했습니다.

```js
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ...

  dev: {
    port: 8080,
  },
};
```

이는 개발(dev) 환경에서만 port를 지정했으므로, 테스트 및 배포 환경에서는 추가 설정이 필요합니다.

## 변경사항 (V1 -> V2)

기존 remix-starter에서 변경된 사항은 다음과 같습니다.

### 패키지 버전 (dependencies)

```json
// v1
"dependencies": {
  "@remix-run/css-bundle": "^1.19.1",
  "@remix-run/node": "^1.19.1",
  "@remix-run/react": "^1.19.1",
  "@remix-run/serve": "^1.19.1",
  "@remix-validated-form/with-yup": "^3.0.1",
  "clsx": "^2.0.0",
  "i18next": "^23.4.1",
  "i18next-browser-languagedetector": "^7.1.0",
  "i18next-fs-backend": "^2.1.5",
  "i18next-http-backend": "^2.2.1",
  "isbot": "^3.6.8",
  "react": "^18.3.0-canary-cb3404a0c-20230807",
  "react-dom": "^18.3.0-canary-cb3404a0c-20230807",
  "react-i18next": "^13.0.3",
  "recoil": "^0.7.7",
  "remix-i18next": "^5.3.0",
  "remix-validated-form": "^5.1.0",
  "styled-components": "^6.0.7",
  "yup": "^1.2.0"
}

// v2
"dependencies": {
  "@remix-run/css-bundle": "^2.2.0",
  "@remix-run/node": "^2.2.0",
  "@remix-run/react": "^2.2.0",
  "@remix-run/serve": "^2.2.0",
  "@remix-run/web-fetch": "^4.4.1",
  "clsx": "^2.0.0",
  "i18next": "^23.6.0",
  "i18next-browser-languagedetector": "^7.1.0",
  "i18next-fs-backend": "^2.2.0",
  "i18next-http-backend": "^2.3.1",
  "isbot": "^3.6.8",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-i18next": "^13.3.1",
  "recoil": "^0.7.7",
  "remix-i18next": "^5.4.0",
  "remix-validated-form": "^5.1.5",
  "yup": "^1.3.2"
},

```

### 패키지 버전 (devDependencies)

```json
// v1
"devDependencies": {
  "@remix-run/dev": "^1.19.1",
  "@remix-run/eslint-config": "^1.19.1",
  "@types/react": "^18.0.35",
  "@types/react-dom": "^18.0.11",
  "autoprefixer": "^10.4.14",
  "eslint": "^8.38.0",
  "eslint-plugin-react": "^7.33.2",
  "eslint-plugin-simple-import-sort": "^10.0.0",
  "eslint-plugin-unused-imports": "^3.0.0",
  "husky": "^8.0.3",
  "lint-staged": ">=10",
  "npm-run-all": "^4.1.5",
  "remix-development-tools": "^2.0.0",
  "sass": "^1.64.2",
  "typescript": "^5.0.4"
}

// v2
"devDependencies": {
  "@remix-run/dev": "^2.2.0",
  "@remix-run/eslint-config": "^2.2.0",
  "@types/react": "^18.2.20",
  "@types/react-dom": "^18.2.7",
  "autoprefixer": "^10.4.16",
  "eslint": "^8.38.0",
  "eslint-plugin-react": "^7.33.2",
  "eslint-plugin-simple-import-sort": "^10.0.0",
  "eslint-plugin-unused-imports": "^3.0.0",
  "husky": "^8.0.3",
  "lint-staged": ">=10",
  "npm-run-all": "^4.1.5",
  "remix-development-tools": "^3.4.0",
  "sass": "^1.69.5",
  "tailwindcss": "^3.3.5",
  "typescript": "^5.1.6"
},

```

### 스타일 (Style)

Remix는 [Streaming SSR](https://remix.run/docs/en/main/styling/css-in-js)의 특성상 성능에 부정적인 영향을 주는 [CSS-in-JS의 접근방식](https://careerly.co.kr/comments/71365)을 권장하지 않습니다.  
따라서, V2에서는 기존 Styled-components 라이브러리 대신 자체적인 CSS 코드를 구현하게끔 설정을 변경했습니다.  
또한, 시범적으로 [Tailwind CSS](https://tailwindcss.com/docs/installation)를 도입하여 보다 생산적인 스타일을 구현 할 수 있도록 기능을 추가했습니다.

```tsx
// v1
import styled from 'styled-components';

export default function Template() {
  return <Wrapper>template</Wrapper>;
}

const Wrapper = styled.div``;

// v2
/** scss 파일에 선언 후 참조 */

export default function Template() {
  return <div className="wrapper">template</div>;
}
```

## 설치

2023년 09월 11일, [Node 16버전](https://nodejs.org/en/blog/announcements/nodejs16-eol)의 지원이 중단(End-of-Life) 되었습니다.  
따라서, 로컬에 기본적으로 18버전 이상의 node.js가 설치되어 있어야합니다.
패키지 매니저로는 최신 버전의 yarn 사용을 권장합니다.

yarn이 없는 경우 아래 커맨드로 전역 패키지로 설치

```bash
npm i -g yarn
```

패키지 설치하기

```bash
yarn
```

환경 변수를 설정합니다. 아래 커맨드로 .env.example을 복사하여 .env 파일을 복사하여 만들어 줍니다.

```bash
cp .env.example .env
```

.env를 개발 환경에 맞게 수정해줍니다.

## 실행 및 배포

### 개발 환경 실행

```bash
yarn dev
```

### 배포 전 빌드

```bash
yarn build
```

### 배포 앱 실행

참고: 배포(production) 환경에서 .env 파일의 환경 변수는 더 이상 불러오지 않으므로 환경 변수를 직접 생성해주어야 합니다.

```bash
yarn start
```

## 구조

```
├── app                             | app 디렉토리
│   ├── common                      | 공통 모듈 디렉토리
│   │   ├── constants.ts            | 전역 상수
│   │   └── global.d.ts             | 전역 타입
│   ├── components                  | 컴포넌트 디렉토리
│   ├── entry.client.tsx            | 클라이언트 랜더링 모듈
│   ├── entry.server.tsx            | 서버 랜더링 모듈
│   ├── hooks                       | 커스텀 훅
│   ├── localization                | [react-i18next](https://react.i18next.com/) 다국어 모듈
│   ├── recoil                      | [recoil](https://recoiljs.org/ko/) 전역 상태관리
│   ├── root.tsx                    | 앱 루트 컴포넌트
│   ├── routes                      | 페이지별 라우트 컴포넌트
│   ├── services                    | 서버사이드 전용 서비스 로직
│   └── styles                      | SCSS로 작성된 스타일은 자동 컴파일되어 이 곳에 CSS파일로 생성 됨
├── public                          | public 디렉토리
│   ├── build                       | 빌드된 파일은 이곳에 생성 됨
│   ├── favicon.ico                 | 파비콘
│   └── locales                     | [react-i18next](https://react.i18next.com/) 다국어 디렉토리
│       ├── en                      | 영어
│       └── ko                      | 한국어
├── styles                          | .[scss](https://sass-lang.com/)로 스타일 파일을 이곳에 작성
│   ├── global.scss                 | 글로벌 스타일
│   └── reset.scss                  | CSS 초기화
├── .env.example                    | 환경변수 예제 파일
├── .eslintrc.cjs                   | [eslint](https://eslint.org/) 설정 파일
├── .gitignore                      | git 커밋 무시 설정
├── package.json                    | package.json
├── postcss.config.js               | postcss 설정 파일
├── README.md
├── remix.config.js                 | [remix](https://remix.run/docs/en/1.19.3) 프레임워크 설정 파일
├── remix.env.d.ts
├── tailwind.config.json            | tailwind 설정 파일
├── tsconfig.json                   | 타입스크립트 설정 파일
└── yarn.lock
```

## 가이드

### CSS

CSS는 ./styles 위치에 .scss 파일로 작성하여 추가합니다.

```scss
/* ./styles/styles.scss */
$font-stack: Pretendard Variable, sans-serif;
:root {
  font-family: $font-stack;
}
```

이후 scss 파일은 컴파일되어 ./app/styles/ 경로에 CSS 파일로 저장됩니다. 사용할 때는 이 CSS 파일을 [links](https://remix.run/docs/en/1.19.3/route/links)에 추가합니다.

```tsx
import styles from '~/styles/styles.css';

export const links: LinksFunction = () => [
  /* ... */
  { rel: 'stylesheet', href: styles },
  /* ... */
];
```

#### 다크 및 라이트 테마

다크 및 라이트 테마를 적용하는 경우 전역 CSS에 클래스를 통해 적용합니다.

```scss
/* ./styles/global.scss */
html.light {
  .some-class {
    color: $light-text-color;
  }
}
html.dark {
  .some-class {
    color: $dark-text-color;
  }
}
```

리액트 컴포넌트에서 테마의 확인과 변경은 useTheme 훅을 사용합니다.

```tsx
const [theme, setTheme] = useTheme();
```

### 다국어 현지화(localization)

다국어 언어 모델을 적용하는 경우는 ./public/locales 아래에 언어별로 json 파일로 각 텍스트를 설정합니다.
common은 기본적인 네임스페이스가 되고 json 파일의 명칭에 따라 네임스페이스가 부여됩니다.

컴포넌트에서의 적용은 아래처럼 사용합니다.

```tsx
const Component = () => {
  const { t } = useTranslation('namespace' /* 네임스페이스 없을 경우 common 기본 */);

  return <p>{t('title')}</p>;
};
```

자세한 사용법은 [react-i18next](https://react.i18next.com/) 문서를 참고하세요.
