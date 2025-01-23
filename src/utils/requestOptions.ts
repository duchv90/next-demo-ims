import { RequestOptions } from '@/types/api';

const requestOptions = (
  method: string | null,
  token: string = '',
  body: string = '',
): RequestOptions => {
  const headers = new Headers();

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const options: RequestOptions = {
    method: method ? method : 'GET',
    headers: headers,
  };

  if (body && body !== '' && options.method !== 'GET') {
    headers.append('Content-Type', 'application/json');
    options.headers = headers;
    options.body = body;
  }

  return options;
};

export default requestOptions;
