/* @flow */
import type { MakeIssueStatusAsProcessingCommand } from './MakeIssueStatusAsProcessingCommand.js';
import ChangeStatusService from '../../service/dashboard/ChangeStatusService.js';

export default class MakeIssueStatusAsProcessingCommandImpl implements MakeIssueStatusAsProcessingCommand {

  projectId: number;

  issueId: number;

  execute(): void {
    const service = new ChangeStatusService();
    service.makeStatusAsProcessing(this.projectId, this.issueId);
  }
}
