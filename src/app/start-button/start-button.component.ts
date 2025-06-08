import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start-button',
  standalone: true,
  imports: [],
  templateUrl: './start-button.component.html',
  styleUrls: ['./start-button.component.css']
})
export class StartButtonComponent {
  constructor(private router: Router) {}

  goToForm() {
    this.router.navigate(['/form']);
  }
}
