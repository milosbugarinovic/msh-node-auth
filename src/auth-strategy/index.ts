import { Request } from 'express'

export type AuthStrategyResult = {
  isValid: boolean
  sessionData?: object
}

export interface AuthStrategy {
  validate(req: Request): Promise<AuthStrategyResult>
}
