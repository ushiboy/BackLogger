/* @flow */

export interface SaveSettingCommand {

  spaceName: string;
  apiKey: string;

  execute(): void;
}
