import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-info-button',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './site-info-button.component.html',
  styleUrls: ['./site-info-button.component.css']
})
export class SiteInfoButtonComponent {
  showInfo = false;

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }
}
