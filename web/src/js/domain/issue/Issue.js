/* @flow */
import type { IssueStatus } from './IssueStatus.js';
import { Untreated, Processed, Processing } from './IssueStatus.js';


export default class Issue {

  _id: number
  _key: string
  _summary: string
  _status: IssueStatus
  _synchronizing: boolean

  get id(): number {
    return this._id;
  }

  get key(): string {
    return this._key;
  }

  get summary(): string {
    return this._summary;
  }

  get status(): IssueStatus {
    return this._status;
  }

  get synchronizing(): boolean {
    return this._synchronizing;
  }

  constructor(id: number, key: string, summary: string, status: IssueStatus, synchronizing: boolean = false) {
    this._id = id;
    this._key = key;
    this._summary = summary;
    this._status = status;
    this._synchronizing = synchronizing;
  }

  makeStatusUntreatedAndSync(): Issue {
    return new Issue(this.id, this.key, this.summary, Untreated, true);
  }

  makeStatusProcessingAndSync(): Issue {
    return new Issue(this.id, this.key, this.summary, Processing, true);
  }

  makeStatusProcessedAndSync(): Issue {
    return new Issue(this.id, this.key, this.summary, Processed, true);
  }

  startSynchronizing(): Issue {
    return new Issue(this.id, this.key, this.summary, this.status, true);
  }

  commitSynchronizing(): Issue {
    return new Issue(this.id, this.key, this.summary, this.status, false);
  }

}
