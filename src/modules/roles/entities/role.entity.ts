import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";

@Entity('roles')
export class Role {
  @PrimaryColumn()
  role_id!: string;

  @OneToOne(() => User, user => user.role)
  user!: User;

  @Column()
  description!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}