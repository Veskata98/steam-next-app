'use client';

import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import axios from 'axios';

import { ItemRow } from '@/components/items/ItemRow';
import { Button } from '../ui/button';
import { Pause, Power } from 'lucide-react';

const ItemsTable = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [startGettingData, setStartGettingData] = useState(false);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get('/api/server');
                setItems(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        const intervalId =
            isLoggedIn && startGettingData
                ? setInterval(() => {
                      fetchData();
                  }, 10000)
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
        return (
            <p
                className="bg-neutral-700 rounded-md mx-auto p-6 
                w-full text-center text-lg mt-2"
            >
                Loading...
            </p>
        );
    }

    const runCrawler = () => {
        setStartGettingData((oldState) => !oldState);
    };

    return (
        <div>
            <div className="flex justify-center">
                <Button
                    onClick={runCrawler}
                    className="border-none outline-none bg-orange-400 text-lg 
                        rounded-full w-14 h-14 hover:bg-orange-400/90 text-white"
                >
                    {startGettingData ? <Pause /> : <Power />}
                </Button>
            </div>
            <div className="bg-neutral-700 rounded-md p-4 flex flex-col gap-4 mt-2 pb-8">
                {items.map((item) => (
                    <ItemRow key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ItemsTable;
