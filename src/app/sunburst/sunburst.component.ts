import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import * as d3 from 'd3';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SunburstService } from '../sunburst.service';
import { SunburstDialogComponent } from '../sunburst-dialog/sunburst-dialog.component';
import { ColorService } from '../color.service';

interface ArcType { x0 : any, x1 : any, y0 : any, y1 : any }

@Component({
    selector: 'app-sunburst',
    templateUrl: './sunburst.component.html',
    styleUrls: ['./sunburst.component.scss'],
    standalone: false
})
export class SunburstComponent implements OnInit, AfterViewInit
{

    @Input() dataSrc        : string;
    @Input() heightCont     : string;

    @Input() showUpper      = false;
    @Input() showDialog     = false;

    @ViewChild('graphCont') graphCont : ElementRef;

    public fosCount    : number;
    public jobCount    : number;
    public utilization : number;

    private partition : any;
    private arc       : any;

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

    private formatNumbers = d3.format(',');
    private formatPercentage = d3.format('.0%');

    public timestamp : string;

    constructor(
            private router : Router,
            private route  : ActivatedRoute,
            private dialog : MatDialog,
            private sunburstService : SunburstService,
            private colorService : ColorService
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

        this.sunburstService.currentArc.subscribe( ( cell ) =>
        {

            if( this.root.data.name !== cell.system )
            {
                return;
            }

            if( cell.cellName === 'science' )
            {
                for (const iterator of this.root.children)
                {

                    if( iterator.data.name === cell.data.science )
                    {
                        this.clickHandler( iterator );
                        break;
                    }
                }
            }
            else
            {
                for( const iteratorI of this.root.children )
                {
                    for (const iteratorJ of iteratorI.children )
                    {
                        if( iteratorJ.data.name === cell.data.name )
                        {
                            this.clickHandler( iteratorJ );
                            break;
                        }
                    }

                }
            }
        });

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    }

    ngAfterViewInit(): void
    {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.


        if( this.route.snapshot.params.name )
        {
            this.dataSrc = this.route.snapshot.params.name;
        }


        this.sunburstService.getLiveData( this.dataSrc )
            .subscribe( data =>
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

        // calculate partition object of data
        this.root = this.partition( data );

        // set the current objects d variable a reference to itself
        this.root.each(d => d.current = d);

        // set the currentArc to be the root starting out
        this.currentArc = this.root;

        // set svg member variable to be the new svg object that is appended
        // to the HTML element based off the values passed in to the constructor
        // while also setting the viewbox
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

        this.circleText.selectAll('*').remove();

        this.circleText.append('tspan')
                       .attr( 'x', 0 )
                       .attr( 'y', '-0.75em')
                       .text('Select a color to explore');
        
        this.circleText.append('tspan')
                       .attr( 'x', 0 )
                       .attr( 'y', '0.75em')
                       .text('a field of science');


        this.fosCount    = this.root.children.length;
        this.jobCount    = this.root.copy().count().value;
        this.utilization = this.root.data.load;


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
                            
                            return this.colorService.getColorName( d.data.name );

                        })
                        .attr('fill-opacity', ( d ) =>  this.arcVisible( d.current ) ? 1 : 0 )
                        .attr('d', d => this.arc( d.current ) )
                        .attr('id', ( d ) =>
                        {
                            return this.dataSrc +  d.data.name;
                        });

        // set the cursor to be a pointer on those arcs that are visible
        // and apply clickHandler
        this.path.filter( d => d.children )
                    .style( 'cursor', 'pointer' )
                    .on('click', ( d ) => this.clickHandler( d ) );

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
     * @memberof Visqueue
     */
    clickHandler( p )
    {

        if( p.depth >= 2 )
        {

            if( this.showDialog )
            {
                this.openDialog( p );
            }

            if( this.currentArc.depth === 0 || this.currentArc !== p.parent )
            {
                p = p.parent;
            }
            else
            {
                return;
            }
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

            return +document.getElementById( this.dataSrc + d.data.name ).getAttribute( 'fill-opacity' ) || this.arcVisible( d.target );

        })
            .attr('fill-opacity', d => this.arcVisible( d.target ) ? 1 : 0)
            .attrTween('d', d => () => this.arc( d.current ) );

        this.circleText.selectAll('*').remove();
        
        if( p.depth > 0 )
        {
            // calculate where text should be placed if title is too long
            let titleText = this.calculateText( p.data.name );

            if( titleText.lower )
            {

                this.circleText.append('tspan')
                .attr('x', 0 )
                .attr('y', '-1.5em')
                .text( titleText.upper );
    
                this.circleText.append('tspan')
                .attr( 'x', 0 )
                .attr( 'y', '0em' )
                .text( titleText.lower );

                this.circleText.append('tspan')
                .attr( 'x', 0 )
                .attr( 'y', '1.5em' )
                .style('fill', '#282828')
                .style('font-size', '0.7em')
                .text( p.children.length + ' Projects | ' + p.copy().count().value + ' Jobs' );


            }

            else
            {
                this.circleText.append('tspan')
                .attr('x', 0 )
                .attr('y', '-1.5em')
                .text( titleText.upper );

                this.circleText.append('tspan')
                .attr( 'x', 0 )
                .attr( 'y', '0em' )
                .style('fill', '#282828')
                .style('font-size', '0.7em')
                .text( p.children.length + ' Projects | ' + p.copy().count().value + ' Jobs' );
            }
            
        }
        else
        {            
            
            this.circleText.append('tspan')
                .attr('x', 0 )
                .attr('y', '-0.75em')
                .text('Select a color to explore');
    
            this.circleText.append('tspan')
                .attr( 'x', 0 )
                .attr( 'y', '0.75em')
                .text('a field of science');

        }

        this.currentArc = p;

    }


    /**
     *
     * @function calculateText
     * @param text 
     * @description calculates if text should go inside the upper or middle tspan of the sunburst and returns resulting object
     * @memberof Visqueue
     */
    calculateText( text )
    {
        const result = { upper : '', lower : '' };

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
                    result.lower += ' ' + iterator;
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
     * @memberof Visqueue
     */
    arcVisible( d )
    {
        return ( d.y1 <= 2 ) && ( d.y0 >= 1 ) && ( d.x1 > d.x0 );
    }

    openDialog( p : any ) : void
    {


        
        this.dialog.open( SunburstDialogComponent, 
            {
                width : '50vw',
                data  : p.data
            });
    }
}