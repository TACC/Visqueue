import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

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
}
