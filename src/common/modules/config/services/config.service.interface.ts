export interface IConfig {
  [key: string]: string | Symbol | number | boolean | object | IConfig;
}

export interface IEnvConfig extends IConfig {
  [key: string]: string;
}

export interface IConfigRegistry {
  get(key: string): IConfig;
}

// TODO: remove sync methods cause it's runtime object changing w/o io
export interface IConfigService {
  getConfig(): IConfigRegistry;
  getConfigAsync(): Promise<IConfigRegistry>;

  index(): IConfig;
  set(key: string, value: any): void;
  setAsync(key: string, value: any): Promise<void>;
  get(key: string): any;
  getAsync(key: string): Promise<any>;

}
