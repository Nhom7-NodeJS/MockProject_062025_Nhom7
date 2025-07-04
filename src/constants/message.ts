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
<<<<<<< HEAD
=======

  ARREST_NOT_FOUND: "Arrest not found",

  ARREST_EXISTS: "Arrest already exists",

  PERMISSION_NOT_FOUND: "Permission not found",

  PERMISSION_ALREADY_EXISTS: "Permission already exists",

  PERMISSION_EXISTS: "Permission already exists for this user",

  SENTENCE_NOT_FOUND: "Sentence not found",

  SENTENCE_EXISTS: "Sentence already exists",

  REPORT_NOT_FOUND: "Report not found",

  REPORT_STATUS_UPDATED: "Report status updated successfully",
>>>>>>> 9794a2d (API to confirm reports + print reports. Click button will change the status of report (SC11))
} as const;
