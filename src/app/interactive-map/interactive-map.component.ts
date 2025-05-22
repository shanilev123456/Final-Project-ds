import { Component, AfterViewInit, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements AfterViewInit, OnChanges {
  @Input() city: string = '';
  @Input() neighborhood: string = '';

  private map!: L.Map;
  private markersLayer = L.layerGroup();

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([31.7683, 35.2137], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);

    setTimeout(() => this.map.invalidateSize(), 300); // חיוני לתיקון טעינה
  }

  ngOnChanges(): void {
    if (this.city && this.neighborhood && this.map) {
      this.showLocation(this.city, this.neighborhood);
    }
  }

  private async showLocation(city: string, neighborhood: string) {
  this.markersLayer.clearLayers();

  const fullAddress = `${neighborhood}, ${city}, Israel`;
  const coordinates = await this.geocode(fullAddress);
  if (!coordinates) return;

  const marker = L.marker(coordinates).bindPopup(`<b>${neighborhood}</b><br>${city}`).openPopup();
  this.markersLayer.addLayer(marker);
  this.map.setView(coordinates, 14);

  // ✅ תוספת שמוודאת שהמפה תתעדכן לגמרי בתוך המסגרת
  setTimeout(() => this.map.invalidateSize(), 0);
}

  private async geocode(address: string): Promise<[number, number] | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.length) return null;
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    
  }
}
