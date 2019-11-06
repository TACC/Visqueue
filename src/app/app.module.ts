import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SunburstComponent, SunburstDialog } from './sunburst/sunburst.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SunburstTableComponent } from './sunburst-table/sunburst-table.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { DetailComponent } from './detail/detail.component';
import { SearchComponent } from './search/search.component';
import { JobDurationPipe } from './job-duration.pipe';
import { BarChartComponent } from './search/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SunburstComponent,
    HomepageComponent,
    SunburstTableComponent,
    DetailComponent,
    SunburstDialog,
    SearchComponent,
    JobDurationPipe,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    AngularMaterialModule,
    HighchartsChartModule
  ],
  entryComponents: [DetailComponent, SunburstDialog],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
