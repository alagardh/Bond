/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { Tokenization } from 'src/utils/tokenization';
@Module({
    providers : [TaskService,Tokenization]
  })
export class TaskModule{

}