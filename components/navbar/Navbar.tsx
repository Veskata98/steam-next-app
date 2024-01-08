'use client';

import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { LogIn, RefreshCwIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteam } from '@fortawesome/free-brands-svg-icons';

import { Button } from '@/components/ui/button';

export default function Navbar() {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, successLogin } = useAuth();

    const handleLogin = () => {
        setLoading(true);

        fetch('/api/login')
            .then(() => {
                successLogin();
                console.log('Successful login');
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };

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
                    {isLoggedIn ? (
                        <p className="text-green-500">Logged In</p>
                    ) : (
                        <Button
                            onClick={handleLogin}
                            className="border-none outline-none bg-orange-400 text-lg 
                            rounded-full w-14 h-14 hover:bg-orange-400/90 text-white"
                        >
                            <LogIn />
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}
