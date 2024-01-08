'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

import { ItemRow } from '@/components/items/ItemRow';
import { useAuth } from '@/hooks/useAuth';

const ItemsTable = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        axios.get('/api/server').then((res) => setItems(res.data));
        setLoading(false);
    }, []);

    if (!isLoggedIn) {
        return (
            <p
                className="bg-neutral-700 rounded-md mx-auto p-6 
        w-full text-center text-md mt-2 uppercase"
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

    return (
        <div className="bg-neutral-700 rounded-md p-4 flex flex-col gap-4 mt-2 pb-8">
            {items.map((item) => (
                <ItemRow key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemsTable;
