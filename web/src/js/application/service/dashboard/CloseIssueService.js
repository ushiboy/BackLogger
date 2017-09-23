/* @flow */
import type { SettingRepository } from '../../../domain/setting/SettingRepository.js';
import type { IssueRepository } from '../../../domain/issue/IssueRepository.js';
import SettingRepositoryImpl from '../../../infrastructure/setting/SettingRepositoryImpl.js';
import IssueRepositoryImpl from '../../../infrastructure/issue/IssueRepositoryImpl.js';
import BackLogApiClient from '../../../infrastructure/api_client/BackLogApiClient.js';
import IssueEvents from '../../../domain/events/IssueEvents.js';

export default class CloseIssueService {

  settingRepository: SettingRepository;
  issueRepository: IssueRepository;

  get _client(): BackLogApiClient {
    const setting = this.settingRepository.get();
    return new BackLogApiClient(setting.spaceName, setting.apiKey);
  }

  constructor() {
    this.settingRepository = new SettingRepositoryImpl();
    this.issueRepository = new IssueRepositoryImpl();
  }

  close(projectId: number, issueId: number): void {
    const oldIssue = this.issueRepository.get(projectId, issueId);
    if (oldIssue.synchronizing) {
      return;
    }

    const issue = oldIssue.startSynchronizing();
    this.issueRepository.store(projectId, issue);
    IssueEvents.repositoryChanged.fire();

    this._client.closeIssue(issueId)
    .then(() => {
      this.issueRepository.remove(projectId, issueId);
      IssueEvents.repositoryChanged.fire();
    })
    .catch(() => {
      this.issueRepository.store(projectId, oldIssue);
      IssueEvents.repositoryChanged.fire();
    });
  }

}
