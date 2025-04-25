import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Job } from 'src/app/models/job';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    standalone: false
})
export class BarChartComponent implements OnInit, OnChanges
{

    @Input() dataset : Job[];

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
