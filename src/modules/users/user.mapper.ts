import { User } from "./entities/user.entity";
import { UserResponseDto } from "./dto/user.dto";

// Map user entity to user response dto
export const toUserResponseDto = (user: User) => {
    return {
      userName: user.username,
      fullname: user.fullname,
      phone: user.phone_number,
      DOB: user.dob,
      status: user.status,
      createdAt: user.create_at,
      position: user.position
    };
};
