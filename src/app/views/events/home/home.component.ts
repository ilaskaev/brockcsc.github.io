import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from 'app/shared/api';
import { EventDataService } from 'app/views/events/event-data.service';
import { EventContainer } from '../eventContainer';

@Component({
    selector: 'csc-events-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class EventsHomeComponent implements OnInit, OnDestroy {
    public upcomingEvents: EventContainer;
    public pastEvents: EventContainer;

    constructor(private _eventDataService: EventDataService) {
        this.upcomingEvents = new EventContainer();
    }

    public ngOnInit(): void {
        this.upcomingEvents = this._eventDataService.getUpcomingEvents();
        if (this.pastEventsLoaded()) {
            this.pastEvents = this._eventDataService.getPastEvents();
        }
    }

    public loadPastEvents(): void {
        this.pastEvents = this._eventDataService.getPastEvents();
    }

    public pastEventsLoaded(): boolean {
        return this._eventDataService.pastEventsLoaded();
    }

    public selectEvent(event: Event): void {
        this._eventDataService.setEvent(event);
    }

    public ngOnDestroy(): void {
        this.upcomingEvents.subscription.unsubscribe();
        if (this.pastEvents !== undefined) {
            this.pastEvents.subscription.unsubscribe();
        }
    }
}
