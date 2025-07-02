import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity("measure_surveys")
export class MeasureSurvey {
  @PrimaryColumn()
  measure_survey_id!: string;

  @Column()
  type_name!: string;

  @Column({ nullable: true })
  source?: string;

  @Column({ nullable: true })
  result?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Evidence, (evidence) => evidence.measure_surveys)
  evidence!: Evidence;
}
