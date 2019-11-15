import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Job } from 'src/app/models/job';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges
{

    @Input() dataset : Job[];

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
      series: [{
        data: [1, 2, 3],
        type: 'column'
      }]
    };

    constructor() { }

    ngOnInit()
    {
        console.log( this.dataset );
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        console.log( this.dataset );
    }

}
