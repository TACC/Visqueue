import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { ActivatedRoute } from '@angular/router';
import { Rack } from 'src/app/models/rack';

@Component({
    selector: 'app-node-explorer',
    templateUrl: './node-explorer.component.html',
    styleUrls: ['./node-explorer.component.scss']
})
export class NodeExplorerComponent implements OnInit {

    racks : Rack[];
    nodes : string[];

    system : string;

    nodeSel = false;
    nodett  = false;

    jobs     : number;
    projects : number;

    loading = false;

    barchart = {
        data : [],
        layout : { title : 'A fancy plot' }
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
                    this.racks = data;
                }
            });

    }

    rackSelected( event : any )
    {
        this.nodes = event.value.nodes;
    }

    nodeSelected( event : any )
    {
        this.nodeSel = true;
        this.nodett  = true;

        this.loading = true;

        let regexp = /\(([^)]+)\)/;
        
        this.infoService.postNodes( event.value, this.system )
            .subscribe( ( data : any ) =>
            {
                console.log( data );
                this.jobs     = data.jobs_total;
                this.projects = data.proj_info.length;

                this.loading = false;

                let barData = [{
                    y           : data.fos_info.map( proj => { return regexp.exec( proj.name )[1] }),
                    x           : data.fos_info.map( proj => proj.count ),
                    marker : 
                    {
                        color : data.fos_info.map( proj => { return this.infoService.getFosColor( regexp.exec( proj.name )[1] ) } )
                    },
                    type        : 'bar',
                    orientation : 'h'
                }];

                this.barchart.data = barData;
            });  
        
    }

}
