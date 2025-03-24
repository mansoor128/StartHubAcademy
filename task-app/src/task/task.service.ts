import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import * as winston from 'winston';

@Injectable()
export class TaskService {
  private logger: winston.Logger;

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {
    this.logger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.File({ filename: './logs/app.log' }),
      ],
    });
  }

  async create(task: string): Promise<Task> {
    const newTask = new this.taskModel({ task });
    const result = await newTask.save();
    // this.logger.info(`event: task_created, task_id: ${result.id}`);
    this.logger.info(JSON.stringify({level: "info",event: "task_created",task_id: result.id}));
  

    return result;
  }

  async update(id: string, task: string): Promise<Task | null> {  // Allow null return type
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, { task }, { new: true });

    if (updatedTask) {
      // this.logger.info(`event: task_updated, task_id: ${updatedTask.id}`);
      this.logger.info(JSON.stringify({level: "info",event: "task_updated",task_id: updatedTask.id}));

    }
    return updatedTask;  // Now returning Task | null
  }
  async list(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
  
  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.taskModel.findByIdAndDelete(id);

    if (result) {
      // this.logger.info(`event: task_deleted, task_id: ${result.id}`);
      this.logger.info(JSON.stringify({level: "info",event: "task_deleted",task_id: result.id}));

      return { deleted: true };
    }
    return { deleted: false };
  }

  async edit(id: string, task: string): Promise<Task | null> { // Allow null return type
    const editedTask = await this.taskModel.findByIdAndUpdate(id, { task }, { new: true });

    if (editedTask) {
      // this.logger.info(`event: task_edit, task_id: ${editedTask.id}`);
      this.logger.info(JSON.stringify({level: "info",event: "task_edit",task_id: editedTask.id}));

    }
    return editedTask;  // Now returning Task | null
  }
}
