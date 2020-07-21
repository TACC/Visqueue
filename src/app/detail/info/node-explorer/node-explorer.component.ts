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

    nodeSel = false;
    nodett  = false;

    constructor(
        private infoService: InfoService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        let system = this.route.snapshot.params['name'];

        this.infoService.getNodes(system)
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
        
        console.log( event );
    }

}
