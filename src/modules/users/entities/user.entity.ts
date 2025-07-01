import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Role } from "@/modules/roles/entities/role.entity";

@Entity('users')
export class User {
  @PrimaryColumn()
  username!: string;

  @Column()
  password_hash!: string;

  @Column()
  fullname!: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column()
  email!: string;

  @Column()
  phonenumber!: string;

  @Column()
  create_at!: Date;

  @Column()
  role_id!: string;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
