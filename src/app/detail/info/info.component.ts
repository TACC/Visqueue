import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit
{

    fosTotal      : number;
    projectsTotal : number;
    jobsTotal     : number;

    constructor(private apiService : ApiService) { }

    ngOnInit()
    {
        this.apiService.postInfo( 'stampede2' )
            .subscribe( ( data : any ) =>
            {
                console.log( data );
            } );
    }

}
