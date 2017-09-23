/* @flow */
import type { SettingRepository } from '../../../domain/setting/SettingRepository.js';
import type { UserIdRepository } from '../../../domain/setting/UserIdRepository.js';
import type { ProjectRepository } from '../../../domain/project/ProjectRepository.js';
import Project from '../../../domain/project/Project.js';
import InitializeDashboardCommand from '../../command/dashboard/InitializeDashboardCommand.js';
import SettingRepositoryImpl from '../../../infrastructure/setting/SettingRepositoryImpl.js';
import UserIdRepositoryImpl from '../../../infrastructure/setting/UserIdRepositoryImpl.js';
import ProjectRepositoryImpl from '../../../infrastructure/project/ProjectRepositoryImpl.js';
import BackLogApiClient from '../../../infrastructure/api_client/BackLogApiClient.js';
import DashboardEvents from '../../../domain/events/DashboardEvents.js';

export default class InitializeDashboardService {

  settingRepository: SettingRepository;
  projectRepository: ProjectRepository;
  userIdRepository: UserIdRepository;

  get _client(): BackLogApiClient {
    const setting = this.settingRepository.get();
    return new BackLogApiClient(setting.spaceName, setting.apiKey);
  }

  constructor() {
    this.settingRepository = new SettingRepositoryImpl();
    this.projectRepository = new ProjectRepositoryImpl();
    this.userIdRepository = new UserIdRepositoryImpl();
  }

  execute(command: InitializeDashboardCommand): void {
    Promise.all([
      this._loadUserId(),
      this._loadProjects()
    ]).then(() => {
      DashboardEvents.initialized.fire();
    });
  }

  _loadUserId(): Promise<void> {
    return this._client.getMyself().then(json => {
      this.userIdRepository.store(json.id);
    });
  }

  _loadProjects(): Promise<void> {
    return this._client.getProjects().then(json => {
      const projects = json.map(({ id, name, projectKey }) => new Project(id, name, projectKey));
      this.projectRepository.replaceAll(projects);
    });
  }

}
