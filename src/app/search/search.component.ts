import { Component, OnInit, ViewChild, Query } from '@angular/core';
import { ApiService } from '../api.service';
import { Job } from 'src/app/models/job';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { Search } from '../models/search';

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

    @ViewChild(MatSort) sort : MatSort;
    @ViewChild(MatPaginator) paginator : MatPaginator;

    constructor(private apiService: ApiService) { }


    ngOnInit()
    {

        this.searchForm = new FormGroup({
            startdate  : new FormControl( null ),
            enddate    : new FormControl( null )
        });

        this.apiService.jobsGetRecent( 'stampede2' ).subscribe(
            (data : Job[] ) =>
            {

                const recentDate = moment( data[0].endtime );

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

        const search = new Search();

        search.startdate = this.searchForm.value.startdate.toISOString();
        search.enddate = this.searchForm.value.enddate.toISOString();

        console.log('search query');
        console.log( search );


        this.apiService.jobsSearch( search ).subscribe(
            ( data : Job[] ) =>
            {
                console.log('data returned');
                console.log( data );
            }
        );
    }

}
