/* @flow */
import type { LoadIssuesCommand } from './LoadIssuesCommand.js';
import LoadIssuesService from '../../service/dashboard/LoadIssuesService.js';

export default class LoadIssuesCommandImpl implements LoadIssuesCommand {

  projectId: number;

  execute(): void {
    const service = new LoadIssuesService();
    service.execute(this);
  }
}
