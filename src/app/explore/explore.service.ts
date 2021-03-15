import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Rack } from '../models/rack';

@Injectable({
    providedIn: 'root'
})
export class ExploreService {

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

    isRack( data : Rack | string ) : data is Rack
    {
        return (data as Rack).name !== undefined;
    }
}
