import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExploreService } from '../explore.service';

@Component({
    selector: 'app-tsusage',
    templateUrl: './tsusage.component.html',
    styleUrls: ['./tsusage.component.scss']
})
export class TsusageComponent implements OnInit {

    system: string;

    loading = false;

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

        this.loading = false;

        let params = 
        {
            'system' : this.system,
            'node'   : node
        };

        this.exploreService.postTSUsage( params )
            .subscribe( ( data : any ) => this.storeData( data ) );
        console.log( node );
    }

    storeData( data : any )
    {
        console.log( data );
    }
}
