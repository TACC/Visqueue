import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import * as d3 from 'd3';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface ArcType { x0 : any, x1 : any, y0 : any, y1 : any }

@Component({
    selector: 'app-sunburst',
    templateUrl: './sunburst.component.html',
    styleUrls: ['./sunburst.component.scss']
})
export class SunburstComponent implements OnInit, AfterViewInit
{

    @Input() dataSrc        : string;
    @Input() heightCont     : string;

    @Input() showDialog     = false;

    @ViewChild('graphCont', { static : false } ) graphCont : ElementRef;

    private partition : any;
    private arc       : any;

    private color : d3.ScaleOrdinal<string, string>;

    private height     = 700;
    private viewboxWidth  : number;
    private viewboxHeight : number;

    private svg  : any;
    private g    : any;
    private path : any;

    private radius : number;

    private root       : any;
    private currentArc : any;
    private parent     : any;

    private circleText : any;
    private lowerText  : any;
    private bottomText : any;
    private floorText  : any;
    private upperText  : any;
    private topText    : any;

    private imageCenter : any;

    private formatNumbers = d3.format(',');
    private formatPercentage = d3.format('.0%');

    public timestamp : string;

    constructor(
            private route  : ActivatedRoute,
            private dialog : MatDialog
        ) { }

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

        if( this.route.snapshot.params.name )
        {
            this.dataSrc = this.route.snapshot.params.name;
        }

        d3.json( 'assets/datasets/' + this.dataSrc + '.json' )
        .then( data =>
        {
            this.render( data );
        });

    }
 
    render( data : any )
    {
        this.timestamp = data.timestamp;

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
        };

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
        // this.svg = d3.select( '#' + this.id + ' div.graphContainer')
        this.svg = d3.select( this.graphCont.nativeElement )
                        .append( 'svg' )
                        .attr('height', this.heightCont )
                        .attr('width', '100%')
                        .attr('viewBox', '0,0,' + this.viewboxWidth + ',' + this.viewboxHeight );

                        // create container HTML element and translate view of graph to be centered
        // with the width and height of the viewbox
        this.g = this.svg.append('g')
                        .attr('transform', `translate(${ this.viewboxWidth / 2},${ this.viewboxHeight / 2})`);

        // create a container to write text in the middle of the sunburst
        this.circleText = this.g.append('g')
                                    .attr('id', 'circle_text')
                                    .append('text')
                                    .style('text-anchor', 'middle')
                                    .style('fill', '#767f84')
                                    .style('font-size', '1.2em');


        // add a tspan element to write text in the lower part of the sunburst
        this.lowerText = this.circleText.append('tspan')
                                .attr('x', 0)
                                .attr('y', '4em')
                                .attr('id', 'lower');

        this.bottomText = this.circleText.append('tspan')
                                .attr('x', 0)
                                .attr('y', '5.5em')
                                .attr('id', 'bottom');

        this.floorText  = this.circleText.append('tspan')
                                .attr('x', 0)
                                .attr('y', '7em')
                                .attr('id', 'bottom');

        // add a tspan element to write text in the upper part of the sunburst
        this.upperText = this.circleText.append('tspan')
                                .attr('x', 0)
                                .attr('y', '2.5em')
                                .attr('id', 'upper')
                                .attr('font-weight', 'bold');


        // add a tspan element to write text in the middle of the sunburst
        this.topText = this.circleText.append('tspan')
                                .attr('x', 0)
                                .attr('y', '1em')
                                .attr('id', 'middle')
                                .attr('font-weight', 'bold');

        this.lowerText.text( this.formatNumbers( this.root.children.length ) + ' fields of science' );

        this.bottomText.text( this.formatNumbers( this.root.copy().count().value ) + ' jobs' );

        this.floorText.text( this.formatPercentage( this.root.data.load ) );

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

        // set the cursor to be a pointer on those arcs that are visible
        // and apply clickHandler
        this.path.filter( d => d.children )
                    .style( 'cursor', 'pointer' )
                    .on('click', ( d ) => this.clickHandler( d ) );

        this.imageCenter = this.g.append('svg:image')
                                .attr('xlink:href', `../assets/images/${this.dataSrc}.png`)
                                .attr('transform', `translate(-${ this.viewboxWidth / 4},-${ this.viewboxHeight / 3 })`)
                                .attr('height', '250' )
                                .attr('width', '250'  );

        // set the current parent object to equal the current node
        // that is the root of the sunburst
        this.parent = this.g.append('circle')
                            .datum( this.root )
                            .attr('r', this.radius + 50 )
                            .attr('fill', 'none')
                            .attr('pointer-events', 'all')
                            .on('click', ( d ) => this.clickHandler( d ) );
    }

    /**
     *
     * @function clickHandler
     * @param  p         - single arc that was selected
     * @param  thisRef   - reference to current class
     * @description function to handle when an arc has been clicked
     * @memberof SCWAT
     */
    clickHandler( p )
    {

        if( p.depth >= 2 )
        {

            if( this.showDialog )
            {
                this.openDialog( p );
            }

            return;
        }
        // if the current arc has a parent set the parent object to it,
        // otherwise we have selected to root of the data with no parent
        // so set the root to itself
        this.parent.datum( p.parent || this.root );

        // calculate the new target locations for each arc
        this.root.each(d => d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
        });

        // set the transition from the current layout to the new layout given
        // a certain amount of time that has passed
        const t = this.g.transition().duration( 1250 );

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        this.path.transition( t )
            .tween('data', d =>
            {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
            })
        .filter( ( d ) =>
        {
            return +document.getElementById( d.data.name ).getAttribute( 'fill-opacity' ) || this.arcVisible( d.target );
        })
            .attr('fill-opacity', d => this.arcVisible( d.target ) ? 1 : 0)
            .attrTween('d', d => () => this.arc( d.current ) );

        let titleText = { upper : '', middle : '' };

        if( p.depth > 0 )
        {
            // calculate where text should be placed if title is too long
            titleText = this.calculateText( p.data.name );

            // transition the lower text of the inside of the arc to the new lower text
            this.floorText.transition()
                .duration( 750 )
                .style('opacity', 0)
                .transition()
                .duration( 750 )
                .style('opacity', 1)
                .text( );

        }
        else
        {
            // transition the lower text of the inside of the arc to the new lower text
            this.floorText.transition()
                .duration( 750 )
                .style('opacity', 0)
                .transition()
                .duration( 750 )
                .style('opacity', 1)
                .text( this.formatPercentage( this.root.data.load ) );
        }

        // transition the middle text of the inside of the arc to the new middle text
        this.topText.transition()
                       .duration( 750 )
                       .style('opacity', 0)
                       .transition()
                       .duration(750)
                       .style('opacity', 1)
                       .text( titleText.upper );

        // transition the upper text of the inside of the arc to the new upper text
        this.upperText.transition()
                       .duration( 750 )
                       .style('opacity', 0)
                       .transition()
                       .duration( 750 )
                       .style('opacity', 1)
                       .text( titleText.middle );



        const lowerTextString = this.formatNumbers( p.children.length );

        // transition the lower text of the inside of the arc to the new lower text
        this.lowerText.transition()
                       .duration( 750 )
                       .style('opacity', 0)
                       .transition()
                       .duration( 750 )
                       .style('opacity', 1)
                       .text( lowerTextString + ( p.depth == 0 ? ' fields of science' : ' projects' ) );

        // transition the lower text of the inside of the arc to the new lower text
        this.bottomText.transition()
                       .duration( 750 )
                       .style('opacity', 0)
                       .transition()
                       .duration( 750 )
                       .style('opacity', 1)
                       .text( this.formatNumbers( p.copy().count().value ) + ' jobs' );

        this.currentArc = p;

    }


    /**
     *
     * @function calculateText
     * @param text 
     * @description calculates if text should go inside the upper or middle tspan of the sunburst and returns resulting object
     * @memberof SCWAT
     */
    calculateText( text )
    {
        const result = { upper : '', middle : '' };

        if( text.length < 25 )
        {
            result.upper = text;
        }
        else
        {
            const words = text.split(' ');

            for (const iterator of words)
            {
                const newUpperSize = iterator.length + result.upper.length + 1;

                if( result.upper.length >= 25 || newUpperSize >= 25 )
                {
                    result.middle += ' ' + iterator;
                }
                else
                {
                    result.upper += ' ' + iterator;
                }

            }

        }

        return result;
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

    openDialog( p : any ) : void
    {

        const dialogRef = this.dialog.open( SunburstDialog,
            {
                width : '50vw',
                data  : p
            });
    }
}

@Component({
    selector: 'app-sunburst-dialog',
    templateUrl: './sunburst-dialog.html'
})
export class SunburstDialog
{
    constructor(
        public dialogRef : MatDialogRef<SunburstDialog>,
        @Inject(MAT_DIALOG_DATA) public data : any ) {}

    onNoClick() : void 
    {
        this.dialogRef.close();
    }
}