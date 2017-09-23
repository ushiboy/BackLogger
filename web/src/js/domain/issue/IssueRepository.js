/* @flow */
import Issue from './Issue.js';

export interface IssueRepository {

  replaceAllOf(projectId: number, is: Issue[]): void;

  getAllOf(projectId: number): Issue[];

  get(projectId: number, issueId: number): Issue;

  store(projectId: number, issue: Issue): void;

  remove(projectId: number, issueId: number): void;

}
