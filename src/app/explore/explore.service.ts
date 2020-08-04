import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class ExploreService {

    constructor(private apiService: ApiService) { }

    postTop( params : any )
    {
        return this.apiService.postTop( params );
    }

    getNodes( system : string )
    {
        return this.apiService.getNodes( system );
    }
}