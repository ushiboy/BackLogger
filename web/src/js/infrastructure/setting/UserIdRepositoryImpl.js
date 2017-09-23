/* @flow */
import type { UserIdRepository } from '../../domain/setting/UserIdRepository.js';

export default class UserIdRepositoryImpl implements UserIdRepository {

  static state: number;

  get(): number {
    return UserIdRepositoryImpl.state;
  }

  store(id: number): void {
    UserIdRepositoryImpl.state = id;
  }

}

UserIdRepositoryImpl.state = 0;
