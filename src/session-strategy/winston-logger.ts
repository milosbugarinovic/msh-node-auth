import { Request } from 'express'
import { Logger } from 'winston'
import { SessionStrategy } from './index'

export class WinstonLogger implements SessionStrategy {
  private readonly __logger: Logger
  private readonly __sessionId: string
  constructor(logger: Logger, sessionId: string) {
    this.__logger = logger
    this.__sessionId = sessionId
  }

  public generateSessionData(_: Request): object {
    return {
      logger: this.__logger.child({ tags: { sessionId: this.__sessionId } }),
    }
  }
}
