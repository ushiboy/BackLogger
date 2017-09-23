/* @flow */

import type { IssueRepository } from '../../../domain/issue/IssueRepository.js';

export interface IssueQuery {

  issueRepository: IssueRepository;

  allOf(projectId: number): Array<any>;
}
