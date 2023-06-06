interface IConfig {
  debug: boolean;
  include?: (name: string) => string;
}

let config: IConfig = {
  debug: false,
};

function defineConfig(cfg?: Partial<IConfig>) {
  config = { ...config, ...cfg };
}

export { config, defineConfig, IConfig };
