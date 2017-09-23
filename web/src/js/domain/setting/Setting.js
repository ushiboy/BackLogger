/* @flow */

/**
 * case classって何？(；´Д｀)
 */

export default class Setting {

  _apiKey: string
  _spaceName: string

  get apiKey(): string {
    return this._apiKey;
  }

  get spaceName(): string {
    return this._spaceName;
  }

  constructor(apiKey:string, spaceName: string) {
    this._apiKey = apiKey;
    this._spaceName = spaceName;
  }

  setApiKey(apiKey: string): Setting {
    return new Setting(apiKey, this.spaceName);
  }

  setSpaceName(spaceName: string): Setting {
    return new Setting(this.apiKey, spaceName);
  }
}
