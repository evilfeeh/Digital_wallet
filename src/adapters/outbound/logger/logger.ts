import { createLogger, format, transports, Logger as loggerClass } from 'winston'
import { Ilogger } from './logger-interface'

export class Logger implements Ilogger {
  private readonly logger: loggerClass;
  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.json(),
      defaultMeta: { service: "user-service" },
      transports: [
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" }),
      ],
    });
  }
  log(level: string, message: string) {
    this.logger.log({
      level,
      message,
    });
  }
}
