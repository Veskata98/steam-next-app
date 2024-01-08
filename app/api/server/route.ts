import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
    const obj = [
        { id: '123', name: 'Ak-47', price: '45', link: '/' },
        { id: '124', name: 'Ak-47', price: '45', link: '/' },
        { id: '125', name: 'Ak-47', price: '45', link: '/' },
    ];

    return NextResponse.json(obj);
}
