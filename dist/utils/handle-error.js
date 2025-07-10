"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandle = void 0;
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
const asyncHandle = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandle = asyncHandle;
