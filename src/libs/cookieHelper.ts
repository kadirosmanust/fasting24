import cookies from 'js-cookie';

export function getExpireDate(dateCount = 3) {
  return 60 * 60 * 24 * dateCount;
}

export function remove(cookieName: string) {
  cookies.remove(cookieName);
}

export function get(cookieName: string) {
  return cookies.get(cookieName);
}

export function set(name: string, value: string, options?: object) {
  cookies.set(name, value, {
    path: '/',
    expires: getExpireDate(),
    ...options,
  });
}
