/* @flow */

/**
 * ここめっちゃFlow頼みな感じになった
 */


export interface IssueStatus {
  // read-only
  +id: number;
}

export const Untreated: IssueStatus = {
  id: 1
};
export const Processing: IssueStatus = {
  id: 2
};
export const Processed: IssueStatus = {
  id: 3
};
