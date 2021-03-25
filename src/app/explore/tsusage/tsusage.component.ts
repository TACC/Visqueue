import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseData } from 'src/app/models/explore/tsu/response-data';
import { ExploreService } from '../explore.service';

@Component({
    selector: 'app-tsusage',
    templateUrl: './tsusage.component.html',
    styleUrls: ['./tsusage.component.scss']
})
export class TsusageComponent implements OnInit {

    system: string;

    loading = false;

    data : ResponseData;

    constructor(
        private exploreService: ExploreService,
        private route: ActivatedRoute
    ) { }

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
