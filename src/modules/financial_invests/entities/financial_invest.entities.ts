import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("financial_invests")
export class FinancialInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  summary!: string;
  
  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  // OneToOne
  @OneToOne(() => Evidence, (evidence) => evidence.financialInvest)
  @JoinColumn({ name: 'evidence_id' })
  evidence!: Evidence;
}

