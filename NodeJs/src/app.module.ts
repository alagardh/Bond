import { Module } from '@nestjs/common';
import { TaskModule } from './cron/task.module';
import { DAMLConnect } from './daml/connect_daml';
import { TokenizationModule } from './tokenization/tokenization.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TaskModule,
    TokenizationModule
  ],
  providers: [],
})
export class AppModule {
  constructor() {
    this.initialConnection();
  }

  public async initialConnection() {
    await new DAMLConnect().getParties();
  }
}
