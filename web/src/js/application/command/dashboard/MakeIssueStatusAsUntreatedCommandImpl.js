/* @flow */
import type { MakeIssueStatusAsUntreatedCommand } from './MakeIssueStatusAsUntreatedCommand.js';
import ChangeStatusService from '../../service/dashboard/ChangeStatusService.js';

export default class MakeIssueStatusAsUntreatedCommandImpl implements MakeIssueStatusAsUntreatedCommand {

  projectId: number;

  issueId: number;

  execute(): void {
    const service = new ChangeStatusService();
    service.makeStatusAsUntreated(this.projectId, this.issueId);
  }
}
