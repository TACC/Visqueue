import { Component, OnInit, ViewChild } from '@angular/core';
import { ExploreService } from '../explore.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface tElement
{
    name     : string;
    category : string;
    value    : string;
}

interface tOption 
{
    value     : string;
    viewValue : string;
}

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
        // { value : 'duration', viewValue : 'Duration' }
    ];

    displayedColumns : string[] = [ 'name', 'category', 'value' ];
    columnsToDisplay : string[] = this.displayedColumns.slice();

    public selectedCol1 = 'rack';
    public selectedCol2 = 'fos';
    public selectedCol3 = 'jobs';
    
    system : string;

    data : any;

    @ViewChild(MatPaginator, { static : true}) paginator : MatPaginator;

    constructor(
        private exploreService : ExploreService,
        private route : ActivatedRoute) { }

    ngOnInit(): void 
    {

        this.system = this.route.snapshot.paramMap.get('name');

        let params = {
            'system'   : this.system,
            'category' : this.selectedCol1,
            'field'    : this.selectedCol2,
            'value'    : this.selectedCol3
        };

        this.exploreService.postTop( params )
            .subscribe( ( response : tElement[] ) =>
            {
                this.data = new MatTableDataSource<tElement>(response);
                this.data.paginator = this.paginator;
            });
    }

    onSelection(): void 
    {

        let params = {
            'system'   : this.system,
            'category' : this.selectedCol1,
            'field'    : this.selectedCol2,
            'value'    : this.selectedCol3
        };

        this.exploreService.postTop( params )
            .subscribe( (response : any ) =>
            {

                this.data = response;
            });
    }

}
