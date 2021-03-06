import { Component, OnInit, ViewChild } from '@angular/core';
import { EventApiService } from 'app/shared/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalComponent } from 'app/shared/modal/modal.component';
import { Event } from 'app/shared/api';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'csc-admin-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    public events: FirebaseListObservable<Event[]>;
    public checkedEvents: Event[] = [];
    public editableEvent: Event;

    constructor(private _api: EventApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.events = this._api.getEvents();
    }

    public resetCheckedEvents(): void {
        this.checkedEvents = [];
    }

    public checked(mouseEvent: MouseEvent, event: Event) {
        const checkbox: HTMLInputElement = <HTMLInputElement>mouseEvent.target;
        if (checkbox.checked) {
            this.checkedEvents.push(event);
        } else {
            const eventIndex = this.checkedEvents.indexOf(event);
            this.checkedEvents.splice(eventIndex, 1);
        }
    }

    public getRemoveButtonText(): string {
        const base = `Remove ${this.checkedEvents.length} event`;
        if (this.checkedEvents.length === 0) {
            return 'No events selected';
        } else if (this.checkedEvents.length === 1) {
            return base;
        } else {
            return base + 's';
        }
    }
}
