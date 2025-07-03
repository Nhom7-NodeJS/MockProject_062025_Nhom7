import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Report } from "@/modules/reports/entities/report.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";

@Entity("reports_witnesses")
export class ReportWitness {
  @PrimaryColumn()
  report_id!: string;

  @PrimaryColumn()
  witness_id!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Report, (report) => report.reportWitnesses)
  @JoinColumn({ name: "report_id" })
  report!: Report;

  @ManyToOne(() => Witness, (witness) => witness.reportWitnesses)
  @JoinColumn({ name: "witness_id" })
  witness!: Witness;
}
