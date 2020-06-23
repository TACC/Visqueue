import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-time-series-graph',
    templateUrl: './time-series-graph.component.html',
    styleUrls: ['./time-series-graph.component.scss']
})
export class TimeSeriesGraphComponent implements OnInit {

    public graph = {
        data: [
            { x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'], y: [2, 6, 3], type: 'scatter', mode: 'lines+points'},
            { x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'], y: [5, 8, 4], type: 'scatter', mode: 'lines+points'},
        ],
        layout: { title: 'A Fancy Plot' }
    };
    constructor() { }

    ngOnInit(): void {
    }

}
