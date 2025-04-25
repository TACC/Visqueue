import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { ActivatedRoute } from '@angular/router';
import { Rack } from 'src/app/models/rack';

@Component({
    selector: 'app-node-explorer',
    templateUrl: './node-explorer.component.html',
    styleUrls: ['./node-explorer.component.scss'],
    standalone: false
})
export class NodeExplorerComponent implements OnInit {

    racks : Rack[];
    nodes : string[];

    system : string;

    nodeSel = false;
    nodett  = false;

    jobs     : number;
    projects : number;

    loading      = false;
    showNodeInfo = false;

    selectedRack : Rack;
    selectedNode : string;

    rows = [];
    cols = [];

    barchart = {
        data : [],
        layout : 
        { 
            title : 'Total Number of Jobs by Field of Science',
            xaxis : { gridcolor : 'rgba(133, 133, 133, 0.5)' },
            yaxis : { gridcolor : 'rgba(133, 133, 133, 0.5)' },
            plot_bgcolor  : 'rgba(0,0,0,0)',
            paper_bgcolor : 'rgba(0,0,0,0)' 
        }
    };

    constructor(
        private infoService: InfoService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.system = this.route.snapshot.params['name'];

        this.infoService.getNodes(this.system)
            .subscribe((data: [ Rack ] ) => 
            {
                if( data )
                {        
                    let rowMax = Math.max.apply( Math, data.map(function( o ) { return o.row; } ));
                    let colMax = Math.max.apply( Math, data.map(function( o ) { return o.col; } ));

                    this.rows = [...Array( rowMax + 1 ).keys() ];
                    this.cols = [...Array( colMax + 1 ).keys() ];

                    this.racks = data;
                }
            });

    }

    rackDropdown( event : any )
    {
        this.selectedRack = event.value;
        this.nodes = event.value.nodes;
    }

    rackClick( rack : Rack )
    {
        this.selectedRack = rack;

        this.nodes = rack.nodes;
    }

    nodeSelected( event : any )
    {
        this.nodeSel = true;
        this.nodett  = true;

        this.selectedNode = event.value;

        this.loading = true;
        
        this.infoService.postNodes( event.value, this.system )
            .subscribe( ( data : any ) =>
            {

                this.jobs     = data.jobs_total;
                this.projects = data.proj_info.length;

                this.loading = false;

                let barData = [{
                    y           : data.fos_info.map( field => field.abbrev ),
                    x           : data.fos_info.map( field => field.count ),
                    marker : 
                    {
                        color : data.fos_info.map( field => { return this.infoService.getFosColor( field.abbrev ) } )
                    },
                    type        : 'bar',
                    orientation : 'h'
                }];

                this.barchart.data = barData;
            
                this.showNodeInfo = true;
            });  
        
    }

}
