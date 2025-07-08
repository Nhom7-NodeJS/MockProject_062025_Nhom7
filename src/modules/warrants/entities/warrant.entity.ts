import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { WarrantResult } from "@/modules/warrant_results/entities/warrant_result.entity";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum";
import { User } from "@/modules/users/entities/user.entity";
@Entity("warrants")
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

  @Column({ type: "timestamp" })
  deadline!: Date;

  @Column({
    type: "enum", 
    enum: WarrantStatus,
    default: WarrantStatus.WAITING_EXECUTING,
  })
  status!: WarrantStatus;

  // OneToMany
  @OneToMany(() => Evidence, (evidence) => evidence.warrant)
  evidences!: Evidence[];

  @OneToMany(() => WarrantResult, (warrantResult) => warrantResult.warrant)
  warrantResults!: WarrantResult[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.warrants)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User)
  @JoinColumn({ name: "police_response" }) 
  police_response!: User;
}
