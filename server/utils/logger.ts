import pino from "pino";

const pinoConfig = {
  transport: {
    target: "pino-pretty",
  },
  level: "info",
  base: null,
};
const logger = pino(pinoConfig);

export default logger;
