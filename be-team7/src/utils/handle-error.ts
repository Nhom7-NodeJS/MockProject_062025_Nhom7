import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Wrapper function to catch errors in async Express route handlers.
 *
 * This helper eliminates the need to write try-catch in each controller.
 * If an error is thrown (sync or async), it is automatically passed to `next()`
 * so that Express exception-filler middleware can catch and process it.
 *
 * @param fn - The async controller or middleware function to wrap.
 * @returns A function that handles errors and forwards them to the next middleware.
 *
 * @example
 * router.get('/user/:id', asyncHandle(async (req, res) => {
 *   const user = await userService.findById(req.params.id);
 *   res.json(user);
 * }));
 */
export const asyncHandle = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
