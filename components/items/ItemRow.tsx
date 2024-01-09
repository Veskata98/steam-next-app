import Image from 'next/image';
import Link from 'next/link';

type ItemProps = {
    item: Item;
};

const wearColor = {
    FN: 'text-green-600',
    MW: 'text-green-400',
    FT: 'text-yellow-500',
    WW: 'text-orange-500',
    BS: 'text-red-500',
};

export const ItemRow = ({ item }: ItemProps) => {
    return (
        <Link
            href={item.link}
            target="_blank"
            className="w-full h-full px-2 border-b border-neutral-800/60 hover:opacity-70"
        >
            <div className="flex justify-between px-6 items-center">
                <div className="flex gap-4 items-center justify-center">
                    {item.icon && <Image alt={item.name} src={item.icon} width={72} height={72} />}
                    <p className={wearColor[item.wear]}>{item.name}</p>
                    {item.haveNametag && <p className="text-red-600 uppercase">Nametag</p>}
                </div>
                <div className="flex items-center">
                    <div className="flex mr-10">
                        {item.stickers?.map((sticker) => (
                            <Image key={sticker.name} alt={sticker.name} src={sticker.link} width={48} height={48} />
                        ))}
                    </div>
                    <p>{item.price} €</p>
                </div>
            </div>
        </Link>
    );
};
