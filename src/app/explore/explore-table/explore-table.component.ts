import { Component, OnInit } from '@angular/core';

export interface tElement
{
    name : string;
    fos  : string;
    jobs : string;
}

const ELEMENT_DATA: tElement[] = [
    { name: 'Hydrogen',  fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Helium',    fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Lithium',   fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Beryllium', fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Boron',     fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Carbon',    fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Nitrogen',  fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Oxygen',    fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Fluorine',  fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'Neon',      fos: 'Math ', jobs: 'Num Jobs' },
  ];

@Component({
    selector: 'app-explore-table',
    templateUrl: './explore-table.component.html',
    styleUrls: ['./explore-table.component.scss']
})
export class ExploreTableComponent implements OnInit {

    displayedColumns : string[] = [ 'name', 'fos', 'jobs' ];
    columnsToDisplay : string[] = this.displayedColumns.slice();

    data = ELEMENT_DATA;

    constructor() { }

    ngOnInit(): void {
    }

}
