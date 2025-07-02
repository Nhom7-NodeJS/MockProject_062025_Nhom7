import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Report } from "@/modules/reports/entities/report.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";

@Entity('reports_suspects')
export class ReportSuspect {
  @PrimaryColumn()
  report_id!: string;

  @PrimaryColumn()
  suspect_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Report, (report) => report.reportSuspects)
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @ManyToOne(() => Suspect, (suspect) => suspect.reportSuspects)
  @JoinColumn({ name: 'suspect_id' })
  suspect!: Suspect;
}