import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-site-info-button',
  standalone: true,
  imports: [CommonModule,RouterModule], 
  templateUrl: './site-info-button.component.html',
  styleUrls: ['./site-info-button.component.css']
})
export class SiteInfoButtonComponent {
 
}
