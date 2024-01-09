import { SetStateAction } from 'react';
import { useAuth } from '@/hooks/useAuth';

import axios from 'axios';

import { LogIn as LoginIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const LoginButton = ({ setLoading }: { setLoading: (value: SetStateAction<boolean>) => void }) => {
    const { successLogin } = useAuth();

    const handleLogin = () => {
        setLoading(true);

        axios
            .get('/api/login')
            .then(successLogin)
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    };

    return (
        <Button
            onClick={handleLogin}
            className="border-none outline-none bg-orange-400 text-lg 
            rounded-full w-14 h-14 hover:bg-orange-400/90 text-white"
        >
            <LoginIcon />
        </Button>
    );
};
