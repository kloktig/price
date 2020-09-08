import {Mva, MvaWithTotalPrice} from "../models/mva";

export class MvaService {
    public getFullPrice(mva: Mva): MvaWithTotalPrice {
        return {
            ...mva,
            totalPrice: this.getPrice(mva.group) * mva.basePrice
        }
    }

     public isInValidRateGroup(rateGroup: string): boolean {
        return !this.mvaTypes.get(rateGroup)
    }

    private getPrice(rateGroup: string): number {
        const num = this.mvaTypes.get(rateGroup)
        if (num != undefined)
            return num
        else
            throw new Error(`rateGroupe: ${rateGroup} is not valid. `)
    }

    public getMvaTypes(): Array<string> {
        return Array.from(this.mvaTypes.keys())
    }

    /**
     * Refer to https://www.skatteetaten.no/satser/merverdiavgift/
     */
    private mvaTypes = new Map([
        ["normal", 1.25],
        ["foods", 1.15],
        ["low", 1.12]
    ]);
}
