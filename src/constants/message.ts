export const SuccessMessages = {
  USER: {
    USER_GET: "Fetch user data successfully",
    USER_CREATED: "User created successfully",
    USER_UPDATED: "User updated successfully",
    USER_DELETED: "User deleted successfully",
  },

  ARREST: {
    ARREST_GET: "Fetch arrest data successfully",
    ARREST_CREATED: "Arrest created successfully",
    ARREST_UPDATED: "Arrest updated successfully",
    ARREST_DELETED: "Arrest deleted successfully",
  },

  CASE: {
    CASE_GET: "Fetch case data successfully",
    CASE_CREATED: "Case created successfully",
    CASE_UPDATED: "Case updated successfully",
    CASE_DELETED: "Case deleted successfully",
  },

  PERMISSION: {
    PERMISSION_GET: "Fetch permission data successfully",
    PERMISSION_CREATED: "Permission created successfully",
    PERMISSION_UPDATED: "Permission updated successfully",
    PERMISSION_DELETED: "Permission deleted successfully",
  },

  AUTH: {
    LOGIN_SUCCESS: "Login successfully",
    LOGOUT_SUCCESS: "Logout successfully",
  },

  FINANCIAL_INVEST: {
    FINANCIAL_INVEST_GET: "Fetch financial invest data successfully",
  },

  FORENSIC_INVEST: {
    FORENSIC_INVEST_GET: "Fetch forensic invest data successfully",
  },

  TASK: {
    TASK_GET: "Fetch task data successfully",
    TASK_UPDATED: "Update task status successfully",
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

  FINANCIAL_INVESTIGATION_NOT_FOUND: "Financial investigation not found",

  FORENSIC_INVESTIGATION_NOT_FOUND: "Forensic investigation not found",

  TASK_NOT_FOUND: "Task not found",

  TASK_INVALID_STATUS: "Task cannot be updated further",
} as const;
