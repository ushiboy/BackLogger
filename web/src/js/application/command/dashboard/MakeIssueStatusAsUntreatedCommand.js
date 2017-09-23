/* @flow */

export interface MakeIssueStatusAsUntreatedCommand {

  projectId: number;

  issueId: number;

  execute(): void;
}
