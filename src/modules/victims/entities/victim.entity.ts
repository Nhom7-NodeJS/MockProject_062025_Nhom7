import { Case } from "@/modules/cases/entities/case.entity";
import { ReportsVictims } from "@/modules/reports_victims/entities/reports_victims.entity";
import { VictimInterview } from "@/modules/victims_interviews/entities/victim_interview.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity("victims")
export class Victim {
  @PrimaryColumn()
  victim_id!: string;

  @Column({ nullable: true })
  fullname?: string;

  @Column()
  contact!: string;

  @Column({ nullable: true })
  national?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  injuries!: string;

  @Column()
  status!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.victims)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @OneToMany(() => ReportsVictims, (reportsVictims) => reportsVictims.victim)
  reports_victims!: ReportsVictims[];

  @OneToMany(() => VictimInterview, (victimInterview) => victimInterview.victim)
  victims_interviews!: VictimInterview[];
}
