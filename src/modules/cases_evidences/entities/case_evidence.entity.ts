import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("cases_evidences")
export class CaseEvidence {
  @PrimaryColumn()
  case_id!: string;

  @PrimaryColumn()
  evidence_id!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.caseEvidences)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => Evidence, (evidence) => evidence.caseEvidences)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;
}
