/* @flow */
import Event from './Event.js';

const IssueEvents = {
  loaded: new Event(),
  repositoryChanged: new Event()
};

export default IssueEvents;
