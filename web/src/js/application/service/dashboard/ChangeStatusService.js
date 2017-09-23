/* @flow */
import type { SettingRepository } from '../../../domain/setting/SettingRepository.js';
import type { IssueRepository } from '../../../domain/issue/IssueRepository.js';
import SettingRepositoryImpl from '../../../infrastructure/setting/SettingRepositoryImpl.js';
import IssueRepositoryImpl from '../../../infrastructure/issue/IssueRepositoryImpl.js';
import BackLogApiClient from '../../../infrastructure/api_client/BackLogApiClient.js';
import IssueEvents from '../../../domain/events/IssueEvents.js';

export default class ChangeStatusService {

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

  makeStatusAsUntreated(projectId: number, issueId: number): void {
    const oldIssue = this.issueRepository.get(projectId, issueId);
    if (oldIssue.synchronizing) {
      return;
    }

    const issue = oldIssue.makeStatusUntreatedAndSync();
    this.issueRepository.store(projectId, issue);
    IssueEvents.repositoryChanged.fire();

    this._client.changeIssueStatusToUntreated(issueId)
    .then(() => {
      this.issueRepository.store(projectId, issue.commitSynchronizing());
      IssueEvents.repositoryChanged.fire();
    })
    .catch(() => {
      this.issueRepository.store(projectId, oldIssue);
      IssueEvents.repositoryChanged.fire();
    });
  }

  makeStatusAsProcessing(projectId: number, issueId: number): void {
    const oldIssue = this.issueRepository.get(projectId, issueId);
    if (oldIssue.synchronizing) {
      return;
    }

    const issue = oldIssue.makeStatusProcessingAndSync();
    this.issueRepository.store(projectId, issue);
    IssueEvents.repositoryChanged.fire();

    this._client.changeIssueStatusToProcessing(issueId)
    .then(() => {
      this.issueRepository.store(projectId, issue.commitSynchronizing());
      IssueEvents.repositoryChanged.fire();
    })
    .catch(() => {
      this.issueRepository.store(projectId, oldIssue);
      IssueEvents.repositoryChanged.fire();
    });
  }

  makeStatusAsProcessed(projectId: number, issueId: number): void {
    const oldIssue = this.issueRepository.get(projectId, issueId);
    if (oldIssue.synchronizing) {
      return;
    }

    const issue = oldIssue.makeStatusProcessedAndSync();
    this.issueRepository.store(projectId, issue);
    IssueEvents.repositoryChanged.fire();

    this._client.changeIssueStatusToProcessed(issueId)
    .then(() => {
      this.issueRepository.store(projectId, issue.commitSynchronizing());
      IssueEvents.repositoryChanged.fire();
    })
    .catch(() => {
      this.issueRepository.store(projectId, oldIssue);
      IssueEvents.repositoryChanged.fire();
    });
  }

}
