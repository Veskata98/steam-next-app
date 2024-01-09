import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';

import * as SteamTotp from 'steam-totp';

import pause from '@/lib/pause';
import { setCookie } from '@/lib/cookie';

const logInSteam = async () => {
    await fs.writeFile('./data/items.json', []);

    while (true) {
        try {
            const code = SteamTotp.generateAuthCode(process.env.SECRET_KEY as string);

            const browser = await puppeteer.launch({ headless: 'new', args: ['--lang=en'] });
            const page = await browser.newPage();

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

            await browser.close();
            return cookies;
        } catch (error) {
            console.log(error);
            console.log('Will try to log in again!');
            await pause(10);
        }
    }
};

export default logInSteam;
