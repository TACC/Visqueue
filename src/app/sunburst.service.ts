import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SunburstService
{

    private arcSource = new Subject<any>();
    currentArc = this.arcSource.asObservable();


    constructor(private http: HttpClient) { }

    getTestData(filename: string)
    {
        return this.http.get('/assets/datasets/' + filename);
    }

    setCellSelect( cell : any )
    {
        this.arcSource.next( cell );
    }
}
