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
        
        this.infoService.postNodes( event.value, this.system )
            .subscribe( ( data : any ) =>
            {
                console.log( data );
                this.jobs     = data.jobs_total;
                this.projects = data.proj_info.length;

                this.loading = false;
            });  
        
    }

}
