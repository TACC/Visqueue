import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GraphData } from 'src/app/models/explore/top10/graphdata';
import {  ResponseData } from 'src/app/models/explore/top10/responsedata';
import { Institution } from 'src/app/models/institution';

import * as d3Chrom from 'd3-scale-chromatic';

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
                x : changes.data.currentValue.institutions.map( ( a : Institution ) => a.institution ),
                y : changes.data.currentValue.institutions.map( ( a : Institution ) => a.count ),
                type : 'bar',
                marker : 
                {
                    color : [ ...d3Chrom.schemeTableau10 ]
                }
            }
        ];
    }

}
