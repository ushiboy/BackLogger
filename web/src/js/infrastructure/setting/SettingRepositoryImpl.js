/* @flow */
import Setting from '../../domain/setting/Setting.js';
import type { SettingRepository } from '../../domain/setting/SettingRepository.js';

export default class SettingRepositoryImpl implements SettingRepository {

  get(): Setting {
    const spaceName = localStorage.getItem('Setting.spaceName') || '';
    const apiKey = localStorage.getItem('Setting.apiKey') || '';
    return new Setting(apiKey, spaceName);
  }

  store(s: Setting): void {
    localStorage.setItem('Setting.spaceName', s.spaceName);
    localStorage.setItem('Setting.apiKey', s.apiKey);
  }
}
