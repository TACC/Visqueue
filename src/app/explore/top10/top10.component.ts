import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rack } from 'src/app/models/rack';
import { ExploreService } from '../explore.service';

@Component({
    selector: 'app-top10',
    templateUrl: './top10.component.html',
    styleUrls: ['./top10.component.scss']
})
export class Top10Component implements OnInit {

    system : string;

    loading = false;

    constructor(
        private exploreService : ExploreService,
        private route          : ActivatedRoute) { }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];
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
            .subscribe( ( data : any ) => this.renderData( data ) );
    }

    renderData( data : any )
    {
        console.log( data );

        this.loading = false;
    }

}
