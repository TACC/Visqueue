import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as d3 from 'd3';

interface ArcType { x0 : any, x1 : any, y0 : any, y1 : any }

@Component({
    selector: 'app-sunburst',
    templateUrl: './sunburst.component.html',
    styleUrls: ['./sunburst.component.scss']
})
export class SunburstComponent implements OnInit, AfterViewInit
{

    private partition : any;
    private arc       : any;

    private color : d3.ScaleOrdinal<string, string>;

    private height     = 700;
    private heightCont = '60vh';
    private viewboxWidth  : number;
    private viewboxHeight : number;

    private svg  : any;
    private g    : any;
    private path : any;

    private radius : number;

    private root : any;
    private currentArc : any;

    constructor() { }

    ngOnInit()
    {

        // set the HTML SVG Viewbox width and height
        this.viewboxWidth  = this.height * 9 / 13;
        this.viewboxHeight = this.height * 9 / 13;

        this.radius = this.height / 6;

        // creates a new arc generator for generating sectors of the sunburst chart
        this.arc = d3.arc<ArcType>()
            .startAngle(    d => d.x0 )
            .endAngle(      d => d.x1   )
            .padAngle( d => 0.01 )
            .padRadius(     this.radius * 1.5   )
            .innerRadius(   d => ( d.y0 * this.radius ) + 50  )
            .outerRadius(   d => Math.max( ( d.y0 * this.radius ) + 50, d.y1 * this.radius - 1 ));
    }

    ngAfterViewInit(): void 
    {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.

        d3.json( 'assets/stampede2.json' )
        .then( data =>
        {

            // create partition function to create hierarchical data object
            this.partition = inputData =>
            {
                // construct a root node from the data passed in hierachical format
                // and sort by size
                const tmpRoot = d3.hierarchy( inputData )
                               .sum( d => d.size )
                               .sort( ( a, b ) => b.value - a.value );

                // create partition object of calculated arc angles for each arc
                // of the sunburst
                return d3.partition()
                         .size( [ 2 * Math.PI, tmpRoot.height + 1 ] )
                         ( tmpRoot );
            }

            // set color scheme to use for sunburst
            this.color =  d3.scaleOrdinal( d3.schemeSet2 );

            // calculate partition object of data
            this.root = this.partition( data );

            // set the current objects d variable a reference to itself
            this.root.each(d => d.current = d);

            // set the currentArc to be the root starting out
            this.currentArc = this.root;

            // set svg member variable to be the new svg object that is appended
            // to the HTML element based off the values passed in to the constructor
            // while also setting the viewbox
            this.svg = d3.select('div#stampede2')
                          .append('svg')
                          .attr('height', this.heightCont )
                          .attr('width', '100%')
                          .attr('viewBox', '0,0,' + this.viewboxWidth + ',' + this.viewboxHeight );

                          // create container HTML element and translate view of graph to be centered
            // with the width and height of the viewbox
            this.g = this.svg.append('g')
                         .attr('transform', `translate(${ this.viewboxWidth / 2},${ this.viewboxHeight / 2})`);

            // render the sunburst usind the data from the root object and
            // choose to only render those arcs that are one level below
            // the root
            this.path = this.g.append('g')
                          .attr('id', 'paths')
                          .selectAll('path')
                          .data(this.root.descendants().slice( 1 ) )
                          .join('path')
                            .attr('fill', d =>
                            {

                                while( d.depth > 1 )
                                {
                                    d = d.parent;
                                }

                                return this.color( d.data.name );

                            })
                            .attr('fill-opacity', ( d ) =>  this.arcVisible( d.current ) ? 1 : 0 )
                            .attr('d', d => this.arc( d.current ) )
                            .attr('id', ( d ) =>
                            {
                                return d.data.name;
                            });
        });

    }

    /**
     *
     * @function arcVisible
     * @param {object} d - single arc object
     * @returns boolean
     * @description calculates if an arc is visible or not and returns true or false
     * @memberof SCWAT
     */
    arcVisible( d )
    {
        return ( d.y1 <= 2 ) && ( d.y0 >= 1 ) && ( d.x1 > d.x0 );
    }

}
