/* @flow */

export interface ApiKeyVerifier {

  verify(spaceName: string, apiKey: string): Promise<boolean>;

}
