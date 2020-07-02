import { JwtDataStrategy } from './index'

export class Simple implements JwtDataStrategy {
  public dataToSessionData(data: any): any {
    return {
      ...(data.id && { id: data.id }),
      ...(data.name && { name: data.name }),
      ...(data.exp && { exp: data.exp }),
      ...(data.iat && { iat: data.iat }),
    }
  }
}
