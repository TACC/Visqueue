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
        console.log( 'inside explore selected rack function ');
        console.log( rack );

        this.exploreService.selectedRack( rack );
    }

    selectedNode( node : string )
    {
        console.log( 'inside explore selected node function ');
        console.log( node );

        this.exploreService.selectedNode( node );
    }
}
