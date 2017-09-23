/* @flow */
import type { ApiKeyVerifier } from '../../../domain/setting/ApiKeyVerifier.js';
import type { SettingRepository } from '../../../domain/setting/SettingRepository.js';
import type { SaveSettingCommand } from '../../command/setting/SaveSettingCommand.js';
import ApiKeyVerifierImpl from '../../../infrastructure/setting/ApiKeyVerifierImpl.js';
import SettingRepositoryImpl from '../../../infrastructure/setting/SettingRepositoryImpl.js';
import SettingEvents from '../../../domain/events/SettingEvents.js';

export default class SaveSettingService {

  settingRepository: SettingRepository;
  apiKeyVerifier: ApiKeyVerifier;

  constructor() {
    this.settingRepository = new SettingRepositoryImpl();
    this.apiKeyVerifier = new ApiKeyVerifierImpl();
  }

  execute(command: SaveSettingCommand): void {
    this.apiKeyVerifier.verify(command.spaceName, command.apiKey)
    .then((isOk) => {
      if (isOk) {
        this._save(command);
      } else {
        SettingEvents.apiKeyVerificationFailed.fire();
      }
    })
    .catch(() => {
      SettingEvents.apiKeyVerificationFailed.fire();
    });
  }

  _save(command: SaveSettingCommand): void {
    const setting = this.settingRepository.get();
    const newSetting = setting.setApiKey(command.apiKey).setSpaceName(command.spaceName);
    this.settingRepository.store(newSetting);
    SettingEvents.saved.fire();
  }

}
