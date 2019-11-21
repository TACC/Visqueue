import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  fos: string;
  projects : number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { fos: 'Materials Research (DMR)', projects: 100,  weight: 1.0079, symbol: 'H' },
  { fos: 'BioPhysics',               projects: 200,  weight: 4.0026, symbol: 'He' },
  { fos: 'Fluid Dynamics',           projects: 300,  weight: 6.941, symbol: 'Li' },
  { fos: 'Astronomical',             projects: 400,  weight: 9.0122, symbol: 'Be' },
  { fos: 'Physics',                  projects: 500,  weight: 10.811, symbol: 'B' },
  { fos: 'Engineering',              projects: 600,  weight: 12.0107, symbol: 'C' },
  { fos: 'Training',                 projects: 700,  weight: 14.0067, symbol: 'N' },
  { fos: 'Chemistry',                projects: 800,  weight: 15.9994, symbol: 'O' },
  { fos: 'ASC',                      projects: 900,  weight: 18.9984, symbol: 'F' },
  { fos: 'Visualization',            projects: 1000, weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-info-table',
  templateUrl: './info-table.component.html',
  styleUrls: ['./info-table.component.scss']
})
export class InfoTableComponent implements OnInit {

  displayedColumns: string[] = ['fos', 'projects', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
