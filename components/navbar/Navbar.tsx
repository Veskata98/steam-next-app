'use client';

import { RefreshCwIcon } from 'lucide-react';
import { Button } from '../ui/button';

export default function Navbar() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <nav className="w-full h-24">
            <div className="h-full flex justify-between items-center">
                <h2 className="text-3xl font-bold">Steam Crawler</h2>
                <Button
                    onClick={handleRefresh}
                    className="border-none outline-none bg-orange-400 text-lg 
                    rounded-full w-14 h-14 hover:bg-orange-400/90
                    hover:rotate-90 transition text-white"
                >
                    <RefreshCwIcon />
                </Button>
            </div>
        </nav>
    );
}
