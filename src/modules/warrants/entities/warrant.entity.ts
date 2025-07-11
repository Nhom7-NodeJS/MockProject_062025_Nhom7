import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { User } from "@/modules/users/entities/user.entity";
import { v4 as uuidv4 } from "uuid";

import { WarrantStatus } from "../enums/warrant.enum";

@Entity("warrants")
export class Warrant {
  @PrimaryColumn()
  warrant_id!: string;

  @BeforeInsert()
  generateId() {
    this.warrant_id = `WR${uuidv4().replace(/-/g, "").slice(0, 10)}`; // ví dụ: WR1a2b3c4d5e
  }

  @Column()
  warrant_name!: string;

  @Column()
  police_response!: string;

  @Column({ type: "json", nullable: true })
  attached_file!: string[];

  @Column({ type: "timestamp" })
  time_publish!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @Column({ type: "timestamp" })
  deadline!: Date;

  // Set default deadline to 30 days from now if not provided
  @BeforeInsert()
  setDefaultDeadline() {
    if (!this.deadline) {
      const defaultDeadline = new Date();
      defaultDeadline.setDate(defaultDeadline.getDate() + 30);
      this.deadline = defaultDeadline;
    }
  }

  @Column({
    type: "enum",
    enum: WarrantStatus,
    default: WarrantStatus.WAITING_EXECUTING,
  })
  status!: WarrantStatus;

  // OneToMany
  @OneToMany(() => Evidence, (evidence) => evidence.warrant)
  evidences!: Evidence[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.warrants)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.warrants)
  @JoinColumn({ name: "police_response" })
  user!: User;
}
