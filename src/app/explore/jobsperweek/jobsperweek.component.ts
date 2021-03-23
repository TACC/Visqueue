import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    loading = false;

    data : ResponseData;

    constructor(
        private explorService: ExploreService,
        private route: ActivatedRoute) { }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];
    }

    retrieveData( data : Rack ) 
    {
    
        this.loading = false;

        let params = 
        {
            'system' : this.system,
            'rack'   : data.name
        };

        this.explorService.postJobsPerWeek( params )
            .subscribe( ( data : ResponseData ) => this.storeData( data ) );
    }

    storeData( data : ResponseData )
    {
        this.data = data;

        this.loading = false;

    }

}
