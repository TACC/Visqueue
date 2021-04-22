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
        'field of science',
        'project',
        'institution',
        'job'
    ];

    selected : string;

    constructor() { }

    ngOnInit(): void { }

}
