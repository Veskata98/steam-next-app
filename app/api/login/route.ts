import { NextResponse } from 'next/server';

import logInSteam from '@/app/api/login/logInSteam';

export async function GET() {
    const cookies = await logInSteam();

    const response = NextResponse.json('Logged In');

    cookies.forEach((c) => response.cookies.set({ name: c.name, value: c.value, maxAge: 43200 }));

    return response;
}
