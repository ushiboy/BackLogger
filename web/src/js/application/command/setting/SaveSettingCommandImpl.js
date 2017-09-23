/* @flow */
import type { SaveSettingCommand } from './SaveSettingCommand.js';
import SaveSettingService from '../../service/setting/SaveSettingService.js';

export default class SaveSettingCommandImpl implements SaveSettingCommand {

  spaceName: string;
  apiKey: string;

  constructor() {
    this.spaceName = '';
    this.apiKey = '';
  }

  execute(): void {
    const service = new SaveSettingService();
    service.execute(this);
  }
}
