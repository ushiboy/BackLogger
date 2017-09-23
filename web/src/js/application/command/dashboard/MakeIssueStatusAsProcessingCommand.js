/* @flow */

export interface MakeIssueStatusAsProcessingCommand {
    
    projectId: number;
    
    issueId: number;

    execute(): void;

}