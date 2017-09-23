/* @flow */

import type { SettingRepository } from '../../../domain/setting/SettingRepository.js';


export interface SettingQuery {

  settingRepository: SettingRepository;

  apiKey(): string;

  spaceName(): string;
}
