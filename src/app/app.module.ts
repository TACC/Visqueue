import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SunburstComponent } from './sunburst/sunburst.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SunburstTableComponent } from './sunburst-table/sunburst-table.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { Stampede2Component } from './stampede2/stampede2.component';
import { FronteraComponent } from './frontera/frontera.component';

@NgModule({
  declarations: [
    AppComponent,
    SunburstComponent,
    HomepageComponent,
    SunburstTableComponent,
    Stampede2Component,
    FronteraComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
