import {
  createLogger,
  format,
  transports,
  Logger as loggerClass,
} from "winston";

export class Logger {
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
