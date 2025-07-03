import { Case } from "@/modules/cases/entities/case.entity";
import { Indictment } from "@/modules/indictments/entities/indictment.entity";
import { ProsecutionsUsers } from "@/modules/prosecutions_users/entities/prosecutions_users.entity";
import { User } from "@/modules/users/entities/user.entity";
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity({ name: "prosecutions" })
export class Prosecution {
  @PrimaryColumn()
  prosecution_id!: string;

  @Column()
  decision!: string;

  @Column({ type: "timestamp" })
  decision_date!: Date;

  @Column()
  reason!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.prosecutions)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.prosecutions)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Indictment, (indictment) => indictment.prosecution)
  indictments!: Indictment[];

  @OneToMany(
    () => ProsecutionsUsers,
    (prosecutionsUsers) => prosecutionsUsers.prosecution
  )
  prosecutions_users!: ProsecutionsUsers[];
}
