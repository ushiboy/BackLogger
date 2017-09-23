/* @flow */
import Setting from './Setting.js'

/**
 * Unitって何？(；´Д｀)
 */

export interface SettingRepository {

  store(s: Setting): void;
  get(): Setting;
}
