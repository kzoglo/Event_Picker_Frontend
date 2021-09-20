import { IProps } from '.';
import { DefProps } from './enums';

export const baseUrl = 'http://localhost:3001';

const baseFetch = async ({
  path,
  body,
  contentType = DefProps.CONTENT_TYPE,
  method      = DefProps.METHOD,
  authToken   = DefProps.AUTH_TOKEN,
}: IProps): Promise<Response> => {
  return await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': contentType,
      'Authorization': `Bearer ${authToken}`,
    },
    body,
  });
};

export default baseFetch;
