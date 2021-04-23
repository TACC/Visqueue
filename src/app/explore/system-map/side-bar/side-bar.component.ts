import { Component, OnInit } from '@angular/core';

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
    renderSelected : string;

    input : "";

    constructor() { }

    ngOnInit(): void { }

}
