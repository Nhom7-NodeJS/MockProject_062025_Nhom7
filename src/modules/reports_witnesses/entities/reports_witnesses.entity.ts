import { Report } from "@/modules/reports/entities/report.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity("reports_witnesses")
export class ReportsWitnesses {
  @PrimaryColumn()
  report_id!: string;

  @PrimaryColumn()
  witness_id!: string;

  @ManyToOne(() => Witness, (witness) => witness.reports_witnesses)
  @JoinColumn({ name: "witness_id" })
  witness!: Witness;

  @ManyToOne(() => Report, (report) => report.reports_witnesses)
  @JoinColumn({ name: "report_id" })
  report!: Report;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
