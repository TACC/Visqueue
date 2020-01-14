import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-nodelife',
    templateUrl: './nodelife.component.html',
    styleUrls: ['./nodelife.component.scss']
})
export class NodelifeComponent implements OnInit {

    constructor(private apiService: ApiService) { }

    ngOnInit() 
    {
        this.apiService.getNodes( )
        .subscribe( ( data : any ) =>
        {
            console.log( data );
        });
    }


}
