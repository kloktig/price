import {Body, Controller, Get, Post, Route, Example, TsoaResponse, Res} from 'tsoa';
import {getFullPrice, getMvaTypes, isInValidRateGroup, Mva, MvaWithTotalPrice} from "../models/mva";

@Route('mva')
export class MvaController extends Controller {


    /**
     * @summary Get MVA price groups
     */
    @Get("groups")
    public getGroups(): Promise<Array<string>> {
        return Promise.resolve(getMvaTypes());
    }


    /**
     * @summary Get Price including MVA
     * @param body
     * @param notFoundResponse
     */
    @Post("price")
    @Example<MvaWithTotalPrice>({
        group: "normal",
        basePrice: 2000,
        dateTime: new Date(),
        totalPrice: 2500,

    })
    public PostPrice(
        @Body() body: Mva,
        @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
    ): Promise<MvaWithTotalPrice> {
        if (isInValidRateGroup(body.group)) {
            notFoundResponse(404, { reason: `Group: '${body.group}' is not supported. Try: [${getMvaTypes()}]` });
        }
        return Promise.resolve(getFullPrice(body));
    }
}
