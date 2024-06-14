/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { Tokenization } from 'src/utils/tokenization';
import { TokenizationService } from 'src/tokenization/tokenization.service.';
import { EthereumInitialize } from 'src/tokenization/ethereumInitialize';
import { CreateTemplates } from 'src/daml/create_template';
import { ExerciseTemplate } from 'src/daml/exercise-template';
@Module({
    providers : [TaskService,Tokenization,TokenizationService,EthereumInitialize,CreateTemplates,ExerciseTemplate]
  })
export class TaskModule{

}