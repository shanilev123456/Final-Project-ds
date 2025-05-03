// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  selectedCity = '';
  selectedNeighborhood = '';
  lotSize: number | null = null;
  result: string | null = null;

  cities: { [key: string]: string[] } = {
    "אופקים": ["הדרום", "המרכז", "נאות אופקים", "רמת חן"],
    "אשקלון": ["הרצוג","ברנע", "נאות אשקלון", "אגמים", "עיר ימים", "רמת אשכול"],
    "באר גנים": ["הרחבה", "מרכז"],
    "באר שבע": ["רמות", "שכונה ג", "שכונה ד", "שכונה ה", "שכונה ו", "נאות לון", "נווה נוי"],
    "גדרה": ["לב גדרה", "נאות גולן", "שכונת גולדה"],
    "גן יבנה": ["שכונת שרונית", "שכונת נווה אשכול", "שכונת הרקפות"],
    "חלץ": ["מרכז"],
    "יבנה": ["נווה אילן", "רמות ויצמן", "יבנה הירוקה"],
    "מיתר": ["מיתר הוותיקה", "מיתר החדשה"],
    "להבים": ["הרחבה חדשה", "הוותיקה"],
    "דימונה": ["שכונה א", "שכונה ג", "שכונת נווה עופר"],
    "ניצן": ["ניצן הוותיקה", "ניצן החדשה"],
    "נתיבות": ["רמות יורם", "נווה שרון", "שכונת ב"],
    "עומר": ["עומר הישנה", "הרחבה"],
    "קרית גת": ["שכונה א", "שכונת שער הדרום", "רמת דוד"],
    "קרית מלאכי": ["שכונת חב״ד", "נווה שלום", "מרכז העיר"],
    "שדרות": ["נאות הנביאים", "שכונת נווה אשכול", "שכונת המוזיקה"],
  };

  get cityNames(): string[] {
    return Object.keys(this.cities);
  }

  get neighborhoods(): string[] {
    return this.selectedCity ? this.cities[this.selectedCity] : [];
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.selectedCity && this.selectedNeighborhood && this.lotSize !== null) {
      const data = {
        city: this.selectedCity,
        neighborhood: this.selectedNeighborhood,
        lotSize: this.lotSize
      };
      console.log('נשלח למודל:', data);
      // תוצאה מדומה - בעתיד נחליף בקריאה לשרת
      this.result = `Estimated price: ₪${(this.lotSize * 1300).toLocaleString()}`;
    } else {
      this.result = 'All fields must be filled in!';
    }
  }
}
