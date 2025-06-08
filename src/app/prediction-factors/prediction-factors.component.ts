import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-prediction-factors',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './prediction-factors.component.html',
  styleUrls: ['./prediction-factors.component.css']
})
export class PredictionFactorsComponent {
  pieChartType: ChartType = 'pie';

  shortLabels = [
    'Deals',
    'Region',
    'Years',
    'Sea',
    'Transit',
    'Shops',
    'Schools',
    'Size',
    'Units'
  ];

  tooltipsMap: Record<string, string> = {
    Deals: 'Past real-estate transactions',
    Region: 'Geographical location in Israel',
    Years: 'Years of data used for training',
    Sea: 'Proximity to the sea',
    Transit: 'Proximity to public transport',
    Shops: 'Proximity to commercial centers',
    Schools: 'Access to schools and kindergartens',
    Size: 'Lot size in square meters',
    Units: 'Nearby housing unit density'
  };

  pieChartData: ChartData<'pie'> = {
    labels: this.shortLabels,
    datasets: [
      {
        data: Array(9).fill(1),
        backgroundColor: [
          '#eb8825', '#f4a261', '#e76f51', '#2a9d8f', '#264653',
          '#8ecae6', '#219ebc', '#ffb703', '#fb8500'
        ]
      }
    ]
  };

  pieChartOptions: any = {
  responsive: true,
  plugins: {
    legend: { display: false },
    datalabels: {
      color: '#fff',
      font: { weight: 'bold' },
      formatter: (value: any, context: any) =>
        context.chart.data.labels?.[context.dataIndex] || ''
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          const label = ctx.label || '';
          const explanation = this.tooltipsMap[label as keyof typeof this.tooltipsMap];
          return explanation || label;
        }
      }
    }
  }
};


  public pieChartPlugins = [ChartDataLabels];
}
