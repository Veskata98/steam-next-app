'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

import { ItemRow } from './ItemRow';

const ItemsTable = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/server').then((res) => setItems(res.data));
        setLoading(false);
    }, []);

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
        <div className="bg-neutral-700 rounded-md p-4 flex flex-col gap-4 mt-2">
            {items.map((item) => (
                <ItemRow key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemsTable;
