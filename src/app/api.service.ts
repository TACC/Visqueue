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
    private systemInfo = '/info';

    private nodes     = '/nodes';
    private nodesInfo = '/nodes/info';

    constructor( private http : HttpClient ) { }

    jobsGetRecent( system : string ) : Observable<Job[]>
    {
        return this.http.get< Job[] >(this.url + this.recentJobs );
    }

    jobsSearch( queryParams : Search )
    {

        return this.http.post< Job[] >( this.url + this.searchJobs, queryParams );

    }

    postInfo( system : string )
    {
        return this.http.post( this.url + this.systemInfo, { system } );
    }

    getNodes( system : string )
    {
        let params = new HttpParams();
        params = params.set( 'system', system );
        return this.http.get( this.url + this.nodes, { params : params } );
    }

    getNodeInfo( system : string, node : string )
    {
        let params = new HttpParams()
                     .set( 'system', system )
                     .set( 'node' , node );  
                     
        return this.http.post( this.url + this.nodesInfo, params );
    }

}