'use client';

import { createContext, useState } from 'react';

interface IAuthContext {
    isLoggedIn: boolean;
    successLogin: () => void;
}

export const AuthContext = createContext<IAuthContext>({ isLoggedIn: false, successLogin: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const successLogin = async () => {
        setIsLoggedIn(true);
    };

    return <AuthContext.Provider value={{ isLoggedIn, successLogin }}>{children}</AuthContext.Provider>;
};
