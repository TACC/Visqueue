import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SunburstDialogComponent } from 'src/app/sunburst-dialog/sunburst-dialog.component';

export interface TableInfoElement 
{
    name        : string;
    fos         : string;
    institution : string;
    abstract    : string;
    job_total   : number;
    node_total  : number;
    sec_total   : number;
    hr_total    : number;
}

@Component({
    selector: 'app-info-table',
    templateUrl: './info-table.component.html',
    styleUrls: ['./info-table.component.scss']
})
export class InfoTableComponent implements OnInit, OnChanges {

    displayedColumns: string[] = [ 'name', 'fos', 'institution', 'job_total', 'node_total', 'hr_total', 'abstract' ];
    dataSource: MatTableDataSource<TableInfoElement>;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @Input() public tableData: TableInfoElement[];

    constructor(private dialog : MatDialog ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void 
    {

        if (!this.tableData) 
        {
            return;
        }

        this.tableData.forEach(proj => 
        {
            proj.hr_total = proj.sec_total;

            // convert from seconds to minutes
            proj.hr_total = proj.hr_total / 60;
            
            // convert from minutes to hours
            proj.hr_total = proj.hr_total / 60;
        });

        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

    }

    showDescription( element : any ) : void 
    {

        this.dialog.open( SunburstDialogComponent, 
            {
                width : '50vw',
                data  : element
            });
    }
}
