import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { Rack } from '../models/rack';

@Injectable({
    providedIn: 'root'
})
export class ExploreService {

    private selectedRackSource = new Subject<Rack>();
    private selectedNodeSource = new Subject<string>();

    rackSelected$ = this.selectedRackSource.asObservable();
    nodeSelected$ = this.selectedNodeSource.asObservable();

    constructor(private apiService: ApiService) { }
    
    getNodes( system : string )
    {
        return this.apiService.getNodes( system );
    }

    postTop( params : any )
    {
        return this.apiService.postTop( params );
    }

    postFos( params : any )
    {
        return this.apiService.postExploreFos( params );
    }

    postTop10( params : any )
    {
        return this.apiService.postExploreTop10( params );
    }

    postJobsPerWeek( params : any )
    {
        return this.apiService.postExploreJPW( params );
    }

    postTSUsage( params : any )
    {
        return this.apiService.postExploreTSU( params );
    }

    postSysMapSide( params : any )
    {
        return this.apiService.postExploreSysMapSide( params );
    }

    postSysMapFos( params : any )
    {
        return this.apiService.postExploreSysMapFOS( params );
    }

    postSysMapProj( params : any )
    {
        return this.apiService.postExploreSysMapProj( params );
    }

    postSysMapInst( params : any )
    {
        return this.apiService.postExploreSysMapInst( params );
    }

    isRack( data : Rack | string ) : data is Rack
    {
        return (data as Rack).name !== undefined;
    }

    selectedRack( rack : Rack )
    {
        this.selectedRackSource.next( rack );
    }

    selectedNode( node : string )
    {
        this.selectedNodeSource.next( node );
    }
}
