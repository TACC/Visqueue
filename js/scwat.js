/*
* ==========================================================================
* Copyright (c) 2017-2019 The University of Texas at Austin.
* All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* A copy of the License is included with this software in the file LICENSE.
* If your copy does not contain the License, you may obtain a copy of the
* License at:
*
*  https://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
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

            this.color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

            this.root = this.partition( data );

            this.root.each(d => d.current = d);


            console.log(this.parentType + '    ' + this.parentID);

            const svg = d3.select(this.parentType +  '#' + this.parentID )
                          .style( "width",  this.width  + 'px' )
                          .style( "height", this.height + 'px' )
                          .append("svg")
                          .attr('viewBox', [ 0, 0, this.width, this.height ] );

            const g = svg.append("g")
                         .attr("transform", `translate(${ this.width / 2},${ this.height / 2})`);

            const path = g.append("g")
                          .selectAll("path")
                          .data(this.root.descendants().slice( 1 ) )
                          .join("path")
                          .attr("fill", d =>
                          {
                              while( d.depth > 1 )
                              {
                                  d = d.parent;
                              }

                              return this.color( d.data.name );

                          })
                          .attr("fill-opacity", d => 0.6 )
                          .attr("d", d => { return this.arc( d.current ) } );




        }).catch( error =>
        {
            console.log( error );
        })
    }

}

export { SCWAT };