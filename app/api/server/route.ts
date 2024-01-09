import { NextResponse } from 'next/server';

import * as fs from 'fs/promises';
import axios from 'axios';

import { getCookie } from '@/lib/cookie';
import { getWear } from '@/lib/wear';

const STEAM_RECENT_ITEMS_URL = 'https://steamcommunity.com/market/recent?country=BG&language=english&currency=3';

export async function GET() {
    const result: Item[] = [];
    let newArr: Item[] = [];
    let uniqueArray: Item[] = [];

    const cookie = await getCookie();

    try {
        const oldItems = JSON.parse(await fs.readFile('./data/items.json', { encoding: 'utf-8' }));

        const res = await axios.get(STEAM_RECENT_ITEMS_URL, {
            headers: { Cookie: JSON.parse(cookie) },
        });
        const data = res.data;

        const assets = Object.entries(data.assets['730']['2']) as any;
        const listingInfo = Object.entries(data.listinginfo) as any;

        for (let asset of assets.filter((asset: any) => asset[1].commodity === 0)) {
            const assetId = asset[1].id;
            const itemName: string = asset[1].market_name;
            const inspectLink = asset[1].actions[0].link;

            const itemData = listingInfo.find((x: any) => x[1].asset.id === assetId);
            const itemIcon = `https://community.cloudflare.steamstatic.com/economy/image/${asset[1].icon_url}`;

            const price = Number(itemData[1].converted_price);
            const steam_fee = Number(itemData[1].converted_steam_fee);
            const publisher_fee = Number(itemData[1].converted_publisher_fee);

            const fullPrice = (price + steam_fee + publisher_fee) / 100;

            if (isNaN(fullPrice)) {
                continue;
            }

            const haveNametag = 'fraudwarnings' in asset[1];

            const stickerString = asset[1]?.descriptions[asset[1]?.descriptions.length - 1].value.trim();

            if (!stickerString || !stickerString.length) {
                return NextResponse.json(null);
            }

            const matchStickerNames = stickerString?.match(/<br>Sticker:\s*(.*?)<\/center><\/div>/);
            const stickerNames = matchStickerNames && matchStickerNames[1].trim();

            const stickersLinks = stickerString?.match(/src="(.*?)">/gim);

            const stickerNamesArray = stickerNames.split(', ');
            const stickerLinksArray = stickersLinks.map((s: string) => s.replace('src="', '').replace('">', ''));

            const stickers: Sticker[] = [];

            for (let i = 0; i < stickerNamesArray.length; i++) {
                stickers.push({ name: stickerNamesArray[i], link: stickerLinksArray[i] });
            }

            const marketURL = `https://steamcommunity.com/market/listings/730/${encodeURIComponent(
                itemName
            )}?filter=${encodeURIComponent('"' + stickerNames + '"')}`;

            result.push({
                id: assetId,
                name: itemName,
                price: fullPrice,
                link: marketURL,
                icon: itemIcon,
                wear: getWear(itemName),
                haveNametag,
                stickers,
            });
        }

        newArr = [...result, ...oldItems];

        const jsonObject = newArr.map((item) => JSON.stringify(item));
        const uniqueSet = new Set(jsonObject);
        uniqueArray = Array.from(uniqueSet).map((item) => JSON.parse(item));

        await fs.writeFile('./data/items.json', JSON.stringify(uniqueArray));
    } catch (error) {
        return NextResponse.json(null);
    }

    return NextResponse.json(uniqueArray);
}
