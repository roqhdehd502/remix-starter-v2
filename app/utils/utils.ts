// * 세자리 콤마
export const toComma = (value: number | string, maxDecimals: number | undefined = 4) => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  return value.toLocaleString(undefined, { maximumFractionDigits: maxDecimals });
};

// * 첫글자 대문자
export const toUpperCaseOnlyFirst = (value: string) => {
  return value.replace(/^[a-z]/, (char) => char.toUpperCase());
};

// * 첫글자마다 대문자
export const toUpperCaseEachFirst = (value: string) => {
  return value.replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

// * 숫자 타입 확인
export const isNumber = (value?: number) => {
  return typeof value === 'number';
};

// * Object to Query
export const toQuery = (queryObject: { [key: string]: any }) => {
  return Object.keys(queryObject)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(`${queryObject[k]}`))
    .join('&');
};
