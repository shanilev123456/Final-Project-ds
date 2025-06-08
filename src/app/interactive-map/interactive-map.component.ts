import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnChanges {
  @Input() city: string = '';
  @Input() neighborhood: string = '';

  center: google.maps.LatLngLiteral = { lat: 31.7683, lng: 35.2137 };
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral = this.center;
  apiKey = 'AIzaSyBUZQRM15TvWf7r2eC03QMfwOpylf5EHbc';
  showMarker = false;

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (this.city && this.neighborhood) {
      const fullAddress = `${this.neighborhood}, ${this.city}, Israel`;
      this.geocodeAddress(fullAddress);
    }
  }

  private geocodeAddress(address: string): void {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    this.http.get<any>(url).subscribe(res => {
      const result = res.results?.[0];
      if (result) {
        const location = result.geometry.location;
        this.center = { lat: location.lat, lng: location.lng };
        this.markerPosition = { lat: location.lat, lng: location.lng };
        this.showMarker = true;
      } else {
        console.warn('⚠️ לא נמצאה כתובת מתאימה');
        this.showMarker = false;
      }
    });
  }
}
