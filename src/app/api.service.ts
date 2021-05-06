import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job';
import { Search } from './models/search';
import { FosTimeSeries } from './models/fos-time-series';


@Injectable({
    providedIn: 'root'
})
export class ApiService
{

    private url        = 'api';
    private recentJobs = '/jobs/recent';
    private searchJobs = '/jobs/search';

    private info       = '/info';
    private systemFos  = '/info/fos';

    private nodes      = '/nodes';

    private explore    = '/explore';
    private top        = '/top';
    private fos        = '/fos'; 
    private top10      = '/top10';
    private jpw        = '/jobsperweek';
    private tsusage    = '/tsusage';

    private sysmap     = '/sysmap';
    private side       = '/side';
    private project    = '/project';
    private inst       = '/institution';
    private job        = '/job';

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
        return this.http.post( this.url + this.info, { system } );
    }

    getNodes( system : string )
    {
        return this.http.get( this.url + this.info + this.nodes, { params : { 'system' : system } } );
    }

    postNodes( node : string, system : string )
    {
        let params = { 'system' : system , 'node' : node };
        return this.http.post( this.url + this.info + this.nodes, params );
    }


    postFosTimeSeries( system : string )
    {
        return this.http.post( this.url + this.systemFos, { system } ); 
    }

    postTop( params : any )
    {
        return this.http.post( this.url + this.explore + this.top, params );
    }

    postExploreFos( params : any )
    {
        return this.http.post( this.url + this.explore + this.fos, params );
    }

    postExploreTop10( params : any )
    {
        return this.http.post( this.url + this.explore + this.top10, params );
    }

    postExploreJPW( params : any )
    {
        return this.http.post( this.url + this.explore + this.jpw , params );
    }

    postExploreTSU( params : any )
    {
        return this.http.post( this.url + this.explore + this.tsusage , params );
    }

    postExploreSysMapSide( params : any )
    {
        return this.http.post( this.url + this.explore + this.sysmap + this.side, params );
    }

    postExploreSysMapFOS( params : any )
    {
        return this.http.post( this.url + this.explore + this.sysmap + this.fos, params );
    }

    postExploreSysMapProj( params : any )
    {
        return this.http.post( this.url + this.explore + this.sysmap + this.project, params );
    }

    postExploreSysMapInst( params : any )
    {
        return this.http.post( this.url + this.explore + this.sysmap + this.inst, params );
    }

    postExploreSysMapJob( params : any )
    {
        return this.http.post( this.url + this.explore + this.sysmap + this.job, params );
    }
}