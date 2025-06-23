import { ValidationError } from 'joi';

export interface IBaseJoiDto {
  validate?(): Promise<{ [key: string]: string } | null>;
}

export abstract class BaseJoiDto implements IBaseJoiDto {
  static schema: any;

  static async validate<T extends object>(dto: T): Promise<{ [key: string]: string[] } | null> {
    try {
      await (this as any).schema.validateAsync(dto, { abortEarly: false });
      return null;
    } catch (error) {
      if (error instanceof ValidationError) {
        return error.details.reduce((acc: { [key: string]: string[] }, detail) => {
          const key = detail.path.join('.');
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(detail.message);
          return acc;
        }, {});
      }
      throw error;
    }
  }

  static fromRequest<T extends BaseJoiDto>(this: new () => T, data: object): T {
    const instance = new this();
    Object.assign(instance, data);
    return instance;
  }

  async validate?(): Promise<{ [key: string]: string } | null> {
    return null;
  }
}
