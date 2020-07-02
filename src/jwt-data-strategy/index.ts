export interface JwtDataStrategy {
  dataToSessionData(decryptedData: any): any
}
