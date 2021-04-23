import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit 
{
    options : string[] = 
    [
        'Field of Science',
        'Project',
        'Institution',
        'Job'
    ];

    selected : string;

    constructor() { }

    ngOnInit(): void { }

}
