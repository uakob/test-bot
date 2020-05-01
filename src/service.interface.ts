export interface IService<T> {
  index?(): Promise<T[]>;
  get?(key: string): Promise<T>;
  init?(): Promise<void | boolean>;
}

// TODO: DELETE
