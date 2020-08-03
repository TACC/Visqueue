import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../explore.service';

export interface tElement
{
    name : string;
    fos  : string;
    jobs : string;
}

interface tOption 
{
    value     : string;
    viewValue : string;
}


const ELEMENT_DATA: tElement[] = [
    { name: 'aydrogen',  fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'aelium',    fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'aithium',   fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'aeryllium', fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'aoron',     fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'aarbon',    fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'aitrogen',  fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'axygen',    fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'aluorine',  fos: 'Math ', jobs: 'Num Jobs' },
    { name: 'aeon',      fos: 'Math ', jobs: 'Num Jobs' }
  ];

@Component({
    selector: 'app-explore-table',
    templateUrl: './explore-table.component.html',
    styleUrls: ['./explore-table.component.scss']
})
export class ExploreTableComponent implements OnInit {

    firstCol : tOption[] = 
    [
        { value : 'rack', viewValue : 'Rack' },
        { value : 'node', viewValue : 'Node' }
    ];

    secondCol : tOption[] = 
    [
        { value : 'fos',         viewValue : 'Fos'        },
        { value : 'project',     viewValue : 'Project'     },
        { value : 'institution', viewValue : 'Institution' }
    ];

    thirdCol : tOption[] = 
    [
        { value : 'jobs',     viewValue : 'Jobs'     },
        { value : 'duration', viewValue : 'Duration' }
    ];

    displayedColumns : string[] = [ 'name', 'fos', 'jobs' ];
    columnsToDisplay : string[] = this.displayedColumns.slice();

    public selectedCol1 = 'rack';
    public selectedCol2 = 'fos';
    public selectedCol3 = 'jobs';
    

    data = ELEMENT_DATA;

    constructor(private exploreService : ExploreService) { }

    ngOnInit(): void {
    }

}
