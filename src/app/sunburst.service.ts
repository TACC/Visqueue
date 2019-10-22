import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SunburstService
{

  constructor( private http : HttpClient ){ }

  getTestData( filename : string )
  {
      return this.http.get( '/assets/datasets/' + filename );
  }
}
