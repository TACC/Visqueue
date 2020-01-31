import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-nodelife',
    templateUrl: './nodelife.component.html',
    styleUrls: ['./nodelife.component.scss']
})
export class NodelifeComponent implements OnInit {

    private rackData = [];

    private nodeData = [];

    constructor(
        private route      : ActivatedRoute,
        private apiService : ApiService) { }

    ngOnInit() 
    {

        this.route.paramMap.subscribe( ( params : ParamMap ) =>
        {
            this.apiService.getNodes( params.get('name') )
                .subscribe( ( data : any ) =>
                {                    
                    this.rackData = data;
                });
        });

    }

    clickRack( rack : any )
    {
        this.nodeData = rack.nodes;
    }

    clickNode( node : any )
    {
        console.log( node );
    }


}
