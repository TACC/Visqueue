import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface TableInfoElement {
  name: string;
  projects: number;
  jobs: number;
  nodes: number;
}

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.scss']
})
export class InfoTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['name', 'fos', 'jobs', 'nodes'];
  dataSource : MatTableDataSource<TableInfoElement>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Input() public tableData : TableInfoElement [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges( changes : SimpleChanges ) : void
  {
    console.log( this.tableData );

    this.dataSource = new MatTableDataSource( this.tableData );
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;

  }
}
