import { Request } from 'express'
import { tokenUtility } from '../token-utility'
import { AuthStrategy, AuthStrategyResult } from './index'

export class AuthorizationToken implements AuthStrategy {
  private readonly __authorizedTokens: string[]
  private readonly __authHeaderName: string
  constructor(authorizedTokens: string[], authHeaderName = 'authorization') {
    this.__authorizedTokens = authorizedTokens
    this.__authHeaderName = authHeaderName
  }
  public validate(req: Request): Promise<AuthStrategyResult> {
    const authToken = tokenUtility.clean((req.headers[this.__authHeaderName] as string) || '')
    const isValid = this.__authorizedTokens.includes(authToken)
    return Promise.resolve({ isValid })
  }
}
