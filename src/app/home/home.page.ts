import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('lineChart') canvas:ElementRef;
  public context: CanvasRenderingContext2D;

  chartLine = [];
  
  options = {    
    legend: {
      display: false,
    },
    element: {
      point: {
        radius: 0,
        hitRadius: 5,
        hoverRadius: 5
      }
    },
    scales: {
      yAxes: [{
        display: false,
        ticks: {
          fontColor: 'rgba(0,0,0,.6)',
          fontStyle: 'bold',
          beginAtZero: true,
          maxTicksLimit: 8,
          padding: 10
        },
        gridLines: {
          drawTicks: true,
          drawBorder: true,
          display: false,
          color: 'rgba(0,0,0,.1)',
          // zeroLineColor: 'transparent'
        }

      }],
      xAxes: [{
        display: false,
        gridLines: {
          // zeroLineColor: 'transparent',
          display: false,

        },
        ticks: {
          padding: 0,
          fontColor: 'rgba(0,0,0,0.6)',
          fontStyle: 'bold'
        }
      }]
    },
    responsive: true
  };

  ngOnInit() {
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    let gradientThisWeek = this.context.createLinearGradient(0, 0, 0, 150);
    gradientThisWeek.addColorStop(0, '#ffbdc8');
    gradientThisWeek.addColorStop(1, '#ffffff');

    // Gradient color - previous week
    let gradientPrevWeek = this.context.createLinearGradient(0, 0, 0, 150);
    gradientPrevWeek.addColorStop(0, '#fae5d5');
    gradientPrevWeek.addColorStop(1, '#ffffff');
    
    let multiply = {
      beforeDatasetsDraw: function (chart, options, el) {
        chart.ctx.globalCompositeOperation = 'multiply';
      },
      afterDatasetsDraw: function (chart, options) {
        chart.ctx.globalCompositeOperation = 'source-over';
      },
    };

    let data = {
      labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      datasets: [
        {
          label: 'This week',
          data: [10, 40, 20, 50, 30, 60, 40],
          backgroundColor: gradientThisWeek,
          borderColor: '#E77B8C',
          borderWidth: 2,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          lineTension: 0.40,
        },
        {
          label: 'Previous week',
          data: [40, 10, 50, 20, 60, 30, 40,],
          backgroundColor: gradientPrevWeek,
          borderColor: '#FAD1B0',
          borderWidth: 2,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          lineTension: 0.40,
        }
      ]
    };
    this.chartLine = new Chart('chart-line', {
      type: 'line',
      data: data,
      options: this.options,
      plugins: [multiply]
    });
  }

}
