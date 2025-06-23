export const SuccessMessages = {
  USER: {
    USER_CREATED: "User created successfully",

    USER_UPDATED: "User updated successfully",

    USER_DELETED: "User deleted successfully",

    USER_GET: "Fetch user data successfully",
  },

  AUTH: {
    LOGIN_SUCCESS: "Login successfully",

    LOGOUT_SUCCESS: "Logout successfully",
  },
} as const;

export const ErrorMessages = {
  USER_NOT_FOUND: "User not found",

  INVALID_ID: "Invalid id",

  EMAIL_EXISTS: "Email already exists",

  INVALID_CREDENTIALS: "Invalid email or password",

  UNAUTHORIZED: "You are not authorized",

  VALIDATION_FAILED: "Validation failed",

  SERVER_ERROR: "Something went wrong",
} as const;
