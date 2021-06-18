import { Component, OnInit } from '@angular/core';
//FIREBASE
import { Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import auth from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent implements OnInit {

  refresh: Subject<any> = new Subject();
  events$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  public ID: any;
  public user: Observable<firebase.User>;
  public userInfo: any;
  public authState: any = null;

  constructor(public db: AngularFireDatabase, private auth: AngularFireAuth) {
    this.events$ = db.list('/events').snapshotChanges()

    this.auth.authState.subscribe((auth) => {
      this.authState = auth
    });    
  }

  ngOnInit() {
    
  }

  login() {
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(auth => {
      if(auth) {
        let email = auth.user.email
        if (email === 'wessek@outlook.com') {
          this.userInfo = true;
        }
        else {
          this.userInfo = false;
        }
      }
    });
  }
  logout() {
    this.auth.auth.signOut();
  }

  addEvent(): void {
    let eventID = Math.floor(Math.random() * (99999 - 10000) + 10000)
    let newEvent = this.db.object('events/' + eventID)
    let now = new Date()
    let format = now.toISOString().replace("Z","")
    newEvent.set({
      title: 'New event',
      color: 'red',
      draggable: false,
      start: format,
      end: format,
      resizable: {
        beforeStart: false,
        afterEnd: false
      }
    })
    this.refresh.next();
  }

  updateEvent(key: string, title, start, end, color) {
    let itemRef = this.db.object('events/' + key)
    itemRef.update({title: title, start: start, end: end, color: color})
  }

  delEvent(key) {
    let itemRef = this.db.object('events/' + key)
    itemRef.remove()
  }
}
