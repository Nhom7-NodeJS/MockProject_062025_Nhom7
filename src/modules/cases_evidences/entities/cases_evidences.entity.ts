import { Case } from "@/modules/case/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity("cases_evidences")
export class CasesEvidences {
  @PrimaryColumn()
  case_id!: string;

  @PrimaryColumn()
  evidence_id!: string;

  @ManyToOne(() => Case, (case_) => case_.cases_evidences)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => Evidence, (evidence) => evidence.cases_evidences)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
