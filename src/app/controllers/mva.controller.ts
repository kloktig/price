import {Body, Controller, Get, Post, Route} from 'tsoa';
import {Mva} from "../models/mva";


@Route('/mva.ts')
export class MvaController extends Controller {

    @Get('/')
    public getPrice(): string {
        //const basePrice = price / 100;
        return ""
    }

    @Post('/')
    public PostPrice(@Body() requestBody: Mva): number {
        //const basePrice = price / 100;
        return requestBody.getFullPrice();
    }
}
