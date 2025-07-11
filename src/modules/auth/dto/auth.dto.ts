
// Input DTO (from req.body)
import {UserStatus, Zone} from "@/modules/users/enums/user.enum"
export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  fullname: string;
  status: UserStatus;
  DOB: Date;
  attended: Date;
  zone: Zone;
  phone_number: string;
}

// Output DTO (for response)
export interface UserResponseDto {
  id: number;
  fullname: string;
  createdAt?: Date;
  status: UserStatus;
  attended: Date;
  DOB: Date;
}
