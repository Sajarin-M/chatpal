import EventEmitter from 'events';
import { TypeSafeEventEmitter } from 'typesafe-event-emitter';

export type AppEvents = {
  loggedIn: string;
};

const ee: TypeSafeEventEmitter<AppEvents> = new EventEmitter();
export default ee;
