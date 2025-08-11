// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InteractiveMapComponent } from '../interactive-map/interactive-map.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule,InteractiveMapComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  selectedCity = '';
  selectedNeighborhood = '';
  lotSize: number | null = null;
  result: string | null = null;

  cities: { [key: string]: string[] } = {
  "זכרון יעקב": ["מורדות הבאר"],
  "קרית גת": ["כרמי גת", "רובע הבנים", "כרמי גת נכים", "שכ' מערבית", "מתחם 01", "מערבית"],
  "משמר דוד": ["נכים"],
  "תל מונד": [],
  "כוכב יאיר": ["נכים"],
  "שדרות": ["שכונת צפון מרכז", "שכונת המוסיקה", "יתרות בשכונות ותיקות", "שכונת האחוזה", "שדרות בפארק מתחם 9", "בוסתנים", "הבוסתנים"],
  "קציר": [],
  "חרב לאת": ["חרב לאת"],
  "אלמה": [],
  "מרכז שפירא": ["מרכז שפירא", "מגרש 162"],
  "בית שמש": ["השחר", "רמת בית שמש ג3"],
  "אום אל פחם": [],
  "לוד": ["נווה שלום", "אחיסמך"],
  "מיתר": ["כלניות", "כלניות נכים", "כרמית", "יישוב כרמית"],
  "חדרה": ["בית אליעזר", "הפארק", "נכים"],
  "חולדה": ["נכים"],
  "מעלה עירון": ["מושרפה", "שכונת הפרחים"],
  "באר שבע": ["כלניות", "רמות", "נווה נוי", "נאות לון", "כלניות לנכים", "הרקפות", "רקפות"],
  "באר גנים": ["נכים"],
  "עין שריד": [],
  "כפר יונה": ["נכים"],
  "שלומי": ["יערית"],
  "תלמי יחיאל": [],
  "אשקלון": ["הרצוג", "הרצוג נכים"],
  "פרדסיה": [],
  "להבים": ["שרונית"],
  "תל אביב יפו": ["בצרה"],
  "מאור": ["מושב מאור"],
  "נס ציונה": ["נכים"],
  "חיפה": [],
  "עפולה": ["מורדות עפולה הצעירה"],
  "עומר": ["עמר נכים", "עומר"],
  "נתיבות": ["שערי העיר", "נווה שרון", "רמות מאיר", "רמות יורם", "מעלות הנחל"],
  "ניצן": [],
  "מיסר": [],
  "ראש העין": [],
  "קרית מלאכי": ["נאות הכפר"],
  "מתן": [],
  "ראשון לציון": ["שיכון המזרח", "נחלת יהודה התיכונה", "נחלת יהודה התיכונה נכים"],
  "בסמת טבעון": ["מעלה בשמת", "מעלה בסמת", "גבעת קושט", "אל נחיל"],
  "קרית עקרון": [],
  "גאולי תימן": [],
  "צור הדסה": [],
  "סביון": [],
  "רחובות": ["קריית משה", "קרית משה - נכים", "כפר גבירול"],
  "יבנה": ["נכים", "רמות וייצמן", "רמות ויצמן"],
  "נוף הגליל": ["נכים"],
  "רוחה": ["מושב רווחה"],
  "אבו גוש": ["נכים", "אבו גוש"],
  "חיבת ציון": [],
  "כפר הורדים": [],
  "קרית אתא": ["אלונים נכים", "אלונים"],
  "שהם": ["כרמים", "נכים"],
  "כפר ברא": ["כפר ברא מושע"],
  "רמלה": ["מצליח", "השופטים", "עמישב"],
  "בקוע": [],
  "כפר קאסם": [],
  "משמרות": [],
  "קדימה צורן": [],
  "בארותים": [],
  "צופית": [],
  "ירחיב": [],
  "ירושלים": ["עיר דוד"],
  "באקה אל גרביה": [],
  "נוה ים": ["נכים", "נווה ים"],
  "פרדיס": [],
  "גבעתי": ["מועצה אזורית באר טוביה"],
  "מנחמיה": [],
  "עתלית": ["משולש עין הכרמל", "עין כרמל"],
  "יד חנה": [],
  "צפריה": [],
  "מצפה רמון": ["צפון מערב", "הגמל"],
  "ערד": ["רננים", "נופים"],
  "אופקים": ["חורשת נח", "רמת שקד", "הפארק"],
  "זמר": ["איבתאן"],
  "פתח תקוה": ["בלינסון"],
  "גדרה": [],
  "בחן": [],
  "בת חפר": ["בת חפר"],
  "רעננה": ["שיכון רסקו"],
  "אדרת": [],
  "תנובות": [],
  "חרות": [],
  "אלישמע": [],
  "אבן יהודה": [],
  "בית עוזיאל": ["מושב"],
  "בית חרות": [],
  "תמרת": [],
  "בנימינה-ג.עדה": [],
  "קרית טבעון": ["שערי טבעון", "בצל אורנים"],
  "דאלית אל כרמל (עיר הכרמל)": ["דלית אל כרמל"],
  "חולון": ["מושא"],
  "שריגים(לי און": [],
  "שריגים(לי און , מועצה אזורית מטה יהודה": [],
  "נוה ימין": [],
  "מבוא מודיעים": ["מבוא מודיעים"],
  "שער אפרים": ["שער אפרים"],
  "כפר סבא": ["קפלן"],
  "גת במשולש": [],
  "זהר": ["מועצה אזורית לכיש", "תחום המועצה האזורית לכיש"],
  "אחזם": ["מועצה אזורית לכיש"],
  "נופית (פי נר)": ["פינר"],
  "האון": ["חיילי מילואים"],
  "אבן ספיר": [],
  "אליכין": ["אתרוגים", "האתרוגים"],
  "לפיד": ["לפיד"],
  "גן יבנה": ["גן יבנה"],
}


    constructor(private http: HttpClient) {}

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
        city_name: this.selectedCity,
        neighborhood_name: this.selectedNeighborhood,
        area: this.lotSize
      };

      this.result = 'calculate...';

      this.http.post<any>('http://127.0.0.1:5000/predict', data).subscribe({
        next: (response) => {
          if (response && response.prediction_shekel !== undefined) {
            const totalPrice = response.prediction_shekel *(this.lotSize as number);
            this.result = `Estimated total price: ₪${totalPrice.toLocaleString()}`;
          } else {
            this.result = 'All fields must be filled in!';
          }
        },
        error: (err) => {
          console.error('error:', err);
          this.result = 'An error occurred';
          console.log("send to the server:",  this.selectedCity, this.lotSize, this.neighborhoods);

        }
      });
    } else {
      this.result = 'All fields must be filled in!';
    }
  }
}


