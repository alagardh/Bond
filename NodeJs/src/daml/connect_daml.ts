/* eslint-disable prettier/prettier */
import 'dotenv/config';

export class DAMLConnect {
  constructor(){

  }
  

    public async  getParties() {
      const response = await fetch(`${process.env.JSON_API}/parties`,{headers: {'Content-Type': 'application/json',
      'Authorization': 'Bearer parties'}});
        const partyList = (await response.json()).result;
        console.log(partyList);
        process.env['gs'] = partyList[2].identifier
        process.env['bny'] = partyList[0].identifier
       
        
    }
  }

  

