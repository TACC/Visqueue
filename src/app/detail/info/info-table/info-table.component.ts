import { Component, OnInit } from '@angular/core';

export interface TableInfoElement
{
  fos      : string;
  projects : number;
  jobs     : number;
  nodes    : number;
  duration : number;
}

const ELEMENT_DATA: TableInfoElement[] = [
  { fos: 'Materials Research (DMR)', projects: 100,  jobs: 10000, nodes: 10000,  duration : 1000000 },
  { fos: 'BioPhysics',               projects: 200,  jobs: 9000,  nodes: 20000,  duration : 900000 },
  { fos: 'Fluid Dynamics',           projects: 300,  jobs: 8000,  nodes: 30000,  duration : 800000 },
  { fos: 'Astronomical',             projects: 400,  jobs: 7000,  nodes: 40000,  duration : 700000 },
  { fos: 'Physics',                  projects: 500,  jobs: 6000,  nodes: 50000,  duration : 600000 },
  { fos: 'Engineering',              projects: 600,  jobs: 5000,  nodes: 60000,  duration : 500000 },
  { fos: 'Training',                 projects: 700,  jobs: 4000,  nodes: 70000,  duration : 400000 },
  { fos: 'Chemistry',                projects: 800,  jobs: 3000,  nodes: 80000,  duration : 300000 },
  { fos: 'ASC',                      projects: 900,  jobs: 2000,  nodes: 90000,  duration : 200000 },
  { fos: 'Visualization',            projects: 1000, jobs: 1000,  nodes: 100000, duration : 100000 }
];

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.scss']
})
export class InfoTableComponent implements OnInit {

  displayedColumns: string[] = ['fos', 'projects', 'jobs', 'nodes', 'duration' ];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
