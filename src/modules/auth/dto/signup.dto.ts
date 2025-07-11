import { Gender } from '@/modules/users/enums/user.enum';
import { RoleType } from '@/constants/role-type';

export interface SignupDto {
  username: string;
  password: string;
  email?: string;
  fullname: string;
  dob: Date;
  phone_number?: string;
  gender?: Gender;
  date_attended: Date;
  roleType?: RoleType;
}

export interface SignupResponseDto {
  username: string;
  email: string;
  role: string;
}
