import { Module } from '@nestjs/common';
import { TaskModule } from './cron/task.module';
import { DAMLConnect } from './daml/connect_daml';
@Module({
  imports: [
    TaskModule
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
