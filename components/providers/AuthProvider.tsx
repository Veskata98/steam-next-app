'use client';

import { createContext, useEffect, useState } from 'react';

type TAuthContext = {
    isLoggedIn: boolean;
    successLogin: () => void;
};

export const AuthContext = createContext<TAuthContext>({ isLoggedIn: false, successLogin: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const cookies = document.cookie;

        if (cookies.length) {
            setIsLoggedIn(true);
        }
    }, []);

    const successLogin = async () => {
        setIsLoggedIn(true);
        console.log('Successful Login');
    };

    return <AuthContext.Provider value={{ isLoggedIn, successLogin }}>{children}</AuthContext.Provider>;
};
