import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("witness")
export class Witness {
  @PrimaryGeneratedColumn()
    witness_id!: number;

  @Column()
  case_id!: number;

    @Column()
    fullname!: string;

    @Column()
    contact!: string;

    @Column({ type: 'text' })
  statement!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;
}
