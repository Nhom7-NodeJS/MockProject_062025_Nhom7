import { User } from "./entities/user.entity";
import { UserResponseDto } from "./dto/user.dto";

// Map user entity to user response dto
export const toUserResponseDto = (user: User): UserResponseDto => {
  const { id, name, email } = user;
  return { id, name };
};
