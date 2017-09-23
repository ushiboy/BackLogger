/* @flow */

import type { ProjectRepository } from '../../../domain/project/ProjectRepository.js';


export interface ProjectQuery {

  projectRepository: ProjectRepository;

  all(): Array<any>;
}
