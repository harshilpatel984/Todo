import { createLogger, format, transports } from "winston";
import { appConfig } from "./app.config";

export const logger = createLogger({
  level: appConfig.logLevel,
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    format.align(),
    format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console()
  ]

});

export default logger;