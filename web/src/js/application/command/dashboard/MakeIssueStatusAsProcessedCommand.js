/* @flow */

export interface MakeIssueStatusAsProcessedCommand {

    projectId: number;

    issueId: number;

    execute(): void;

}
