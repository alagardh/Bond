/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { Tokenization } from 'src/utils/tokenization';
import { TokenizationService } from 'src/tokenization/tokenization.service.';
@Module({
    providers : [TaskService,Tokenization,TokenizationService]
  })
export class TaskModule{

}