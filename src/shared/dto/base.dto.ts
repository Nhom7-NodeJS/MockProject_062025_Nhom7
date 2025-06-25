import Joi, { ValidationError, ObjectSchema } from "joi";

export type ValidationErrors = { [key: string]: string[] };

export abstract class BaseJoiDto {
  static schema: ObjectSchema<any>;

  static async validate<T extends object>(
    this: { schema: ObjectSchema<T> },
    dto: T
  ): Promise<ValidationErrors | null> {
    try {
      await this.schema.validateAsync(dto, { abortEarly: false });
      return null;
    } catch (error) {
      if (error instanceof ValidationError) {
        return error.details.reduce<ValidationErrors>((acc, detail) => {
          const key = detail.path.join('.');
          acc[key] = acc[key] || [];
          acc[key].push(detail.message);
          return acc;
        }, {});
      }
      throw error;
    }
  }

  static fromRequest<T extends BaseJoiDto>(
    this: new () => T,
    data: Partial<T>
  ): T {
    const instance = new this();
    Object.assign(instance, data);
    return instance;
  }
}
