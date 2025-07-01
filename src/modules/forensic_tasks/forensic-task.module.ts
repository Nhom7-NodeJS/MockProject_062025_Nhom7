import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ForensicTask } from "./entities/forensic-task.entity";
import { ForensicTaskService } from "./forensic-task.service";
import { ForensicTaskController } from "./forensic-task.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ForensicTask])],
  controllers: [ForensicTaskController],
  providers: [ForensicTaskService],
})
export class ForensicTaskModule {}
