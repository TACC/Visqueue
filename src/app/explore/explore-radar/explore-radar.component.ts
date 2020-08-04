import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../explore.service';
import { Rack } from 'src/app/models/rack';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-explore-radar',
    templateUrl: './explore-radar.component.html',
    styleUrls: ['./explore-radar.component.scss']
})
export class ExploreRadarComponent implements OnInit {

    system : string;

    racks : Rack[];
    nodes : string[];

    selectedRack : Rack;
    selectedNode : string;

    constructor(
        private exploreService : ExploreService,
        private route          : ActivatedRoute) { }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];

        this.exploreService.getNodes( this.system )
            .subscribe( ( data : [ Rack ] ) =>
            {
                this.racks = data;
            });
            
    }

    selectRack( event : any )
    {
        this.selectedRack = event.value;
        this.nodes        = event.value.nodes;
    }

    selectNode( event : any )
    {
        this.selectedNode = event.value;
    }
}
