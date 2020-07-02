import { Request } from 'express'
import { verify as jwtVerify } from 'jsonwebtoken'
import { JwtDataStrategy } from '../jwt-data-strategy'
import { Simple as SimpleJWT } from '../jwt-data-strategy/simple'
import { tokenUtility } from '../token-utility'
import { AuthStrategy, AuthStrategyResult } from './index'

export class JsonWebToken implements AuthStrategy {
  private readonly __publicAuthKey: string
  private readonly __jwtDataStrategy: JwtDataStrategy

  constructor(publicAuthKey: string, jwtDataStrategy: JwtDataStrategy = new SimpleJWT()) {
    this.__publicAuthKey = publicAuthKey
    this.__jwtDataStrategy = jwtDataStrategy
  }

  public validate(req: Request): Promise<AuthStrategyResult> {
    const authToken = tokenUtility.clean(req.headers.authorization || '')

    return new Promise((resolve, _) => {
      jwtVerify(authToken, this.__publicAuthKey, (err: any, decryptedData: any) => {
        if (err) return resolve({ isValid: false })
        return resolve({
          isValid: true,
          sessionData: this.__jwtDataStrategy.dataToSessionData(decryptedData),
        })
      })
    })
  }
}
