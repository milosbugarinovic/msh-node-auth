import { Request } from 'express'
import { get } from 'lodash'
import { urlUtility } from '../url-utility'
import { AuthStrategy, AuthStrategyResult } from './index'

type AllowedTokenType = {
  urls?: string[]
  token: string
  tokenLocation: string
}

export class AllowedTokens implements AuthStrategy {
  private readonly __allowedTokens: AllowedTokenType[]

  constructor(allowedTokens: AllowedTokenType[]) {
    this.__allowedTokens = allowedTokens
  }

  public validate(req: Request): Promise<AuthStrategyResult> {
    for (const at of this.__allowedTokens) {
      if (at.urls && at.urls.filter(Boolean).length > 0) {
        if (!at.urls.includes(urlUtility.getWebPath(req.url))) continue
        if (at.token === get(req, at.tokenLocation)) return Promise.resolve({ isValid: true })
      }
    }
    return Promise.resolve({ isValid: false })
  }
}
