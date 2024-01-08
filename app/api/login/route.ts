import logInSteam from '@/lib/login';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookies = await logInSteam();

    const response = NextResponse.json('Logged In');

    cookies.forEach((c) => response.cookies.set({ name: c.name, value: c.value, maxAge: 43200 }));

    return response;
}
