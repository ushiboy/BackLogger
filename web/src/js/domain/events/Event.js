/* @flow */

export default class Event {

  subscriptions: Set<Subscription>;

  constructor() {
    this.subscriptions = new Set();
  }

  subscribe(f: Function): Subscription {
    const s = new Subscription(this, f);
    this.subscriptions.add(s);
    return s;
  }

  fire(): void {
    this.subscriptions.forEach(({ f }) => {
      f();
    });
  }

  unsubscribe(s: Subscription): void {
    this.subscriptions.delete(s);
  }

}

export class Subscription {

  dispacher: Event;
  f: Function;

  constructor(dispacher: Event, f: Function) {
    this.dispacher = dispacher;
    this.f = f;
  }

  unsubscribe(): void {
    this.dispacher.unsubscribe(this);
  }

}
