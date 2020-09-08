export interface Mva {
    group: string;
    basePrice: number;
    dateTime: Date;
}

export interface MvaWithTotalPrice extends Mva {
    totalPrice: number;
}