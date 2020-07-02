import { Request } from 'express'
import { v4 as uuid } from 'uuid'
import { SessionStrategy } from './index'

export class TrackingId implements SessionStrategy {
  public generateSessionData(req: Request): object {
    const trackingId = (req.headers.trackingId || uuid()).toString()
    return { trackingId }
  }
}
