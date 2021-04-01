import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Rack } from '../models/rack';
import { ExploreService } from './explore.service';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss'],
    providers: [ExploreService]
})
export class ExploreComponent implements OnInit {

    constructor(private exploreService : ExploreService) { }

    ngOnInit(): void {
    }

    selectedRack( rack : Rack )
    {   
        this.exploreService.selectedRack( rack );
    }

    selectedNode( node : string )
    {
        this.exploreService.selectedNode( node );
    }
}
