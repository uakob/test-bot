// export interface IValidationSchemas {

// } // TODO: implement or not

export interface IValidationService {
  validate<T>(input: T, schema: Object): Promise<T>;
}
