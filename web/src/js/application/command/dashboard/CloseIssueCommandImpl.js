/* @flow */
import type { CloseIssueCommand } from './CloseIssueCommand.js';
import CloseIssueService from '../../service/dashboard/CloseIssueService.js';

export default class CloseIssueCommandImpl implements CloseIssueCommand {

  projectId: number;

  issueId: number;

  execute(): void {
    const service = new CloseIssueService();
    service.close(this.projectId, this.issueId);
  }
}
