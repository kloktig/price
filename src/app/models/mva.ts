export interface Mva {
    group: string;
    basePrice: number;
}

export interface MvaWithTotalPrice extends Mva{
    totalPrice: number
}

export function getFullPrice(mva: Mva): MvaWithTotalPrice {
    return {
        ...mva,
        totalPrice: getPrice(mva.group) * mva.basePrice
    }
}

function getPrice(rateGroup: string): number {
    const num = mvaTypes.get(rateGroup)
    if (num != undefined)
        return num
    else
        throw new Error(`rateGroupe: ${rateGroup} is not valid. `)
}

export function getMvaTypesAndRates() : Array<string> {
    return Array.from(mvaTypes.keys())
}

/**
 * Refer to https://www.skatteetaten.no/satser/merverdiavgift/
 */
const mvaTypes: Map<string, number> = new Map([
    ["normal", 1.25],
    ["foods", 1.15],
    ["low", 1.12]
]);
