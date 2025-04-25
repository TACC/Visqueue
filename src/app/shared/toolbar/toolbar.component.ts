import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { octMarkGithubLarge } from "@ng-icons/octicons/large";
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
        MatIconModule,
        NgIcon,    
    ],
    viewProviders: [
        provideIcons({
            octMarkGithubLarge,
        })]
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
