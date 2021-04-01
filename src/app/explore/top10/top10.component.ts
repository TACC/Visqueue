import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseData } from 'src/app/models/explore/top10/responsedata';
import { Rack } from 'src/app/models/rack';
import { ExploreService } from '../explore.service';

@Component({
    selector: 'app-top10',
    templateUrl: './top10.component.html',
    styleUrls: ['./top10.component.scss']
})
export class Top10Component implements OnInit {

    system : string;

    rack : string;
    node : string;

    loading = false;

    data : ResponseData;

    selection : string;

    options : string[] = ['institution', 'project'];

    // rack and node subscriptions
    rackSubscription : Subscription;
    nodeSubscription : Subscription;


    constructor(
        private exploreService : ExploreService,
        private route          : ActivatedRoute) 
        {
            this.rackSubscription = exploreService.rackSelected$.subscribe(
                ( rack : Rack ) =>
                {
                    this.retrieveData( rack );
                    this.rack = rack.name;
                });
        
            this.nodeSubscription = exploreService.nodeSelected$.subscribe(
                ( node : string ) =>
                {
                    this.retrieveData( node );
                    this.node = node;
                });

        }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];

        this.selection = 'institution';
    }

    retrieveData( data : Rack | string )
    {

        this.loading = true; 
        
        let nodes = this.exploreService.isRack( data ) ? data.nodes : [ data ];

        let params = {
            'system' : this.system,
            'nodes'  : nodes
        };

        this.exploreService.postTop10( params )
            .subscribe( ( data : ResponseData ) => this.storeData( data ) );
    }

    storeData( data : ResponseData )
    {
        this.data = data;

        this.loading = false;
    }

}
