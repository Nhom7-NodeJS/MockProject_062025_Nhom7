import { TypeOfHoliday } from "@/modules/holidays/enums/holiday.enum";
import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity("holidays")
export class Holiday {
  @PrimaryColumn()
  holiday_id!: string;

 
  @BeforeInsert()
  generateId() {
    this.holiday_id = `HD${uuidv4().replace(/-/g, "").slice(0, 10)}`; 
  }

  @Column()
  holiday_name!: string;

  @Column({ type: "enum", enum: TypeOfHoliday })
  type_of_holiday!: TypeOfHoliday;

  @Column({ type: "timestamp" })
  date_of_holiday!: Date;

  @Column({ nullable: true })
  note?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}

