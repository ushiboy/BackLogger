/* @flow */
import InitializeDashboardService from '../../service/dashboard/InitializeDashboardService.js';

export default class InitializeDashboardCommand {

  execute(): void {
    const service = new InitializeDashboardService();
    service.execute(this);
  }

}
