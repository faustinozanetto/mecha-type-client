/**
 * Deletes all existing cookies in the browser
 */
export const deleteAllCookies = (): void => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const equalPos = cookie.indexOf('=');
    const name = equalPos > -1 ? cookie.substr(0, equalPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};
