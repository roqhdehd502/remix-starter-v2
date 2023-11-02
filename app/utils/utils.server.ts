import { json } from '@remix-run/node';
import { ValidationError } from 'yup';

// * yup 유효성 검증 유틸
export const validate = async (scheme: any, payload: object) => {
  try {
    await scheme.validate(payload);
    return null;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error);
      return json(
        {
          path: error.path,
          error: error.errors[0],
        },
        400,
      );
    } else {
      console.error(error);
      return json(
        {
          error,
        },
        500,
      );
    }
  }
};

// * fetch response handler
export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return await response.json();
  } else {
    console.error(response);
    throw Error(`HTTP-Error: ${response.status}`);
  }
};
