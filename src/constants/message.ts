export const SuccessMessages = {
  USER: {
    USER_CREATED: "User created successfully",

    USER_UPDATED: "User updated successfully",

    USER_DELETED: "User deleted successfully",

    USER_GET: "Fetch user data successfully",
  },

  ARREST: {
    ARREST_CREATED: "Arrest created successfully",

    ARREST_UPDATED: "Arrest updated successfully",

    ARREST_DELETED: "Arrest deleted successfully",

    ARREST_GET: "Fetch arrest data successfully",
  },

  PERMISSION: {
    PERMISSION_CREATED: "Permission created successfully",

    PERMISSION_UPDATED: "Permission updated successfully",

    PERMISSION_DELETED: "Permission deleted successfully",

    PERMISSION_GET: "Fetch permission data successfully",
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

  ARREST_NOT_FOUND: "Arrest not found",

  ARREST_EXISTS: "Arrest already exists",

  PERMISSION_NOT_FOUND: "Permission not found",

  PERMISSION_ALREADY_EXISTS: "Permission already exists",

  PERMISSION_EXISTS: "Permission already exists for this user",

  SENTENCE_NOT_FOUND: "Sentence not found",

  SENTENCE_EXISTS: "Sentence already exists",
} as const;
