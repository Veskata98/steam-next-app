import * as fs from 'fs/promises';

type RawCookies = {
    name: string;
    value: string;
}[];

export const getCookie = async () => {
    const cookie = await fs.readFile('./cookie.json', { encoding: 'utf-8' });
    return cookie;
};

export const setCookie = async (cookies: RawCookies) => {
    let finalCookie = cookies.map((x) => `${x.name}=${x.value}`).join('; ');
    await fs.writeFile('./cookie.json', JSON.stringify(finalCookie));
};
