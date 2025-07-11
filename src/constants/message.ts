import { Warrant } from "@/modules/warrants/entities/warrant.entity";

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


  REPORT: {
    REPORT_GET: "Fetch report data successfully",
    REPORT_CREATED: "Report created successfully",
    REPORT_UPDATED: "Report updated successfully",
    REPORT_STATUS_UPDATED: "Report status updated successfully",
    REPORT_DELETED: "Report deleted successfully",
  },

  AUTH: {
    LOGIN_SUCCESS: "Login successfully",
    LOGOUT_SUCCESS: "Logout successfully",
    INVALID_CREDENTIALS: "Invalid username or password",
    USER_ALREADY_EXISTS: "User already exists",
  },

  TASK: {
    TASK_GET: "Fetch task data successfully",
    TASK_CREATED: "Task created successfully",
    TASK_UPDATED: "Task updated successfully",
    TASK_DELETED: "Task deleted successfully",
  },

  WARRANT: {
    WARRANT_GET: "Fetch warrant data successfully",
    WARRANT_CREATED: "Warrant created successfully",
    WARRANT_UPDATED: "Warrant updated successfully",
    WARRANT_DELETED: "Warrant deleted successfully",
  },

  FINANCIAL_INVEST: {
    FINANCIAL_INVEST_GET: "Fetch financial invest data successfully",
    FINANCIAL_INVEST_UPDATED: "Update financial investigation successfully",
  },

  FORENSIC_INVEST: {
    FORENSIC_INVEST_GET: "Fetch forensic invest data successfully",
    FORENSIC_INVEST_UPDATED: "Update forensic investigation successfully",
  },
  HOLIDAY: {
    HOLIDAY_GET: "Fetch holiday data successfully",
    HOLIDAY_CREATED: "Holiday created successfully",
    HOLIDAY_UPDATED: "Holiday updated successfully",
    HOLIDAY_DELETED: "Holiday deleted successfully",
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
  HOLIDAY_NOT_FOUND: "Holiday not found",
  WARRANT_NOT_FOUND: "Warrant not found",
  WARRANT_EXISTS: "Warrant already exists",
  WARRANT_INVALID: "Invalid warrant data",
  FILE_PROCESS_FAILED: "Failed to process files",
  FILE_UPLOAD_FAILED: "Failed to upload files",
  UNSUPPORTED_FILE_TYPE: "This file type is not supported",
  FINANCIAL_INVESTIGATION_NOT_FOUND: "Financial investigation not found",
  HOLIDAY_CREATE_FAILED: "Failed to create holiday",
  FORENSIC_INVESTIGATION_NOT_FOUND: "Forensic investigation not found",

  TASK_NOT_FOUND: "Task not found",
  TASK_INVALID_STATUS: "Task cannot be updated further",
  
  INVALID_JSON: "Invalid JSON",

  REPORT_NOT_FOUND: "Report not found",

  FORBIDDEN: "Access forbidden",
  INVALID_REPORT_STATUS: "Invalid report status",
  INTERNAL_SERVER_ERROR: "Internal server error",
} as const;
