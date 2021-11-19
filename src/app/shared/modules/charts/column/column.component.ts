import { Component, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements AfterViewInit, OnChanges {
  @Input() title: string;
  @Input() data: object[];

  chart: Chart;

  ngAfterViewInit() {
    setTimeout( () => {
      this.init();
    }, 50);
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
        backgroundColor: '#26292E',
        style: {
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        },
        type: 'column',
      },

      credits: {
        enabled: false
      },

      title: {
        text: null,
      },

      accessibility: {
        announceNewData: {
            enabled: true
        }
      },

      xAxis: {
        type: 'category',
        labels: {
          autoRotation: [0],
          style: {
            color: '#e3e3e4',
          }
        },
        lineColor: '#666666',


      },

      yAxis: {
        title: {
          text: null
        },
        gridLineColor: '#666666'
      },

      legend: {
        enabled: false,
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> del total<br/>'
      },

      plotOptions: {
        column: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}',
            style: {
              color: '#e3e3e4',
              textOutline: 'none'
            }
          },
          colors: ['#febc2c', '#fd413c'],
          maxPointWidth: 40
        },
      },
    });

    this.chart = chart;
  }

  private updateSerie(data) {
    setTimeout(() => {
      if (this.chart?.ref?.series?.length > 0) {
        this.chart?.removeSeries(this.chart.ref.series.length - 1);
      }
      this.chart?.addSeries(
        {
          type: 'column',
          name: 'Tipos',
          colorByPoint: true,
          data
        }, true, true
      );
    }, 150);
  }
}
