//ANGULAR
import { Component, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
	selector: 'soundcloud',
	templateUrl: 'soundcloud.html',
	styleUrls: ['soundcloud.scss'],
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

export class SoundcloudComponent {

	public Animate: any;
	
	constructor() {

	}

}
