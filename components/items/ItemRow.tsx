import Link from 'next/link';

type ItemProps = {
    item: Item;
};

export const ItemRow = ({ item }: ItemProps) => {
    return (
        <Link
            href={item.link}
            target="_blank"
            className="w-full h-full p-4 border-b border-neutral-800/60 hover:opacity-70"
        >
            <div className="flex justify-between px-6">
                <p>{item.name}</p>
                <p>{item.price} €</p>
            </div>
        </Link>
    );
};
