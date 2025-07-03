import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "warrants_results" })
export class WarrantResult {
  @PrimaryColumn()
  warrant_result_id!: string;

  @Column()
  police_response!: string;

  @Column()
  location!: string;

  @Column()
  notes!: string;

  @Column({ type: "timestamp" })
  time_active!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Warrant, (warrant) => warrant.warrant_results)
  @JoinColumn({ name: "warrant_id" })
  warrant!: Warrant;
}
