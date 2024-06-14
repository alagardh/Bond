import { Injectable } from "@nestjs/common";

var jwt = require('jsonwebtoken');
@Injectable()
export class Tokenization{
    async generateHS256(actors:any){

        const payload = {
            "https://daml.com/ledger-api":
          {
              "ledgerId": "sandbox",
              "applicationId": "DollarToRupee",
              "actAs": actors
            }
          }

         const secretKey = await jwt.sign(payload, 'secret');
         return secretKey;

    }
}