import { Component, OnInit, ViewChild } from '@angular/core';
import { ExploreService } from '../explore.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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

    selectedCol1 = 'rack';
    selectedCol2 = 'fos';
    selectedCol3 = 'jobs';
    
    system : string;

    data : MatTableDataSource<tElement>;

    loading = false;

    @ViewChild(MatPaginator, { static : true}) paginator : MatPaginator;
    @ViewChild(MatSort,      { static : true})      sort : MatSort;

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
                this.data.sort = this.sort;
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

        this.loading = true;

        this.exploreService.postTop( params )
            .subscribe( ( response : tElement[] ) =>
            {
                this.data = new MatTableDataSource<tElement>(response);
                this.data.paginator = this.paginator;
                this.data.sort      = this.sort;

                this.loading = false;
            });
    }

    applyFilter(event : Event)
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.data.filter = filterValue.trim().toLowerCase();
    }

}
