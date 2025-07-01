import { getVNTime } from "@/helpers/format-datetime";

/**
 * Simple logger utility to print formatted logs with timestamps (Vietnam time).
 * - `log`: Logs an info message in cyan.
 * - `error`: Logs an error message in red.
 * - `success`: Logs an success message in green.
 */
export const logger = {
  /**
   * Logs a standard informational message to the console.
   * @param message - The message to be logged
   */
  log: (message: string) => {
    const timestamp = getVNTime();
    console.log(`\x1b[36m[${timestamp}] [INFO]\x1b[0m ${message}`);
  },

  /**
   * Logs an error message to the console.
   * @param message - The error message to be logged
   */
  error: (message: string) => {
    const timestamp = getVNTime();
    console.error(`\x1b[31m[${timestamp}] [ERROR]\x1b[0m ${message}`);
  },

  /**
   * Logs an success message to the console.
   * @param message - The success message to be logged
   */
  success: (message: string) => {
    const timestamp = getVNTime();
    console.log(`\x1b[32m[${timestamp}] [SUCCESS]\x1b[0m ${message}`);
  },
};
