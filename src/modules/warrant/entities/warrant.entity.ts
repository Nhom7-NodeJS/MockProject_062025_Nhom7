import { Case } from "@/modules/case/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { WarrantResult } from "@/modules/warrant_result/entities/warrant_result.entity";
import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity({ name: "warrant" })
export class Warrant {
  @PrimaryColumn()
  warrant_id!: string;

  @Column()
  warrant_name!: string;

  @Column({ type: "json", nullable: true })
  attached_file!: string[];

  @Column({ type: "timestamp" })
  time_publish!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToMany(() => WarrantResult, (warrantResult) => warrantResult.warrant)
  warrant_results!: WarrantResult[];

  @ManyToOne(() => Case, (case1) => case1.warrants)
  case!: Case;

  @OneToMany(() => Evidence, (evidence) => evidence.warrant)
  evidences!: Evidence[];
}
