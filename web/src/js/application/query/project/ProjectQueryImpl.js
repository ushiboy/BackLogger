/* @flow */
import type { ProjectQuery } from './ProjectQuery.js';
import type { ProjectRepository } from '../../../domain/project/ProjectRepository.js';
import ProjectRepositoryImpl from '../../../infrastructure/project/ProjectRepositoryImpl.js';

export default class ProjectQueryImpl implements ProjectQuery {

  projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepositoryImpl();
  }

  all(): Array<any> {
    return this.projectRepository.getAll().map(({ id, name, projectKey }) => ({
      id,
      name,
      key: projectKey
    }));
  }
}
