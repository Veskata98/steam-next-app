import logInSteam from '@/lib/login';
import { NextResponse } from 'next/server';

export async function GET() {
    await logInSteam();
    return NextResponse.json('Logged In');
}
