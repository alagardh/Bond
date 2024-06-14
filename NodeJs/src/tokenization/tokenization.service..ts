import { Injectable } from "@nestjs/common";
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { EthereumInitialize } from "./initialize";
import { ExerciseTemplate } from "src/daml/exercise-template";

let ethContract : any;

@Injectable()
export class TokenizationService{

    constructor(private EthInitialize : EthereumInitialize,
                private damlContract : ExerciseTemplate){
        ethContract = this.EthInitialize.initiConnection();
    }

    public async addQuantity(params : any){
        try{
            await ethContract.methods.addToken(process.env.ETH_ACCOUNT,params.payload.quantity) 
                    .send({from: process.env.ETH_ACCOUNT, gas: 5500000, gasPrice: 10e9 });
            await this.damlContract.completeAction(params);
            return true;

        }catch(error){
          console.log(error);
          return false;
        }

    }

    public async checkBalance(){
        return await ethContract.methods.balanceOf(process.env.ETH_ACCOUNT).call();
    }
   
}