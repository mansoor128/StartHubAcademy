import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
  task: { type: String, required: true },
});

export interface Task extends Document {
  id: string;
  task: string;
}
