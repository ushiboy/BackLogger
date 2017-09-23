/* @flow */
import type { ApiKeyVerifier } from '../../domain/setting/ApiKeyVerifier.js';
import BackLogApiClient from '../.././infrastructure/api_client/BackLogApiClient.js';

export default class ApiKeyVerifierImpl implements ApiKeyVerifier {

  verify(spaceName: string, apiKey: string): Promise<boolean> {
    const client = new BackLogApiClient(spaceName, apiKey);
    return client.getMyself().then(() => true);
  }

}
