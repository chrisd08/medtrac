import * as pino from "pino";

export const createLogger = (): pino.Logger => {
  const loggingInstance = pino(
    { prettyPrint: { colorize: true } },
    process.stdout
  );

  const now = new Date().toLocaleString();
  loggingInstance.info(`Logging initialized at ${now}`);

  return loggingInstance;
};

export const logger = createLogger();
