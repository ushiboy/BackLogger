/* @flow */
import type { ProjectRepository } from '../../domain/project/ProjectRepository.js';
import Project from '../../domain/project/Project.js';

export default class ProjectRepositoryImpl implements ProjectRepository {

  static state: Project[];

  replaceAll(ps: Project[]): void {
    ProjectRepositoryImpl.state = ps;
  }

  getAll(): Project[] {
    return ProjectRepositoryImpl.state;
  }

}

ProjectRepositoryImpl.state = [];
