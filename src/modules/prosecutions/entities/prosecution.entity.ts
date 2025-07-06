import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { Indictment } from "@/modules/indictments/entities/indictment.entity";
import { ProsecutionUser } from "@/modules/prosecutions_users/entities/prosecution_user.entity";
import { User } from "@/modules/users/entities/user.entity";

@Entity("prosecutions")
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

  // OneToMany
  @OneToMany(() => Indictment, (indictment) => indictment.prosecution)
  indictments!: Indictment[];

  @OneToMany(
    () => ProsecutionUser,
    (prosecutionUser) => prosecutionUser.prosecution
  )
  prosecutionUsers!: ProsecutionUser[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.prosecutions)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.prosecutions)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
