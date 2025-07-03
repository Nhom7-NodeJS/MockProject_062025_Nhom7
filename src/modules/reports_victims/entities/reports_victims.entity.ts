import { Report } from "@/modules/reports/entities/report.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity("reports_victims")
export class ReportsVictims {
  @PrimaryColumn()
  report_id!: string;

  @PrimaryColumn()
  victim_id!: string;

  @ManyToOne(() => Victim, (victim) => victim.reports_victims)
  @JoinColumn({ name: "victim_id" })
  victim!: Victim;

  @ManyToOne(() => Report, (report) => report.reports_victims)
  @JoinColumn({ name: "report_id" })
  report!: Report;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
