import { EventEmitter } from 'node:events';
import { EVENTS } from '../utils/constants';

export const Emitter = new EventEmitter();

Emitter.once(EVENTS.READ_PRODUCTS, () => {
    console.log('Products file has been accessed for the first time.');
});
