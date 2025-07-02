import { Case } from "@/modules/case/entities/case.entity";
import { Indictment } from "@/modules/indictments/entities/indictment.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: "prosecution" })
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

  @ManyToOne(() => Case, (case1) => case1.prosecutions)
  case!: Case;

  @ManyToOne(() => User, (user) => user.prosecutions)
  user!: User;

  @OneToMany(() => Indictment, (indictment) => indictment.prosecution)
  indictments!: Indictment[];
}
