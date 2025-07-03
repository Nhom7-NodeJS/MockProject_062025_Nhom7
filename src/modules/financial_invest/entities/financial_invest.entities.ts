import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity("financial_invest")
export class FinancialInvest {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  summary!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToOne(() => Evidence)
  @JoinColumn({ name: "evidence_id" })
  evidence!: Evidence;
}
