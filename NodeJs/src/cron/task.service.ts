/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenizationService } from 'src/tokenization/tokenization.service.';
import { Tokenization } from 'src/utils/tokenization';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private tokenization : Tokenization,
            private ethService : TokenizationService){
  }


  @Cron(CronExpression.EVERY_5_MINUTES)
  async checkActiveContract() {
    this.logger.debug('Called every 10 minutes');
    const bearer = await this.tokenization.generateHS256([process.env.bny]);
    try {
      const response = await fetch(`${process.env.JSON_API}/query`, {
      method: 'post',
      body: JSON.stringify({'templateIds': ['Account:Trade']}),
      headers: {'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearer}`}
      });
      const activeContracts = await response.json();
      console.log(activeContracts.result);
      activeContracts.result.forEach(async contract => {
        if(contract.payload.approveStatus){
          await this.ethService.addQuantity(contract)

        }
      });
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  }


   
}
