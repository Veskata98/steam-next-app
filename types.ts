type Wear = 'FN' | 'MW' | 'FT' | 'WW' | 'BS';

type Sticker = {
    name: string;
    link: string;
};

type Item = {
    id: string;
    name: string;
    price: number;
    link: string;
    icon?: string;
    wear: Wear;
    haveNametag?: boolean;
    stickers?: Sticker[];
};
