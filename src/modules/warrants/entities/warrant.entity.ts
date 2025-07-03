import { Case } from "@/modules/cases/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { WarrantResult } from "@/modules/warrants_results/entities/warrant_result.entity";
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: "warrants" })
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

  @ManyToOne(() => Case, (case_) => case_.warrants)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @OneToMany(() => Evidence, (evidence) => evidence.warrant)
  evidences!: Evidence[];
}
