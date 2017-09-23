/* @flow */

export interface CloseIssueCommand {

    projectId: number;

    issueId: number;

    execute(): void;

}
