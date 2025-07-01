import {Entity, PrimaryColumn, Column} from "typeorm"

@Entity("forensic_invest")
export class Forensic_invest{
    @PrimaryColumn()
    evidence_id!: string;

    @Column()
    lab_name!: string;

    @Column()
    report!: string;

    @Column()
    received_at!: Date;

    @Column({ type: 'boolean', default: false })
    is_deleted!: boolean
}