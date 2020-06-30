import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    constructor(
        private apiService: ApiService
    ) { }

    getFosTimeSeries( system : string )
    {
        return this.apiService.postFosTimeSeries( system );
    }
}
