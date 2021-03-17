import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GraphData } from 'src/app/models/explore/top10/graphdata';
import {  ResponseData } from 'src/app/models/explore/top10/responsedata';
import { Institution } from 'src/app/models/institution';

import * as d3Scale from 'd3-scale';
import * as d3Chrom from 'd3-scale-chromatic';
import { Project } from 'src/app/models/project';

@Component({
    selector: 'app-topten-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, OnChanges {

    @Input() data : ResponseData;
    @Input() selection : string;

    graphData : [ GraphData ];

    colorScale : d3Scale.ScaleSequential<string>;

    layout = 
    {
        autosize : true,
        title : ''
    };

    constructor() { }

    ngOnInit(): void 
    {
        this.selection = 'institution';
        this.layout.title = 'Top 10 Institutions';
    }

    ngOnChanges( changes : SimpleChanges )
    {
        if( changes.data )
        {
            if( changes.data.firstChange )
            {
                return;
            }

            else
            {
    
                let xValues : string[];
                let yValues : number[];

                if(this.selection === 'institution' )
                {
                    xValues = changes.data.currentValue.institutions.map( ( a : Institution ) => a.institution );
                    yValues = changes.data.currentValue.institutions.map( ( a : Institution ) => a.count );
                }
                else
                {
                    xValues = changes.data.currentValue.institutions.map( ( a : Project ) => a.name );
                    yValues = changes.data.currentValue.institutions.map( ( a : Project ) => a.count );
                }

                this.renderGraph( xValues, yValues );

            }
        }

        if( changes.selection && this.data )
        {

            console.log( this.data );

            if( changes.selection.currentValue === 'institution')
            {
                this.layout.title = 'Top Ten Institutions';
                
            }
            else
            {
                this.layout.title = 'Top Ten Projects';
            }
        }

    }

    renderGraph(xVals : string[], yVals : number[] )
    {
        let min = Math.min( ...yVals );
        let max = Math.max( ...yVals );

        this.colorScale = d3Scale.scaleSequential( [ min, max ], d3Chrom.interpolateViridis )

        this.graphData = [
            {
                x : xVals,
                y : yVals,
                type : 'bar',
                marker : 
                {
                    color : yVals.map( ( v : number ) => this.colorScale( v ) )
                }
            }
        ];
    }

}
