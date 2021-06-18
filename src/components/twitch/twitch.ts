//ANGULAR
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
//CALENDAR
import { Subject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
//FIREBASE
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
	selector: 'twitch',
	templateUrl: 'twitch.html',
	styleUrls: ['twitch.scss'],
	animations: [
	  trigger('AnimTrigger', [
	    transition('void => *', [
            style({ opacity: 0 }),
            animate(".5s ease-in", style({opacity: 1}))
	    ]),
	    transition('* => void', [
            style({ opacity: 1 }),
            animate(".5s ease-out", style({opacity: 0}))
	    ])
	  ])
  ]
})

export class TwitchComponent {

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  eventsList: any;

  events: Observable<any[]>;

  activeDayIsOpen: boolean = false;

  public Animate: any;
	
	constructor(private modal: NgbModal, public db: AngularFireDatabase) {
    this.eventsList = this.db.list('events').valueChanges();
    this.parseEvents();
  }

  ngOnInit() {

  }

  parseEvents () {
    this.eventsList.subscribe(events => {
      this.events = events.map(event => {
        return {
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          color: event.color,
          draggable: event.draggable,
          resizable: {
            beforeStart: false, 
            afterEnd: false
          }
        }
      });
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ event: Event }>): void {
    console.dir('Clicked');
  }
}
