import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const STEAM_RECENT_ITEMS_URL = 'https://steamcommunity.com/market/recent?country=BG&language=english&currency=3';

export function GET(req: NextRequest) {
    const obj = [
        { id: '123', name: 'Ak-47', price: '45', link: '/' },
        { id: '124', name: 'Ak-47', price: '45', link: '/' },
        { id: '125', name: 'Ak-47', price: '45', link: '/' },
    ];

    const res = axios.get(STEAM_RECENT_ITEMS_URL);

    return NextResponse.json(obj);
}
