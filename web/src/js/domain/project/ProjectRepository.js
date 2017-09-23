/* @flow */
import Project from './Project.js';

export interface ProjectRepository {

  replaceAll(ps: Project[]): void;

  getAll(): Project[];
}
