import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Report } from "@/modules/reports/entities/report.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";

@Entity('reports_victims')
export class ReportVictim {
  @PrimaryColumn()
  report_id!: string;

  @PrimaryColumn()
  victim_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Report, (report) => report.reportVictims)
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @ManyToOne(() => Victim, (victim) => victim.reportVictims)
  @JoinColumn({ name: 'victim_id' })
  victim!: Victim;
}