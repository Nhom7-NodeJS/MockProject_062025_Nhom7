import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Warrant } from "@/modules/warrants/entities/warrant.entity";

@Entity("warrant_results")
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

  // ManyToOne
  @ManyToOne(() => Warrant, (warrant) => warrant.warrantResults)
  @JoinColumn({ name: "warrant_id" })
  warrant!: Warrant;
}
  