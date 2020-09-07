import {Body, Controller, Get, Post, Route, Example} from 'tsoa';
import {getFullPrice, getMvaTypesAndRates, Mva, MvaWithTotalPrice} from "../models/mva";

@Route('mva')
export class MvaController extends Controller {


    /**
     * @summary Get MVA price groups
     */
    @Get("groups")
    public getGroups(): Promise<Array<string>> {
        return Promise.resolve(getMvaTypesAndRates());
    }

    /**
     * @summary Get Price including MVA
     * @param body
     */
    @Post("price")
    @Example<MvaWithTotalPrice>({
        "group": "normal",
        "basePrice": 2000,
        "totalPrice": 2500
    })
    public PostPrice(@Body() body: Mva): Promise<MvaWithTotalPrice> {
        return Promise.resolve(getFullPrice(body));
    }
}
