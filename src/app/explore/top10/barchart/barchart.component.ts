import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GraphData } from 'src/app/models/explore/top10/graphdata';
import {  ResponseData } from 'src/app/models/explore/top10/responsedata';

@Component({
    selector: 'app-topten-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, OnChanges {

    @Input() data : ResponseData;

    graphData : [ GraphData ];

    layout = 
    {
        autosize : true,
        title: 'Top 10 Projects/Institutions'
    };

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges( changes : SimpleChanges )
    {
        if( changes.data.firstChange )
        {
            return;
        }

        this.graphData = [
            {
                x : changes.data.currentValue.institutions.map( a => a.institution ),
                y : changes.data.currentValue.institutions.map( a => a.count ),
                type : 'bar'
            }
        ];
    }

}
