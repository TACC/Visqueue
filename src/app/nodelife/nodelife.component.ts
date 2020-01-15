import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-nodelife',
    templateUrl: './nodelife.component.html',
    styleUrls: ['./nodelife.component.scss']
})
export class NodelifeComponent implements OnInit {

    private nodeData = [];

    constructor(private apiService: ApiService) { }

    ngOnInit() 
    {
        this.apiService.getNodes( )
        .subscribe( ( data : any ) =>
        {

            this.nodeData = data;

        });
    }

    clickRack( event : Event)
    {
        let elementID = ( event.target as Element).id;

        let rack;

        for( let i = 0; i < this.nodeData.length; i++ )
        {

            let r = this.nodeData[ i ];

            if( r[ '_id' ] == elementID )
            {
                rack = r;
                break;
            }
        }

        let node = rack[ 'nodes' ][0][ 'name' ];

        this.apiService.getNodeInfo( node )
            .subscribe( ( data : any ) =>
            {
                console.log( data );
            });

    }


}
