import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseData } from 'src/app/models/explore/jpw/responseData';
import { Rack } from 'src/app/models/rack';
import { ExploreService } from '../explore.service';

@Component({
    selector: 'app-jobsperweek',
    templateUrl: './jobsperweek.component.html',
    styleUrls: ['./jobsperweek.component.scss']
})
export class JobsperweekComponent implements OnInit {

    system : string;
    
    rack : string;

    loading = false;

    data : ResponseData;

    rackSubscription : Subscription;

    constructor(
        private exploreService: ExploreService,
        private route: ActivatedRoute) 
        { 
            this.rackSubscription = exploreService.rackSelected$.subscribe(
                ( rack : Rack ) =>
                {
                    this.retrieveData( rack );
                    this.rack = rack.name;
                });
        }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];
    }

    retrieveData( data : Rack ) 
    {
    
        this.loading = true;

        let params = 
        {
            'system' : this.system,
            'rack'   : data.name
        };

        this.exploreService.postJobsPerWeek( params )
            .subscribe( ( data : ResponseData ) => this.storeData( data ) );
    }

    storeData( data : ResponseData )
    {
        this.data = data;

        this.loading = false;

    }

}
