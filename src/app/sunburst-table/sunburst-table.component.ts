import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SunburstService } from '../sunburst.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SunburstDialogComponent } from '../sunburst-dialog/sunburst-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';


@Component({
    selector: 'app-sunburst-table',
    templateUrl: './sunburst-table.component.html',
    styleUrls: ['./sunburst-table.component.scss'],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        RouterModule
    ]
})
export class SunburstTableComponent implements OnInit
{

    dataSource: any;

    @Input() dataSrc: string;
    @Input() searchActive : boolean;
    @Input() heightCont : string;

    projectCount : number;
    systemName : string;

    @ViewChild( MatSort, { static: true } ) sort: MatSort;


    displayedColumns: string[] = [ 'institution', 'fos', 'job_total', 'node_total', 'abstract' ];


    constructor( private sunburstService : SunburstService,
                 private route           : ActivatedRoute,
                 private dialog          : MatDialog) { }

    ngOnInit()
    {

        if( this.route.snapshot.params.name )
        {
            this.dataSrc = this.route.snapshot.params.name;
        }

        this.sunburstService.getLiveData( this.dataSrc )
            .subscribe( ( data: any ) =>
            {

                const result = [];

                let t_projectCount = 0;

                this.systemName = data.name;

                for (const tFos of data.children)
                {

                    for (const tProject of tFos.children)
                    {
                        tProject[ 'fos' ] = tFos.name;
                        
                        t_projectCount++;
                        result.push( tProject );
                    }
                }

                this.projectCount = t_projectCount;

                this.dataSource = new MatTableDataSource(result);
                this.dataSource.sort = this.sort;

            });

    }

    cellClick( row : any, type : string )
    {

        this.sunburstService.setCellSelect( { data : row, cellName : type, system : this.systemName } );

    }

    searchFilter( searchValue : string )
    {
        this.dataSource.filter = searchValue.trim().toLowerCase();
    }

    showDescription( element : any )
    {
        this.dialog.open( SunburstDialogComponent, 
        {
            width : '50vw',
            data  : element
        });
    }
}
