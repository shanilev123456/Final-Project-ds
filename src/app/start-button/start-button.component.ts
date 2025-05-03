import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SiteInfoButtonComponent } from '../site-info-button/site-info-button.component';

@Component({
  selector: 'app-start-button',
  standalone: true,
  imports: [SiteInfoButtonComponent],
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.css']
})
export class StartButtonComponent {
  constructor(private router: Router) {}

  goToForm() {
    this.router.navigate(['/form']);
  }
}
