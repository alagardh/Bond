import { Body, Controller, Get, Post } from "@nestjs/common";
import { TokenizationService } from "./tokenization.service.";
import { CreateTemplates } from "src/daml/create_template";

@Controller('chaincode')
export class TokenizationContoller{
    constructor(private tokenService : TokenizationService,
                private damlConnect : CreateTemplates){

    }

    @Post('postRequest/:requestBody')
    postRequest(@Body() requestBody : any){
        return this.damlConnect.postRequest(requestBody)

    }

    @Get('balanceOf')
    checkBalance():any{
        return this.tokenService.checkBalance();
    }

}