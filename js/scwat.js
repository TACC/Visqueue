/*
* ==========================================================================
* Copyright (c) 2017-2019 The University of Texas at Austin.
* All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the 'License');
* you may not use this file except in compliance with the License.
* A copy of the License is included with this software in the file LICENSE.
* If your copy does not contain the License, you may obtain a copy of the
* License at:
*
*  https://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
* WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* ==========================================================================
*/



/**
 * 
 * @class SCWAT
 * @classdesc methods and functions to help render graphs
 * 
 */
class SCWAT
{
    /**
     * @member {object} color
     * @description color object used for rendering colors of sunburst
     * @memberof SCWAT
     */
    color;

    /**
     * @member {object} root
     * @description member variable to keep track of the current root of the sunburst
     * @memberof SCWAT
     */
    root;

    /**
     * @member {string} filepath
     * @description filepath to json file to read
     * @memberof SCWAT
     */
    filepath;

    /**
     * @member {function} arc
     * @description arc function for generating arc coordinates for each pie slice
     * @memberof SCWAT
     */
    arc;

    /**
     * @member {string} parentID
     * @description ID of HTML element that is the parent of the graph
     * @memberof SCWAT
     */
    parentID;

    /**
     * @member {string} parentType
     * @description type of html element that the parent is
     * @memberof SCWAT
     */
    parentType;

    /**
     * @member {number} width
     * @description width of sunburst chart
     * @memberof SCWAT
     */
    width;

    /**
     * @member {number} height
     * @description height of sunburst chart
     * @memberof SCWAT
     */
    height;

    /**
     * @member {number} radius
     * @description radius of sunburst chart
     * @memberof SCWAT
     */
    radius;
    
    /**
     * @member {function} partition
     * @description function to create hierarchical object for data
     * @memberof SCWAT
     */
    partition;
    
    /**
     * @member {object} svg
     * @description reference to parent element of svg container
     * @memberof SCWAT
     */
    svg;

    /**
     * @member {object} g
     * @description reference to inner svg element that os root of the graph
     * @memberof SCWAT
     */
    g;

    /**
     * @member {object} path
     * @description reference to inner path elements of sunburst
     * @memberof SCWAT
     */
    path;

    /**
     * @member {object} circle_text
     * @description reference to object containing all text inside sunburst
     * @memberof SCWAT
     */
    circle_text;

    /**
     * @member {object} middleText
     * @description reference to middle text container object
     * @memberof SCWAT
     */
    middleText;

    /**
     * @member {object} upperText
     * @description reference to upper text container object
     * @memberof SCWAT
     */
    upperText;

    /**
     * @member {object} lowerText
     * @description reference to jobs text container object
     * @memberof SCWAT
     */
    lowerText;

    /**
     * @member {number} totalCpu
     * @description total CPU available on a system
     * @memberof SCWAT
     */
    totalCpu;
    
    formatPercentage = d3.format('.2%');
    formatNumbers    = d3.format(',');  

    depthToStop;

    /**
     * @constructor
     * @description creates an instance of SCWAT Class
     * @param {string}  filepath   - path to json file of job information
     * @param {string}  graphType  - graph type to render (sunburst)
     * @param {number}  totalCpu   - the amount of total CPU for a system
     * @param {number}  stopDepth  - depth to stop allowing users to navigate sunburst
     * @param {string}  parentID   - ID of HTML element to render graph inside
     * @param {string}  parentType - Type of HTML element that will render graph
     * @param {boolean} animation  - animate sunburst
     * @param {number}  width      - width of graph
     * @param {number}  height     - height of graph to render
     */
    constructor( filepath, graphType, totalCpu, stopDepth, parentID, parentType, animation, width, height )
    {
        
        // set the appropriate class members to the parameters passed
        // in through the constructor
        this.filepath   = filepath;
        this.parent     = parent;
        this.width      = width;
        this.height     = height;
        this.parentID   = parentID;
        this.parentType = parentType;
        this.totalCpu   = totalCpu;
        this.stopDepth  = stopDepth;
        this.animation  = animation;

        // sets the radius of the chart
        this.radius = this.width / 6;

        // creates a new arc generator for generating sectors of the sunburst chart
        this.arc = d3.arc()
            .startAngle(    d => d.x0   )
            .endAngle(      d => d.x1   )
            .padAngle(      d => Math.min( ( d.x1 - d.x0 ) / 2, 0.005 ) )
            .padRadius(     this.radius * 1.5   )
            .innerRadius(   d => ( d.y0 * this.radius ) + 50  )
            .outerRadius(   d => Math.max( ( d.y0 * this.radius ) + 50, d.y1 * this.radius - 1 ));

    }


    /**
     *  
     * @function render
     * @description render graph once it has been initialized
     * @memberof SCWAT
     * 
     */
    render()
    {
        // read json file from path passed into class
        d3.json( this.filepath ).then( data =>
        {
            
            // create partition function to create hierarchical data object
            this.partition = data =>
            {
                // construct a root node from the data passed in hierachical format
                // and sort by size
                const tmpRoot = d3.hierarchy( data )
                               .sum( d => d.size )
                               .sort( ( a, b ) => b.value - a.value );
        
                // create partition object of calculated arc angles for each arc
                // of the sunburst
                return d3.partition()
                         .size( [ 2 * Math.PI, tmpRoot.height + 1 ] )
                         ( tmpRoot );
            }

            // set color scheme to use for sunburst
            this.color = d3.scaleOrdinal( d3.schemeCategory10 );

            // calculate partition object of data
            this.root = this.partition( data );

            // set the current objects d variable a reference to itself
            this.root.each(d => d.current = d);


            // set the HTML SVG Viewbox width and height
            let viewboxWidth  = this.width  * 9 / 13;
            let viewboxHeight = this.height * 9 / 13;
            

            // set svg member variable to be the new svg object that is appended
            // to the HTML element based off the values passed in to the constructor
            // while also setting the viewbox
            this.svg = d3.select(this.parentType +  '#' + this.parentID )
                          .style( 'width',  this.width  + 'px' )
                          .style( 'height', this.height + 'px' )
                          .append('svg')
                          .attr('viewBox', [ 0, 0, viewboxWidth, viewboxHeight ] );

            // create container HTML element and translate view of graph to be centered
            // with the width and height of the viewbox
            this.g = this.svg.append('g')
                         .attr('transform', `translate(${ viewboxWidth / 2},${ viewboxHeight / 2})`);

            // create a container to write text in the middle of the sunburst
            this.circle_text = this.g.append('g')
                                     .attr('id', 'circle_text')
                                     .append('text')
                                     .style('text-anchor', 'middle')
                                     .style('font-family', 'Arial')
                                     .style('fill', '#767f84')
                                     .style('font-size', '1.5em');
            
            // add a tspan element to write text in the middle of the sunburst
            this.middleText = this.circle_text.append('tspan')
                                            .attr('x', 0)
                                            .attr('dy', 0)
                                            .attr('id', 'middle'); 

            // add a tspan element to write text in the lower part of the sunburst
            this.lowerText = this.circle_text.append('tspan')
                                            .attr('x', 0)
                                            .attr('dy', "1.5em")
                                            .attr('id', 'lower');

            // add a tspan element to write text in the upper part of the sunburst
            this.upperText = this.circle_text.append('tspan')
                                            .attr('x', 0)
                                            .attr('dy', "-3em")
                                            .attr('id', 'upper');

               
            // set the current upper text of the sunburst equal to the name
            this.upperText.text( data.name );

            this.middleText.text( this.formatPercentage( this.root.value / this.totalCpu ) );
            
            this.lowerText.text( this.formatNumbers( this.root.copy().count().value ) + ' fields of science' );
            




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
                                while( d.depth > 2 )
                                {
                                    d = d.parent;
                                }

                                return this.color( d.data.name );

                            })
                            .attr('fill-opacity', ( d ) =>  this.arcVisible( d.current ) ? 1 : 0 )
                            .attr('d', d => { return this.arc( d.current ) } );

            // set the cursor to be a pointer on those arcs that are visible
            this.path.filter( d => d.children )
                     .style( 'cursor', 'pointer' )
                     .on('click', ( d ) => this.clickHandler( d, this ) );

            // set the current parent object to equal the current node
            // that is the root of the sunburst
            this.parent = this.g.append('circle')
                                .datum( this.root )
                                .attr('r', this.radius )
                                .attr('fill', 'none')
                                .attr('pointer-events', 'all')
                                .on('click', (d) => this.clickHandler( d, this ) );


            if( this.animation )
            {
                this.animate();
            }

        // catch and print out any errors
        }).catch( error =>
        {
            console.log( error );
        })
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


    /**
     *
     * @function clickHandler
     * @param {object} p       - single arc that was selected
     * @param {object} thisRef - reference to current class
     * @description function to handle when an arc has been clicked 
     * @memberof SCWAT
     */
    clickHandler( p, thisRef )
    {

        if( p.depth >= this.stopDepth )
        {
            return;
        }
        
        // if the current arc has a parent set the parent object to it,
        // otherwise we have selected to root of the data with no parent
        // so set the root to itself
        thisRef.parent.datum( p.parent || thisRef.root );

        // calculate the new target locations for each arc
        thisRef.root.each(d => d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
        });

        // set the transition from the current layout to the new layout given
        // a certain amount of time that has passed
        const t = thisRef.g.transition().duration( 1250 );

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        thisRef.path.transition( t )
            .tween('data', d => 
            {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
            })
        .filter(function(d) 
        {
            return +this.getAttribute('fill-opacity') || thisRef.arcVisible( d.target );
        })
            .attr('fill-opacity', d => thisRef.arcVisible( d.target ) ? 1 : 0)
            .attrTween('d', d => () => this.arc( d.current ) );

        // transition the upper text of the inside of the arc to the new upper text
        this.upperText.transition()
                       .duration( 750 )
                       .style('opacity', 0)
                       .transition()
                       .duration(750)
                       .style('opacity', 1)
                       .text( p.data.name );
        
        // transition the middle text of the inside of the arc to the new middle text
        this.middleText.transition()
                       .duration( 750 )
                       .style('opacity', 0)
                       .transition()
                       .duration(750)
                       .style('opacity', 1)
                       .text( this.formatPercentage( p.value / this.totalCpu ) );


        let lowerTextString = p.copy().count().value + ' ';

        // transition the lower text of the inside of the arc to the new lower text
        this.lowerText.transition()
                       .duration( 750 )
                       .style('opacity', 0)
                       .transition()
                       .duration( 750 )
                       .style('opacity', 1)
                       .text( lowerTextString + ( p.depth == 0 ? 'fields of science' : 'projects' ) );


    }


    animate()
    {
        setTimeout( () => 
        {
            anime({targets : '#paths', rotate : 360, duration : 50000, easing : 'linear', loop : true});
        }, 1000 );
    }
}

export { SCWAT };