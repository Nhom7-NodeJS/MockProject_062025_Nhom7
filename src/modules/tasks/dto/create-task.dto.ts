import { TaskStatus } from '../enums/task.enum';

export interface CreateTaskDto {
  task_name: string;
  content?: string;
  start_date: Date;
  due_date?: Date;
  case_id: string;
  username: string;
  status?: TaskStatus;
}
