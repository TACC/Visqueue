import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SunburstService } from '../sunburst.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-sunburst-table',
    templateUrl: './sunburst-table.component.html',
    styleUrls: ['./sunburst-table.component.scss']
})
export class SunburstTableComponent implements OnInit
{

    dataSource: any;

    @Input() dataSrc: string;

    @ViewChild( MatSort, { static: true } ) sort: MatSort;

    private systemName : string;

    displayedColumns: string[] = ['name', 'science', 'institution', 'jobs', 'nodes'];


    constructor( private sunburstService : SunburstService,
                 private route           : ActivatedRoute ) { }

    ngOnInit()
    {

        if( this.route.snapshot.params.name )
        {
            this.dataSrc = this.route.snapshot.params.name;
        }

        this.sunburstService.getTestData(this.dataSrc + '.json')
            .subscribe((data: any) =>
            {
                const result = [];

                this.systemName = data.name;

                for (const tFos of data.children)
                {


                    for (const tProject of tFos.children)
                    {

                        const newProject =
                        {
                            name: tProject.name,
                            science: tFos.name,
                            institution: tProject.pi_institution,
                            jobs: 0,
                            nodes: 0
                        };

                        for (const tJob of tProject.children)
                        {

                            newProject.jobs += 1;
                            newProject.nodes += tJob.size;

                        }

                        result.push(newProject);
                    }
                }

                this.dataSource = new MatTableDataSource(result);
                this.dataSource.sort = this.sort;

            });

    }

    cellClick( row : any, type : string )
    {

        this.sunburstService.setCellSelect( { data : row, cellName : type, system : this.systemName } );

    }
}
