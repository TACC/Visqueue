/*
* ==========================================================================
* Copyright (c) 2017-2018 The University of Texas at Austin.
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

/*
    ID's of important elements on page. This makes it easier to select them by applying them and changing
    them once here instead of having to remember it all the time.
*/

const buttons_containerID  = "buttons-container",
      sunburst_containerID = "sunburst-container",
      sunburstID           = "sunburst",
      text_containerID     = "text_container",
      titles_containerID   = "titles_container",
      sunburst_titleID     = "sunburst-title",
      sunburst_coresID     = "sunburst-cores",
      sunburst_jobsID      = "sunburst-jobs";

/*
    classes of data that is shown inside table for each button on the right side
*/
const tableID       = "info_table",
      titleID       = "title_info",
      jobID         = "job_info",
      coreID        = "core_info",
      institutionID = "institution_info",
      pi_nameID     = "PI_info",
      abstractID    = "abstract_info";

/*
    useful ID and Class information for modal
*/
const modalID             = "info_modal",
      modal_titleID       = "modal_title",
      modal_coresID       = "modal_cores",
      modal_institutionID = "modal_institution",
      modal_PIID          = "modal_PI",
      modal_abstractID    = "modal_abstract";

/*
    width and height of svg canvas, aspect ratio, and radius of sunburst
*/
var container = $("#" + sunburst_containerID ),
	width  	  = container.width(),
    height    = container.height(),
	radius    = width / 6;

/*
	Keep track of which arc is selected so it can be accessed by onclick function
*/
let currentArc = null;

/*
    root object containing hierarchy of entire sunburst
*/
let root = null;

/*
    nodes object which represents each individual node that is displayed on the sunburst
*/
let nodes = null;

/*
    container object used that wraps around all possible text inside the sunburst
*/
let text_container = null;

/*
    reference to the body tag that is contained inside the foreignObject that is used
    to render the text in the middle of the circle
*/
let text_container_body = null;

/*
    format percentage to correctly show how much percentage of cores a job is
    taking up at a time.

    https://github.com/d3/d3-format
*/
const format_percentage = d3.format(".2%");

/*
    format cores so that the appropriate commas and values are shown
*/
const format_cores = d3.format(",");

/*
    create an ordinal scale of colors
    where each name is correlated to a color

    https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal
*/
let color = null;

/*
    creates a default adjancency diagram which is a space-filling
    variant of a node-link tree diagram. Rather than drawing a link between
    parent and child in the hierarchy, nodes are drawn as solid areas (either arcs
    or rectangles) with placements relative to other nodes

    https://github.com/d3/d3-hierarchy/blob/master/README.md#partition
*/
let partition = null;

/*
    Total amount of CPU's that are allocated on supercomputer system.

*/
const totalCpu = 100000;

const arc = d3.arc()
			  .startAngle(d => d.x0)
			  .endAngle(d => d.x1)
			  .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
			  .padRadius(radius * 1.5)
			  .innerRadius(d => d.y0 * radius)
			  .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1) * 0.8 );

d3.json("data.json").then( function( data ) {

	partition = data => {
		const root = d3.hierarchy(data)
		.sum(d => d.size)
		.sort((a, b) => b.value - a.value);

		return d3.partition()
		.size([2 * Math.PI, root.height + 1])
		(root);
	}

	/*
	remove later
	 */
	format = d3.format(",d")

	color = d3.scaleOrdinal( d3.schemeCategory10 );

	root = partition(data);

	root.each(d => d.current = d);

	root.sum( function( d )
    {
        return d.size ? 1 : 0;
    })
    .each( function ( d )
    {
        d.jobs = d.value;
    });

    root.sum( function( d )
    {
        return d.resources_used;
    })
    .each( function( d )
    {
        d.resources_used = d.value;
    })

    root.sum( function( d )
    {

        return d.size;

    })
    .sort( function( a, b )
    {
        return b.height - a.height || b.value - a.value;
    });

	const svg = d3.select("#" + sunburst_containerID )
		.append("svg")
	.attr("width",  ( width  + 10 )   )
	.attr("height", ( height + 10 )   );

	const g = svg.append("g")
				 .attr("transform", `translate(${width / 2},${height / 2})`);


	const path = g.append("g")
	  .selectAll("path")
	  .data(root.descendants().slice(1))
	  .enter().append("path")
	    .attr("fill", d =>
		{
			while (d.depth > 2)
 			{
				d = d.parent;
			}

			return color(d.data.name);
		})
	    .attr("fill-opacity", d => arcVisible(d.current) ? 1 : 0)
	    .attr("d", d => { arc(d.current)});

	path.filter(d => d.children)
	    .style("cursor", "pointer")
	    .on("click", clicked);

	path.append("title")
	    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);


	const parent = g.append("circle")
	    .datum(root)
	    .attr("r", radius)
	    .attr("fill", "none")
	    .attr("pointer-events", "all")
	    .on("click", clicked);

	const circle_text = g.append("g")
						 .attr("id", "circle_text")
						 .append("text")
						 .style("text-anchor", "middle")
						 .style("font-family", "Arial")
						 .style("fill", "#7c7f84")
						 .style("font-size", "1.5vw");

	const title_text = circle_text.append("tspan")
								  .attr("id", "title")
								  .attr("dy", "-1.5em")
								  .attr("x", 0);

	const percentage_text = circle_text.append("tspan")
									   .attr("id", "percentage")
									   .attr("x", 0)
									   .attr("dy", "1.5em");

	const jobs_text = circle_text.append("tspan")
								  .attr("id", "jobs")
								  .attr("dy", "1.5em")
								  .attr("x", 0);

	function clicked( p )
	{

		if( ( p.depth == 2 ) && (p != currentArc ) )
    	{
	        /*
	            if there is no abstract available, then do not display the modal ( resolves issue where
	            a user selects an arc that has no abstract )
	        */
	        if( p.data.project_abstract && p.data.project_abstract != "n/a" )
	        {
	            display_modal( p );
	        }

	        return;
    	}

		parent.datum(p.parent || root);

		title_text.transition()
				  .duration( 750 )
				  .style( "opacity", 0 )
				  .transition()
				  .duration( 750 )
				  .style("opacity", 1)
				  .text( p.data.name );


		percentage_text.transition()
				  .duration( 750 )
				  .style( "opacity", 0 )
				  .transition()
				  .duration( 750 )
				  .style("opacity", 1)
				  .text( format_percentage( p.resources_used / totalCpu ) );

		jobs_text.transition()
				  .duration( 750 )
				  .style( "opacity", 0 )
				  .transition()
				  .duration( 750 )
				  .style("opacity", 1)
				  .text( p.jobs + " jobs" );


		root.each( d => d.target =
		{
			x0: Math.max( 0, Math.min(1, ( d.x0 - p.x0 ) / ( p.x1 - p.x0 ) ) ) * 2 * Math.PI,
			x1: Math.max( 0, Math.min(1, ( d.x1 - p.x0 ) / ( p.x1 - p.x0 ) ) ) * 2 * Math.PI,
			y0: Math.max( 0, d.y0 - p.depth ),
			y1: Math.max( 0, d.y1 - p.depth )
		});

		const t = g.transition().duration( 1250 );

		// Transition the data on all arcs, even the ones that aren’t visible,
		// so that if this transition is interrupted, entering arcs will start
		// the next transition from the desired position.
		path.transition(t)
		  .tween("data", d =>
		  {
		    const i = d3.interpolate(d.current, d.target);
		    return t => d.current = i(t);
		  })
		  .filter(function( d )
		  {
		    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
		  })
		  .attr("fill-opacity", d => arcVisible(d.target) ? 1 : 0)
		  .attrTween("d", d => () => arc(d.current));

		  populate_buttons( p );
		  currentArc = p;

	}

	function arcVisible( d )
	{
		return ( d.y1 <= 2 ) && ( d.y0 >= 1 ) && ( d.x1 > d.x0 );
	}

	/*
	    function call to populate buttons on the right side of the window that users can click
	    to interact with the sunburst
	*/
	function populate_buttons( d )
	{
	    /*
	        grab the current button container and remove the buttons that are currently inside the div.
	    */
	    var buttons_container = $( "div#" + buttons_containerID );

	    /*
	        if the buttons container is already empty then do not fade out and add information.
	        Otherwise go to the else and fadeOUt if information is shown, refill and fadeIn.
	    */
	    if( buttons_container.is( ":empty" ) )
	    {
	        insert_buttons( buttons_container, d );

	        $( this ).fadeIn( 750 );

	    }

	    else
	    {

	        buttons_container.fadeOut( 750, function( )
	        {

	            insert_buttons( this, d );

	            $( this ).fadeIn( 750 );

	        });
	    }

	}

	function insert_buttons(buttons_container, d )
	{
	    /*
	        empty current button container to fill with new buttons based of arc or button selected
	    */
	    $( buttons_container ).empty();

	    /*
	        loop through the nodes array, and if a node is equal to the current depth + 1, append it to the buttons
	        container to add it as a button to the button list.
	    */
	    for( let node of d.children )
	    {

	        /*
	            performing ajax request to retrieve html file that contains button text. We load the file and then insert
	            it into the button container, and fill the appropriate values accordingly.
	        */
	        $.ajax
	        ({
	            type    : "GET",
	            url     :  "html/table_info.html",
	            success : function( text )
	            {
	                /*
	                    append loaded html file to button container
	                */
	                $( buttons_container ).append( text );

	                /*
	                    select the button fro the html using jquery to easily access inner html
	                    to insert appropriate text for elements inside info table
	                */
	                var button_added = $( "div#" + buttons_containerID + " button:last" );

	                /*
	                    set the value of the button to be equal to the name of the datum
	                */
	                button_added.val( node.data.name );

	                /*
	                    retrieve and set the color of the button to be the same as the chart displays for
	                    it's respective arc
	                */
	                var arc_color = color ( ( node.children ? node : node.parent ).data.name );

	                button_added.css( "background-color", ( arc_color ) );
	                button_added.css( "border-color",     ( arc_color ) );

	                /*
	                    insert the name of the datum, and the value of the datum into it's respective
	                    row inside the table
	                */
	                button_added.find( "th#" + titleID ).text( node.data.name );
	                button_added.find( "th#" + coreID  ).text( format_percentage( node.resources_used / totalCpu ) );
	                button_added.find( "th#" + jobID  ).text( node.jobs + " jobs" );


	                /*
	                    set the institution and pi_name. We use these values later on as a check
	                    to see if this datum has these values, and if not we do not insert them,
	                    otherwise we insert them to it's respective row inside the table.
	                */
	                var pi_institution = node.data.pi_institution,
	                    pi_name        = node.data.principal_investigator,
	                    abstract       = node.data.project_abstract;

	                if( pi_institution && pi_name )
	                {
	                    button_added.find( "th#" + institutionID ).text( pi_institution );
	                    button_added.find( "th#" + pi_nameID     ).text( pi_name        );

	                    if( abstract && abstract != "n/a" )
	                    {
	                        button_added.find( "div#" + abstractID ).append( "<a>Abstract Available</a>" );
	                    }
	                    else
	                    {
	                        button_added.attr( "disabled", true );
	                    }
	                }

	                /*
	                    attach a click event to call the click handler whenever a button is clicked
	                */
	                button_added.on( "click", function( )
	                {
	                    clicked( node );
	                });

	            }

	        });

	    }
	}

	clicked( root );

});

function display_modal( d )
{

    /*
        Fill in the table that is inside the modal with the appropriate information to show
        based off the datum that is passed in.
    */
    $("#" + modalID + " th#" + modal_titleID       ).text( d.data.name                         );
    $("#" + modalID + " th#" + modal_coresID       ).text( format_cores ( d.value ) + " cores" );
    $("#" + modalID + " th#" + modal_institutionID ).text( d.data.pi_institution               );
    $("#" + modalID + " th#" + modal_PIID          ).text( d.data.principal_investigator       );

    /*
        see if the abstract section of the datum is available, and if it is then display it,
        otherwise show "N/A" for the text
    */
    var abstract = d.data.project_abstract;

    if( abstract )
    {
        $( "#" + modalID + " div#" + modal_abstractID ).text( abstract );
    }
    else
    {
        $( "#" + modalID + " div#" + modal_abstractID ).text( "N/A" );
    }

    /*
        call the bootstrap modal function to make the modal appear
    */
    $( "#" + modalID ).modal
    ({

    });
}
