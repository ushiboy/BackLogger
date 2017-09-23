/* @flow */

import type { IssueRepository } from '../../../domain/issue/IssueRepository.js';
import type { IssueQuery } from './IssueQuery.js';
import IssueRepositoryImpl from '../../../infrastructure/issue/IssueRepositoryImpl.js';
import { Untreated, Processed, Processing } from '../../../domain/issue/IssueStatus.js';

export default class IssueQueryImpl implements IssueQuery {

  issueRepository: IssueRepository;

  constructor() {
    this.issueRepository = new IssueRepositoryImpl();
  }

  allOf(projectId: number): Array<any> {
    return this.issueRepository.getAllOf(projectId).map(({ id, key, summary, status, synchronizing }) => ({
        id,
        key,
        summary,
        status: this._matchStatus(status),
        synchronizing
    }));
  }

  _matchStatus(status: any) {
    /**
     * FIXME 力及ばず
     */
    switch (status.id) {
      case Untreated.id:
        return 'untreated';
      case Processing.id:
        return 'processing';
      case Processed.id:
        return 'processed';
    }
  }
}
