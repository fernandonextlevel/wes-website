//Angular
import { Component, ViewContainerRef, OnInit, ViewChild } from '@angular/core';
//Child Components
import { ContactComponent } from '../components/contact/contact';
import { ArticlesComponent } from '../components/articles/articles';
import { AdminComponent } from '../components/admin/admin';
import { HomeComponent } from '../components/home/home';
import { SoundcloudComponent } from '../components/soundcloud/soundcloud';
import { TwitchComponent } from '../components/twitch/twitch';
//Services
import { TemplateService } from '../providers/template-service/template-service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})

export class AppComponent {
	//Content Components
	public Contact = ContactComponent;
	public Articles = ArticlesComponent;
	public Admin = AdminComponent;
	public Home = HomeComponent;
	public Soundcloud = SoundcloudComponent;
	public Twitch = TwitchComponent;
	//Section Toggles
	public secToggles =
	{
		expandContact: false,
		expandArticles: false,
		expandAdmin: false,
		expandHome: false,
		expandSoundcloud: false,
		expandTwitch: false
	}
	//Read View Reference
	@ViewChild('content', {read: ViewContainerRef}) vCR?: ViewContainerRef

	constructor
	(
		public templateService: TemplateService
	)
	{

	}

	ngOnInit() {
		this.openSection('expandHome', this.Home);
		this.someAnimation()
	}

	collapseSections() {
		for (let key in this.secToggles) {
		    this.secToggles[key] = false
		}
		if (this.vCR) {
			this.templateService.setRootViewContainerRef(this.vCR)
		}
	}

	openSection(toggle, component) {
		if (!this.secToggles[toggle]) {
			this.collapseSections()
			this.secToggles[toggle] = true
			this.templateService.loadTemplate(component)
		}		
		else {
				
		}			
	}

	someAnimation() {
		let c = 45;
		function draw() {
			document.documentElement.style.setProperty("--direction", c++ + "deg");
			requestAnimationFrame(draw);
		}
		requestAnimationFrame(draw);
	}
}
