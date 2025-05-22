import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent} from './header/header.component';
import { DidYouKnowComponent } from './did-you-know/did-you-know.component';
import { SiteInfoButtonComponent } from './site-info-button/site-info-button.component';
import { StartButtonComponent } from './start-button/start-button.component';
import { CommonModule } from '@angular/common';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, HeaderComponent,StartButtonComponent,SiteInfoButtonComponent,DidYouKnowComponent,InteractiveMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  constructor(private router: Router) {}

  get isHomePage(): boolean {
    return this.router.url === '/';
  }
  
}
