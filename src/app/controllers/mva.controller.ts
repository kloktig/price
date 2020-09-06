import { Controller, Get, Route } from 'tsoa';

@Route('/mva')
export class MvaController extends Controller {

    @Get('')
    public async index() {
        return { msg: 'Hello Mva Controler!' };
    }

    @Get('/msg')
    public msg() {
        return { msg: 'This is a message' };
    }
}