/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { Tokenization } from 'src/utils/tokenization';




export class ExerciseTemplate {

    constructor(private tokenization: Tokenization){

    }
    async completeAction(params){
        const request = {
          "templateId" : `${process.env.PACKAGE_ID}:Account:Trade`,
          "contractId" : params.contractId,
          "choice" : "CompleteAction",
          "argument": {}          
          } 
      
          console.log(request)
          const Bearer = await this.tokenization.generateHS256([params.payload.requestFrom]);
          console.log(Bearer);
          const response = await fetch(`${process.env.JSON_API}/exercise`,{
              method: 'post',
              body: JSON.stringify(request),
              headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${Bearer}`}});
      
          const result =  await response.json();
          return result;
      }
}

