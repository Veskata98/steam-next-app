type Wear = 'FN' | 'MW' | 'FT' | 'WW' | 'BS';

type Item = {
    id: string;
    name: string;
    price: number;
    link: string;
    icon?: string;
    wear: Wear;
};
