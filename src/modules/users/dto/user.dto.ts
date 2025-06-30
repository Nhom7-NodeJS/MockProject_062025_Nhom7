// Input DTO (from req.body)
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

// Output DTO (for response)
export interface UserResponseDto {
  id: number;
  name: string;
  email?: string;
  createdAt?: Date;
}
