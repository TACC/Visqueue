import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
    providedIn: 'root'
})
export class SunburstService
{

    private arcSource = new Subject<any>();
    currentArc = this.arcSource.asObservable();

    constructor(
        private http: HttpClient,
    private apiService : ApiService) { }

    getLiveData( system : string )
    {
        return this.apiService.getLive( system );
    }

    getStaticData(filename: string)
    {
        return this.http.get('https://visqueue.tacc.utexas.edu/static_data/' + filename);
    }

    setCellSelect( cell : any )
    {
        this.arcSource.next( cell );
    }

}
