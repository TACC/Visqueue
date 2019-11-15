import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job';
import { Search } from './models/search';


@Injectable({
    providedIn: 'root'
})
export class ApiService
{

    private url        = 'api';
    private recentJobs = '/jobs/recent';
    private searchJobs = '/jobs/search';

    constructor( private http : HttpClient ) { }

    jobsGetRecent( system : string ) : Observable<Job[]>
    {
        return this.http.get< Job[] >(this.url + this.recentJobs );
    }

    jobsSearch( queryParams : Search )
    {

        return this.http.post< Job[] >( this.url + this.searchJobs, queryParams );

    }
}