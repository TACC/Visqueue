import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ColorService } from 'src/app/color.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    constructor(
        private apiService: ApiService,
        private colorService : ColorService
    ) { }

    getFosTimeSeries( system : string ) : Observable<Object>
    {
        return this.apiService.postFosTimeSeries( system );
    }

    getFosColor( fos : string ) : string
    {
        return this.colorService.getFosColor( fos );
    }

    getNodes( system : string )
    {
        return this.apiService.getNodes( system );
    }

    postNodes( node : string, system : string )
    {

    }
}
