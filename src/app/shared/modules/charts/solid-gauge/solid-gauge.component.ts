
import { Component, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-solid-gauge',
  templateUrl: './solid-gauge.component.html',
  styleUrls: ['./solid-gauge.component.scss']
})
export class SolidGaugeComponent implements AfterViewInit, OnChanges {
  @Input() title: string;
  @Input() min = 0;
  @Input() max: number;
  @Input() data: number[];
  @Input() dataLabelSymbol = '%';
  @Input() dataLabel: string;
  @Input() stops: any = [
    [0, '#55BF3B'], // green
    [0.5, '#DDDF0D'], // yellow
    [0.9, '#DF5353']
  ];

  chart: Chart;

  ngAfterViewInit() {
    setTimeout( () => {
      this.init();
    }, 200);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('data')) {
      this.updateSerie(changes.data.currentValue);
    }
  }

  init() {
    const chart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: '#26292e',
        style: {
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        },
        type: 'solidgauge'
      },

      credits: {
        enabled: false
      },

      title: {
        text: this.title,
        align: 'center',
        verticalAlign: 'top',
        style: {
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: '500'
        }
      },

      pane: {
        center: ['50%', '80%'],
        size: '160%',
        startAngle: -90,
        endAngle: 90,
        background: [{
          backgroundColor: '#1a1c21',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
          borderWidth: 0
        }]
      },

      exporting: {
        enabled: false
      },

      tooltip: {
        enabled: false
      },

      yAxis: {
        min: this.min,
        max: this.max,
        stops: this.stops,
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 0,
        labels: {
          enabled: false,
        }
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            borderWidth: 0,
            useHTML: true,
            style: {
              color: '#fff',
              fontWeight: '400'
            },
            y: 1
          }
        }
      },

      series: [{
        type: 'solidgauge',
        data: this.data,
        dataLabels: {
          format: `
            <div style="text-align:center; z-index:10;position:relative;top:10px">
            <div style="font-size:18px; margin-bottom:0.5rem;">{y}${this.dataLabelSymbol}</div>
            <div style="font-size:12px;">${this.dataLabel}</div>
            </div>
          `
        },
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 599
          },
        }]
      }
    });

    this.chart = chart;
  }

  private updateSerie(data) {
    setTimeout( () => {
      this.chart?.ref$.subscribe(chart => chart.update({
        series: [
          {
            type: 'solidgauge',
            name: 'Tipos',
            data
          },
        ]
      }));
    }, 200);
  }
}
