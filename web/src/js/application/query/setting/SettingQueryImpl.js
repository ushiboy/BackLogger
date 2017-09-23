/* @flow */
import type { SettingQuery } from './SettingQuery.js';
import type { SettingRepository } from '../../../domain/setting/SettingRepository.js';
import SettingRepositoryImpl from '../../../infrastructure/setting/SettingRepositoryImpl.js';

export default class SettingQueryImpl implements SettingQuery {

  settingRepository: SettingRepository;

  constructor() {
    this.settingRepository = new SettingRepositoryImpl();
  }

  apiKey(): string {
    return this.settingRepository.get().apiKey;
  }

  spaceName(): string {
    return this.settingRepository.get().spaceName;
  }
}
