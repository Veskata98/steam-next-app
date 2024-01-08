import type * as puppeteer from 'puppeteer';

import * as SteamTotp from 'steam-totp';

import { setCookie } from '@/lib/cookie.js';
import { pause } from '@/lib/utils.js';

const login = async (page: puppeteer.Page) => {
    while (true) {
        try {
            const code = SteamTotp.generateAuthCode(process.env.SECRET_KEY as string);

            await page.goto('https://store.steampowered.com/login/');
            await page.waitForSelector('button[type="submit"]');

            const usernameField = await page.$('input[type="text"]');
            const passwordField = await page.$('input[type="password"]');

            await usernameField?.type(process.env.STEAM_USERNAME as string);
            await passwordField?.type(process.env.STEAM_PASSWORD as string);

            await page.click('button[type="submit"]');

            await page.waitForSelector('div.newlogindialog_FlexCol_1mhmm > div > input[type="text"]', {
                visible: true,
            });
            await page.focus('div.newlogindialog_FlexCol_1mhmm > div > input[type="text"]');

            await page.keyboard.type(code);

            await page.waitForNavigation();

            const cookies = await page.cookies();
            await setCookie(cookies);

            console.log('Successful login!');
            return;
        } catch (error) {
            console.log(error);
            console.log('Will try to log in again!');
            await pause(10);
        }
    }
};

export default login;
