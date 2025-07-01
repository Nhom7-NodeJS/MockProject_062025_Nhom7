// src/modules/forensic_tasks/forensic-task.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ForensicTask } from "./entities/forensic-task.entity";
import { Repository } from "typeorm";

@Injectable()
export class ForensicTaskService {
  constructor(
    @InjectRepository(ForensicTask)
    private forensicTaskRepo: Repository<ForensicTask>
  ) {}

  async findAll(status?: string): Promise<ForensicTask[]> {
    if (status) {
      return this.forensicTaskRepo.find({ where: { status } });
    }
    return this.forensicTaskRepo.find();
  }

  async findOne(id: string): Promise<ForensicTask> {
    return this.forensicTaskRepo.findOne({ where: { task_id: id } });
  }
}
async getAllTasks(): Promise<ForensicTask[]> {
  return this.forensicTaskRepository.find();
}
