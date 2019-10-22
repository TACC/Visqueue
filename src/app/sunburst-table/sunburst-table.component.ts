import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SunburstService } from '../sunburst.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-sunburst-table',
  templateUrl: './sunburst-table.component.html',
  styleUrls: ['./sunburst-table.component.scss']
})
export class SunburstTableComponent implements OnInit
{

    dataSource : any;

    @Input() dataSrc : string;

    @ViewChild( MatSort, { static : true } ) sort : MatSort;

    displayedColumns: string[] = [ 'name', 'science', 'institution', 'jobs', 'nodes' ];


    constructor( private sunburstService : SunburstService ) { }

  ngOnInit()
  {
      this.sunburstService.getTestData( this.dataSrc )
        .subscribe( ( data : any ) =>
        {
            let result = [];

            for ( const tFos of data.children )
            {


                for( const tProject of tFos.children )
                {

                    const newProject = 
                    {
                        name        : tProject.name,
                        science     : tFos.name,
                        institution : tProject.pi_institution,
                        jobs        : 0,
                        nodes       : 0
                    };

                    for( const tJob of tProject.children )
                    {

                        newProject.jobs  += 1;
                        newProject.nodes += tJob.size;

                    }

                    result.push( newProject );
                }
            }

            this.dataSource = new MatTableDataSource( result );
            this.dataSource.sort = this.sort;

        });
  }

}
