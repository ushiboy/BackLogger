/* @flow */
import { Untreated, Processed, Processing } from '../../domain/issue/IssueStatus.js';
import NetworkEvents from '../../domain/events/NetworkEvents.js';

export default class BackLogApiClient {

  spaceName: string;
  apiKey: string;

  constructor(spaceName: string, apiKey: string) {
    this.spaceName = spaceName;
    this.apiKey = apiKey;
  }

  getMyself(): Promise<any> {
    return this._request('GET', `https://${this.spaceName}.backlog.com/api/v2/users/myself?apiKey=${this.apiKey}`);
  }

  getProjects(): Promise<Array<any>> {
    return this._request('GET', `https://${this.spaceName}.backlog.com/api/v2/projects?apiKey=${this.apiKey}`);
  }

  getIssuesOf(projectId: number, userId: number): Promise<Array<any>> {
    return this._request('GET', `https://${this.spaceName}.backlog.com/api/v2/issues?apiKey=${this.apiKey}` +
      `&projectId[]=${projectId}&assigneeId[]=${userId}` +
      `&statusId[]=${Untreated.id}&statusId[]=${Processing.id}&statusId[]=${Processed.id}`
    );
  }

  changeIssueStatusToUntreated(issueId: number): Promise<void> {
    return this._request('PATCH', `https://${this.spaceName}.backlog.com/api/v2/issues/${issueId}?apiKey=${this.apiKey}`,
      JSON.stringify({
        statusId: Untreated.id
      })
    )
      .then(res => {});
  }

  changeIssueStatusToProcessing(issueId: number): Promise<void> {
    return this._request('PATCH', `https://${this.spaceName}.backlog.com/api/v2/issues/${issueId}?apiKey=${this.apiKey}`,
      JSON.stringify({
        statusId: Processing.id
      })
    )
      .then(res => {});
  }

  changeIssueStatusToProcessed(issueId: number): Promise<void> {
    return this._request('PATCH', `https://${this.spaceName}.backlog.com/api/v2/issues/${issueId}?apiKey=${this.apiKey}`,
      JSON.stringify({
        statusId: Processed.id
      })
    )
      .then(res => {});
  }

  closeIssue(issueId: number): Promise<void> {
    return this._request('PATCH', `https://${this.spaceName}.backlog.com/api/v2/issues/${issueId}?apiKey=${this.apiKey}`, JSON.stringify({
      statusId: 4
    }))
      .then(res => {});
  }

  _request(method: string, url: string, body: ?string = undefined): Promise<any> {
    /**
     * FIXME fetchで手抜き
     */
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body
    })
      .then(res => {
        if (res.status >= 200 && res.status < 400) {
          return res.json();
        }
        return Promise.reject();
      })
      .catch(() => {
        NetworkEvents.requestFailed.fire();
        return Promise.reject();
      });
  }

}
