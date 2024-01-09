const wear = {
    'Factory New': 'FN',
    'Minimal Wear': 'MW',
    'Field-Tested': 'FT',
    'Well-Worn': 'WW',
    'Battle-Scarred': 'BS',
};

export const replaceWear = (itemName: string) => {
    const itemNameWithoutWear = itemName.slice(0, itemName.indexOf('('));
    const itemWearFullText = itemName.split('(')[1].slice(0, -1) as keyof typeof wear;
    const itemWear = wear[itemWearFullText];
    return itemNameWithoutWear + ' ' + itemWear;
};

export const getWear = (itemName: string): Wear => {
    const itemWearFullText = itemName.split('(')[1].slice(0, -1) as keyof typeof wear;
    return wear[itemWearFullText] as Wear;
};

export const wearColor = {
    FN: 'text-green-500',
    MW: 'text-green-400',
    FT: 'text-yellow-500',
    WW: 'text-orange-500',
    BS: 'text-red-500',
};
