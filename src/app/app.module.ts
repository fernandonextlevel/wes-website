//Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseenv } from '../environments/firebase';
//Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
//Main Component
import { AppComponent } from './app.component';	
//Child Components
import { ContactComponent } from '../components/contact/contact';
import { ArticlesComponent } from '../components/articles/articles';
import { AdminComponent } from '../components/admin/admin';
import { HomeComponent } from '../components/home/home';
import { SoundcloudComponent } from '../components/soundcloud/soundcloud';
import { TwitchComponent } from '../components/twitch/twitch';
//Services
import { TemplateService } from '../providers/template-service/template-service';
import { AuthService } from '../providers/auth-service/auth-service';

@NgModule({
	declarations: [
		AppComponent,
		ContactComponent,
		AdminComponent,
		HomeComponent,
		SoundcloudComponent,
		TwitchComponent,
		ArticlesComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		NgbModalModule,
		CalendarModule.forRoot({
		  provide: DateAdapter,
		  useFactory: adapterFactory
		}),
		AngularFireModule.initializeApp(firebaseenv.firebase),
		AngularFireDatabaseModule,
		AngularFireAuthModule
	],
	entryComponents: [
		AppComponent,
		ContactComponent,
		ArticlesComponent,
		AdminComponent,
		HomeComponent,
		SoundcloudComponent,
		TwitchComponent
	],  
	providers: [
		AuthService,
		TemplateService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }






