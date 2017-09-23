/* @flow */

export default class Project {

  _id: number
  _name: string
  _projectKey: string

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get projectKey(): string {
    return this._projectKey;
  }

  constructor(id:number, name: string, projectKey: string) {
    this._id = id;
    this._name = name;
    this._projectKey = projectKey;
  }

}
