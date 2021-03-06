import { Subscription } from 'rxjs/Subscription';
import { Event } from 'app/shared/api';

export class EventContainer {
    events: Event[];
    loaded: boolean;
    subscription: Subscription;

    constructor() {
        this.events = [];
        this.loaded = false;
        this.subscription = null;
    }
}
