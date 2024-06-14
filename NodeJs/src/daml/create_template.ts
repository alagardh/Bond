/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { Tokenization } from 'src/utils/tokenization';



export class CreateTemplates {
    constructor(private tokenGeneration : Tokenization){

    }
    public async  postRequest(params:any) {
        const request = {
            "templateId" : `${process.env.PACKAGE_ID}:Account:Trade`,
            "payload" : params           
            } 
            console.log(request)
        const Bearer = await this.tokenGeneration.generateHS256([params.bny,params.gs]);
        console.log(Bearer);
        const response = await fetch(`${process.env.JSON_API}/create`,{
            method: 'post',
            body: JSON.stringify(request),
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${Bearer}`}});
        
        const result =  await response.json();
        console.log(result);
        return result;
        
    }
}

