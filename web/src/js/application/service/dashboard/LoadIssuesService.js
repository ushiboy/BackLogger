/* @flow */
import type { SettingRepository } from '../../../domain/setting/SettingRepository.js';
import type { LoadIssuesCommand } from '../../command/dashboard/LoadIssuesCommand.js';
import type { UserIdRepository } from '../../../domain/setting/UserIdRepository.js';
import type { IssueRepository } from '../../../domain/issue/IssueRepository.js';
import Issue from '../../../domain/issue/Issue.js';
import { Untreated, Processed, Processing } from '../../../domain/issue/IssueStatus.js';
import IssueEvents from '../../../domain/events/IssueEvents.js';
import SettingRepositoryImpl from '../../../infrastructure/setting/SettingRepositoryImpl.js';
import UserIdRepositoryImpl from '../../../infrastructure/setting/UserIdRepositoryImpl.js';
import IssueRepositoryImpl from '../../../infrastructure/issue/IssueRepositoryImpl.js';
import BackLogApiClient from '../../../infrastructure/api_client/BackLogApiClient.js';

export default class LoadIssuesService {

  settingRepository: SettingRepository;
  userIdRepository: UserIdRepository;
  issueRepository: IssueRepository;

  get _client(): BackLogApiClient {
    const setting = this.settingRepository.get();
    return new BackLogApiClient(setting.spaceName, setting.apiKey);
  }

  constructor() {
    this.settingRepository = new SettingRepositoryImpl();
    this.userIdRepository = new UserIdRepositoryImpl();
    this.issueRepository = new IssueRepositoryImpl();
  }

  execute(command: LoadIssuesCommand): void {
    if (command.projectId != null) {
      this._loadIssues(command.projectId);
    }
  }

  _loadIssues(projectId: number): void {
    const userId = this.userIdRepository.get();
    this._client.getIssuesOf(projectId, userId).then(json => {
      const issues = json.map(this._jsonToIssue);
      this.issueRepository.replaceAllOf(projectId, issues);
      IssueEvents.loaded.fire();
    });
  }

  _jsonToIssue(json: any): Issue {
    let status;
    switch (json.status.id) {
      case 1:
        status = Untreated;
        break;
      case 2:
        status = Processing;
        break;
      case 3:
        status = Processed;
        break;
      default:
        /**
         * FIXME flowに怒られるので苦肉の策
         * ありえないのでエラーにしてしまおう
         */
        throw new Error('つらい');
    }
    return new Issue(json.id, json.issueKey, json.summary, status);
  }

}
