import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nestjs-task-db'), // Update with your MongoDB URI
    TaskModule,
  ],
})
export class AppModule {}
