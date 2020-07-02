import { Request } from 'express'

export interface SessionStrategy {
  generateSessionData(req: Request): object
}
