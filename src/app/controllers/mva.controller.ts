import {Body, Controller, Get, Post, Route, Example, TsoaResponse, Res} from 'tsoa';
import {Mva, MvaWithTotalPrice} from "../models/mva";
import {MvaService} from "../service/mva.service";

@Route('mva')
export class MvaController extends Controller {

    private mvaService = new MvaService()

    /**
     * @summary Get MVA price groups
     */
    @Get("groups")
    public getGroups(): Promise<Array<string>> {
        return Promise.resolve(this.mvaService.getMvaTypes());
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
        if (this.mvaService.isInValidRateGroup(body.group)) {
            notFoundResponse(404, { reason: `Group: '${body.group}' is not supported. Try: [${this.mvaService.getMvaTypes()}]` });
        }
        return Promise.resolve(this.mvaService.getFullPrice(body));
    }
}
