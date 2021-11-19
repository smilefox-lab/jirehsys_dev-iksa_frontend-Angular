import { Component, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements AfterViewInit, OnChanges {
  @Input() title: string;
  @Input() series: object[];

  chart: Chart;

  ngAfterViewInit() {
    setTimeout( () => {
      this.init();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('series')) {
      this.updateSerie(changes.series.currentValue);
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
        type: 'line',
      },

      credits: {
        enabled: false
      },

      title: {
        text: this.title,
      },

      xAxis: {
        title: {
          text: 'Meses'
        },
        lineColor: '#666666',
        gridLineColor: '#666666',
        gridLineWidth: 1
      },

      yAxis: {
        title: {
          text: null
        },
        gridLineColor: '#666666'
      },

      legend: {
        itemStyle: {
          color: '#e3e3e4',
          fontWeight: '400'
        },
        align: 'left',
        verticalAlign: 'top',
      },
    });

    this.chart = chart;
  }

  private updateSerie(series) {
    setTimeout(() => {
      this.chart?.ref$.subscribe(chart => {
        if (chart.series.length > 0) {
          series?.forEach((serie, i) => {
            const { type, color, name, data } = serie;
            chart.series[i].update({
              type,
              color,
              name,
              data
            });
          });
        } else {
          series?.forEach(serie => {
            const { type, color, name, data } = serie;
            chart.addSeries({
                type,
                color,
                name,
                data
              },
              true,
              true
            );
          });
        }
      });
    }, 1500);
  }
}
