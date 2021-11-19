
import { Component, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

interface PieData {
  name: string;
  y: number;
}

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements AfterViewInit {
  @Input() title: string;
  @Input() data: PieData[];

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
        type: 'pie',
      },

      credits: {
        enabled: false
      },

      title: {
        text: this.title
      },

      exporting: {
        enabled: false
      },

      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },

      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      legend: {
        itemStyle: {
          color: '#e3e3e4',
          fontWeight: '400'
        }
      },

      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
          center: ['50%', '50%'],
          size: '115%',
          innerSize: '70%',
          colors: ['#febc2c', '#fd413c'],
          startAngle: 180,
          borderWidth: 0,
        },
      },

    });

    this.chart = chart;
  }

  private updateSerie(data) {
    setTimeout(() => {
      this.chart?.ref$.subscribe(chart => {
        if (chart.series.length > 0) {
          chart.series[0].update({
            type: 'pie',
            colorByPoint: true,
            data
          });
        } else {
          this.chart?.addSeries(
            {
              type: 'pie',
              colorByPoint: true,
              data
            }, true, true
          );
        }
      });
    }, 52);
  }

}
