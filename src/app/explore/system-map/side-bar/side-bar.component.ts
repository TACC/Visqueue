import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../../explore.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit 
{
    selectOptions : string[] = 
    [
        'Field of Science',
        'Project',
        'Institution',
        'Job'
    ];

    radioOptions : string[] = ['Jobs', 'Time'];

    fieldSelected : string;
    input : '';
    renderSelected : string;


    constructor(private exploreService : ExploreService) { }

    ngOnInit(): void { }

    onRender()
    {
        console.log( "inside on render" );
    }
}
