import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("financial_invests")
export class FinancialInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
<<<<<<< HEAD

=======
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
  summary?: string;

  @Column({ type: "json" })
  attach_file?: string[];

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToOne
  @OneToOne(() => Evidence, (evidence) => evidence.financialInvest)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;
}
