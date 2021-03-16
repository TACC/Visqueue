import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GraphData } from 'src/app/models/explore/top10/graphdata';
import {  ResponseData } from 'src/app/models/explore/top10/responsedata';
import { Institution } from 'src/app/models/institution';

import * as d3Scale from 'd3-scale';
import * as d3Chrom from 'd3-scale-chromatic';

@Component({
    selector: 'app-topten-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, OnChanges {

    @Input() data : ResponseData;

    graphData : [ GraphData ];

    colorScale : d3Scale.ScaleSequential<string>;

    layout = 
    {
        autosize : true,
        title: 'Top 10 Projects/Institutions'
    };

    constructor() { }

    ngOnInit(): void 
    {
    }

    ngOnChanges( changes : SimpleChanges )
    {
        if( changes.data.firstChange )
        {
            return;
        }

        let xValues = changes.data.currentValue.institutions.map( ( a : Institution ) => a.institution );
        let yValues = changes.data.currentValue.institutions.map( ( a : Institution ) => a.count );

        let min = Math.min( ...yValues );
        let max = Math.max( ...yValues );

        this.colorScale = d3Scale.scaleSequential( [ min, max ], d3Chrom.interpolateViridis )

        this.graphData = [
            {
                x : xValues,
                y : yValues,
                type : 'bar',
                marker : 
                {
                    color : yValues.map( ( v : number ) => this.colorScale( v ) )
                }
            }
        ];
    }

}
