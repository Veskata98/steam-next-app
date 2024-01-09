'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

import axios from 'axios';

import { Pause, Power } from 'lucide-react';

import { ItemRow } from '@/components/items/ItemRow';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/Loading';
import { cn } from '@/lib/utils';

const ItemTable = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [startGettingData, setStartGettingData] = useState(false);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            axios
                .get('/api/server')
                .then((res) => {
                    if (res.data.length) {
                        setItems(res.data);
                    }
                })
                .catch((e) => console.log(e))
                .finally(() => setLoading(false));
        };

        const intervalId =
            isLoggedIn && startGettingData
                ? setInterval(() => {
                      fetchData();
                  }, 5000)
                : null;

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isLoggedIn, startGettingData]);

    if (!isLoggedIn) {
        return (
            <p
                className="bg-neutral-700 rounded-md mx-auto p-6 
        w-full text-center text-md mt-2 uppercase font-bold"
            >
                Login to use this feature
            </p>
        );
    }

    if (loading) {
        return <Loading />;
    }

    const runCrawler = () => {
        setStartGettingData((oldState) => !oldState);
    };

    return (
        <div>
            <div className="flex justify-center">
                <Button
                    onClick={runCrawler}
                    className="border-none outline-none bg-orange-400 text-lg absolute top-6
                        rounded-full w-14 h-14 hover:bg-orange-400/90 text-white"
                >
                    {startGettingData ? <Pause /> : <Power />}
                </Button>
            </div>
            <div
                className={cn('bg-neutral-700 rounded-md p-4 flex flex-col gap-4 mt-2', !items.length ? 'hidden' : '')}
            >
                {items.map((item) => (
                    <ItemRow key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ItemTable;
