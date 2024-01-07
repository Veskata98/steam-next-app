'use client';

import { Button } from '../ui/button';

export default function Navbar() {
    return (
        <nav className="flex justify-between w-5/6 mx-auto p-10">
            <h2 className="text-3xl font-bold">Steam Crawler</h2>
            <Button>Refresh</Button>
        </nav>
    );
}
