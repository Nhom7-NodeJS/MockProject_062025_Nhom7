import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";

@Entity("financial_invest")
export class FinancialInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  summary!: string;
  
  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @OneToOne(() => Evidence, (evidence) => evidence.financialInvest)
  @JoinColumn({ name: 'evidence_id' })
  evidence!: Evidence;
}
