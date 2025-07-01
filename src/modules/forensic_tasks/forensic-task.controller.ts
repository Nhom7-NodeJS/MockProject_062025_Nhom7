// src/modules/forensic_tasks/forensic-task.controller.ts
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ForensicTaskService } from "./forensic-task.service";

@Controller("forensic-tasks")
export class ForensicTaskController {
  constructor(private readonly forensicTaskService: ForensicTaskService) {}

  @Get()
  async getAll(@Query("status") status?: string) {
    return this.forensicTaskService.findAll(status);
  }

  @Get(":id")
  async getOne(@Param("id") id: string) {
    return this.forensicTaskService.findOne(id);
  }
}
@Get()
async getAllTasks() {
  return this.forensicTaskService.getAllTasks();
}
