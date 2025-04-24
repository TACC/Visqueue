import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    imports : [
        MatMenuModule, 
        MatButtonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule    
    ],
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
