import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
                    console.log( data );
                });
        });


    }

    clickRack( event : Event)
    {
        let elementID = ( event.target as Element).id;

        console.log( elementID );


    }


}