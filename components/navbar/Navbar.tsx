'use client';

import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteam } from '@fortawesome/free-brands-svg-icons';

import { LoginButton } from '@/components/LoginButton';

export default function Navbar() {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useAuth();

    return (
        <nav className="w-full h-24">
            {loading && (
                <div className="w-full h-full fixed top-0 left-0 z-20 opacity-50 bg-neutral-500 flex items-center justify-center text-center">
                    <p className="text-3xl">Logging in steam. Please wait...</p>
                </div>
            )}
            <div className="h-full flex justify-between items-center">
                <h2 className="text-3xl font-bold flex gap-3 items-center">
                    <FontAwesomeIcon icon={faSteam} /> Crawler
                </h2>
                <div className="flex gap-2 items-center">
                    {isLoggedIn ? <p className="text-green-500">Logged In</p> : <LoginButton setLoading={setLoading} />}
                </div>
            </div>
        </nav>
    );
}
