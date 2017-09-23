/* @flow */

export interface UserIdRepository {

  get(): number;

  store(id: number): void;

}
