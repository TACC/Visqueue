import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SunburstService } from '../sunburst.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SunburstDialogComponent } from '../sunburst-dialog/sunburst-dialog.component';


@Component({
    selector: 'app-sunburst-table',
    templateUrl: './sunburst-table.component.html',
    styleUrls: ['./sunburst-table.component.scss']
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


    displayedColumns: string[] = [ 'institution', 'science', 'jobs', 'nodes', 'description' ];


    constructor( private sunburstService : SunburstService,
                 private route           : ActivatedRoute,
                 private dialog          : MatDialog ) { }

    ngOnInit()
    {

        if( this.route.snapshot.params.name )
        {
            this.dataSrc = this.route.snapshot.params.name;
        }

        this.sunburstService.getStaticData(this.dataSrc + '.json')
            .subscribe((data: any) =>
            {

                const result = [];

                let t_projectCount = 0;

                console.log( data );

                this.systemName = data.name;

                for (const tFos of data.children)
                {


                    for (const tProject of tFos.children)
                    {

                        const newProject =
                        {
                            name        : tProject.name,
                            science     : tFos.name,
                            institution : tProject.pi_institution,
                            pi          : tProject.principal_investigator,
                            description : tProject.project_abstract,
                            jobs        : 0,
                            nodes       : 0
                        };

                        for (const tJob of tProject.children)
                        {

                            newProject.jobs += 1;
                            newProject.nodes += tJob.size;

                        }

                        t_projectCount++;
                        result.push(newProject);
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
