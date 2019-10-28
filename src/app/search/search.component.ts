import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Job } from 'models/job';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit
{

    dataResult : MatTableDataSource<Job>;

    columnsToDisplay : string[] = [ 'project', 'duration', 'nodes', 'starttime' , 'endtime', 'queue' ];

    @ViewChild( MatSort, { static : false } ) sort : MatSort;
    @ViewChild( MatPaginator, { static : false } ) paginator : MatPaginator;

    constructor(private apiService: ApiService) { }


    ngOnInit()
    {

        this.apiService.getJobs( 'stampede2' ).subscribe(
            (data : Job[] ) =>
            {
                this.dataResult = new MatTableDataSource(data);

                this.dataResult.paginator = this.paginator;
                this.dataResult.sort = this.sort;

                console.log( data );
            }
        );
    }

}
