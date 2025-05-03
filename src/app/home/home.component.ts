import { Component } from '@angular/core';
import { DidYouKnowComponent } from '../did-you-know/did-you-know.component';
import { SiteInfoButtonComponent } from '../site-info-button/site-info-button.component';
import { StartButtonComponent } from '../start-button/start-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DidYouKnowComponent, SiteInfoButtonComponent, StartButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
