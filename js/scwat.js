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

class SCWAT
{

    color;
    root;
    filepath;
    arc;
    parentID;
    parentType;
    width;
    height;
    radius;
    
    partition;
    
    svg;
    g;
    path;

    circle_text;
    title_text;
    percentage_text;
    jobs_text;

    constructor( filepath, parentID, parentType, width, height )
    {
        this.filepath   = filepath;
        this.parent     = parent;
        this.width      = width;
        this.height     = height;
        this.parentID   = parentID;
        this.parentType = parentType;

        this.radius = this.width / 6;

        this.arc = d3.arc()
            .startAngle(    d => d.x0   )
            .endAngle(      d => d.x1   )
            .padAngle(      d => Math.min( ( d.x1 - d.x0 ) / 2, 0.005 ) )
            .padRadius(     this.radius * 1.5   )
            .innerRadius(   d => d.y0 * this.radius  )
            .outerRadius(   d => Math.max( d.y0 * this.radius, d.y1 * this.radius - 1 ));

    }


    render()
    {
        d3.json( this.filepath ).then( data =>
        {
            
            this.partition = data =>
            {
                const tmpRoot = d3.hierarchy( data )
                               .sum( d => d.size )
                               .sort( ( a, b ) => b.value - a.value );
        
                return d3.partition()
                         .size( [ 2 * Math.PI, tmpRoot.height + 1 ] )
                         ( tmpRoot );
            }

            this.color = d3.scaleOrdinal( d3.schemeCategory10 );

            this.root = this.partition( data );

            this.root.each(d => d.current = d);


            let viewboxWidth  = this.width * 9 / 13;
            let viewboxHeight = this.height * 9 / 13;
            

            this.svg = d3.select(this.parentType +  '#' + this.parentID )
                          .style( 'width',  this.width  + 'px' )
                          .style( 'height', this.height + 'px' )
                          .append('svg')
                          .attr('viewBox', [ 0, 0, viewboxWidth, viewboxHeight ] );

            this.g = this.svg.append('g')
                         .attr('transform', `translate(${ viewboxWidth / 2},${ viewboxHeight / 2})`);

            this.circle_text = this.g.append('g')
                                     .attr('id', 'circle_text')
                                     .append('text')
                                     .style('text-anchor', 'middle')
                                     .style('font-family', 'Arial')
                                     .style('fill', '#767f84')
                                     .style('font-size', '1vw');

            this.title_text = this.circle_text.append('tspan')
                                              .attr('id', 'title');
                                              

            this.title_text.text( data.name );

            this.path = this.g.append('g')
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

            this.path.filter( d => d.children )
                     .style( 'cursor', 'pointer' )
                     .on('click', ( d ) => this.clickHandler( d, this ) );

            this.parent = this.g.append('circle')
                                .datum( this.root )
                                .attr('r', this.radius )
                                .attr('fill', 'none')
                                .attr('pointer-events', 'all')
                                .on('click', (d) => this.clickHandler( d, this ) );

        }).catch( error =>
        {
            console.log( error );
        })
    }

    arcVisible( d )
    {
        return ( d.y1 <= 2 ) && ( d.y0 >= 1 ) && ( d.x1 > d.x0 );
    }

    clickHandler( p, thisRef )
    {
        
        thisRef.parent.datum( p.parent || thisRef.root );

        thisRef.root.each(d => d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
        });

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
        
    }

}

export { SCWAT };