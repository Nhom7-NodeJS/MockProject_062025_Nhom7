import { Case } from "@/modules/case/entities/case.entity";
import { ReportsVictims } from "@/modules/reports_victims/entities/reports_victims.entity";
import { VictimInterview } from "@/modules/victim_interview/entities/victim_interview.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("victims")
export class Victim {
  @PrimaryColumn()
  victim_id!: string;

  @Column()
  fullname!: string;

  @Column()
  contact!: string;

  @Column()
  injuries!: string;

  @Column()
  status!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case1) => case1.victims)
  case!: Case;

  @OneToMany(() => ReportsVictims, (reportsVictims) => reportsVictims.victim)
  reports_victims!: ReportsVictims[];

  @OneToMany(() => VictimInterview, (victimInterview) => victimInterview.victim)
  victims_interviews!: VictimInterview[];
}
