import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseData } from 'src/app/models/explore/tsu/response-data';
import { Rack } from 'src/app/models/rack';
import { ExploreService } from '../explore.service';

@Component({
    selector: 'app-tsusage',
    templateUrl: './tsusage.component.html',
    styleUrls: ['./tsusage.component.scss']
})
export class TsusageComponent implements OnInit {

    system: string;

    rack : string;
    node : string;

    loading = false;

    data : ResponseData;

    // rack and node subscriptions
    rackSubscription : Subscription;
    nodeSubscription : Subscription;
    
    constructor(
        private exploreService: ExploreService,
        private route: ActivatedRoute
    ) 
    { 
        this.rackSubscription = exploreService.rackSelected$.subscribe(
            ( rack : Rack ) =>
            {
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
    }

    retrieveData( node : string )
    {

        this.loading = true;

        let params = 
        {
            'system' : this.system,
            'node'   : node
        };

        this.exploreService.postTSUsage( params )
            .subscribe( ( data : ResponseData ) => this.storeData( data ) );
    }

    storeData( data : ResponseData )
    {
        this.data = data;

        this.loading = false;
    }
}
