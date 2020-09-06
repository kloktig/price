
export class Mva {
    private readonly rateGroup: RateGroup;
    private readonly basePrice: number;

    constructor(rateGroup: RateGroup, basePrice: number) {
        this.rateGroup = rateGroup;
        this.basePrice = basePrice;
    }

    public getFullPrice() {
        return this.getPrice() * this.basePrice
    }

    private getPrice(): number {
        switch (this.rateGroup) {
            case RateGroup.Normal:
                return 1.25
            case RateGroup.Foods:
                return 1.15
            case RateGroup.Low:
                return 1.12
        }
    }
}

export enum RateGroup {
    Normal = "normal", //  = 25
    Foods = "foods", // = 15
    Low = "low" // = 12
}
