import { Request } from 'express'
import { urlUtility } from '../url-utility'
import { AuthStrategy, AuthStrategyResult } from './index'

export class AllowedPaths implements AuthStrategy {
  private readonly __allowedPaths: string[]
  constructor(allowedPaths: string[]) {
    this.__allowedPaths = allowedPaths
  }
  public validate(req: Request): Promise<AuthStrategyResult> {
    const isValid = this.__allowedPaths.includes(urlUtility.getWebPath(req.url))
    return Promise.resolve({ isValid })
  }
}
