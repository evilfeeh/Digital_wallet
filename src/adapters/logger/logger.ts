import { createLogger, format, transports, Logger as loggerClass } from 'winston'

export class Logger implements Ilogger {
  private readonly logger: loggerClass;
  constructor () {
    this.logger = createLogger({
      level: 'info',
      format: format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
      ],
    });
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new transports.Console({
        format: format.simple(),
      }));
    }
  }
  log (level: string, message: string, params: any) {
    this.logger.log({
      level,
      message
    })
  }
}
