/* @flow */
import type { MakeIssueStatusAsProcessedCommand } from './MakeIssueStatusAsProcessedCommand.js';
import ChangeStatusService from '../../service/dashboard/ChangeStatusService.js';

export default class MakeIssueStatusAsProcessedCommandImpl implements MakeIssueStatusAsProcessedCommand {

  projectId: number;

  issueId: number;

  execute(): void {
    const service = new ChangeStatusService();
    service.makeStatusAsProcessed(this.projectId, this.issueId);
  }
}
