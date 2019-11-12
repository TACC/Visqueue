import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'models/job';


@Injectable({
    providedIn: 'root'
})
export class ApiService
{

    private url        = 'api';
    private jobs       = '/jobs';
    private jobsRecent = '/jobs/recent';

    constructor( private http : HttpClient ) { }

    getJobs( system : string ) : Observable<Job[]>
    {
        const params = new HttpParams();

        params.set( 'system', system );

        return this.http.get< Job[] >(this.url + this.jobs );
    }

    getJobsRecent( system : string ) : Observable<Job[]>
    {
        const params = new HttpParams();

        params.set( 'system', system );

        return this.http.get< Job[] >(this.url + this.jobsRecent );
    }
}