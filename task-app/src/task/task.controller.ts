import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body('task') task: string): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body('task') task: string): Promise<Task | null> {
    return this.taskService.update(id, task);
  }

  @Put('/edit/:id')
  async editTask(@Param('id') id: string, @Body('task') task: string): Promise<Task | null> {
    return this.taskService.edit(id, task);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.taskService.delete(id);
  }

  @Get()
  async listTasks(): Promise<Task[]> {
    return this.taskService.list();
  }
}
