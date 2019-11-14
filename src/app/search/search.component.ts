import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Job } from 'models/job';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import * as moment from 'moment';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers : [
        { provide : DateAdapter, useClass : MomentDateAdapter, deps : [ MAT_DATE_LOCALE ] },
        { provide : MAT_DATE_FORMATS, useValue : MAT_MOMENT_DATE_FORMATS },
        ApiService
    ]
})
export class SearchComponent implements OnInit
{
    searchForm : FormGroup;

    dataset : Job[];

    dataResult : MatTableDataSource<Job>;

    columnsToDisplay : string[] = [ 'name', 'duration', 'nodes', 'starttime' , 'endtime', 'queue', 'state' ];

    mode = 'indeterminate';

    @ViewChild( MatSort, { static : false } ) sort : MatSort;
    @ViewChild( MatPaginator, { static : false } ) paginator : MatPaginator;

    constructor(private apiService: ApiService) { }


    ngOnInit()
    {

        this.searchForm = new FormGroup({
            startdate  : new FormControl( null ),
            enddate    : new FormControl( null )
        });

        this.apiService.getJobsRecent( 'stampede2' ).subscribe(
            (data : Job[] ) =>
            {

                const recentDate = moment( data[0].endtime ).format( 'YYYY-MM-DD' );

                this.searchForm.patchValue( { enddate : recentDate } );

                this.dataset = data;

                this.dataset.forEach( ( d ) =>
                {
                    d.name = d.project.name;
                });

                this.dataResult = new MatTableDataSource( data );

                this.dataResult.paginator = this.paginator;
                this.dataResult.sort = this.sort;

                this.mode = 'determinate';

            }
        );

    }

    onSearchSubmit()
    {
        console.log( this.searchForm );
    }

}
