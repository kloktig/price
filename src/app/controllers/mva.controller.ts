import {Body, Controller, Get, Post, Route, Example} from 'tsoa';
import {getFullPrice, getMvaTypesAndRates, Mva, MvaWithTotalPrice} from "../models/mva";

@Route('mva')
export class MvaController extends Controller {


    @Get("groups")
    public getGroups(): Promise<Array<string>> {
        return Promise.resolve(getMvaTypesAndRates());
    }

    @Post("price")
    @Example<MvaWithTotalPrice>({
        "rateGroup": "normal",
        "basePrice": 2000,
        "totalPrice": 2500
    })
    public PostPrice(@Body() body: Mva): Promise<MvaWithTotalPrice> {
        return Promise.resolve(getFullPrice(body));
    }
}
