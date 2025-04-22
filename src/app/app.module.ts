import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { PlotlyViaCDNModule } from "angular-plotly.js";

PlotlyViaCDNModule.setPlotlyVersion('2.12.1'); // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.setPlotlyBundle('basic'); // optional: can be null (for full) or 'basic', 'cartesian', 'geo', 'gl3d', 'gl2d', 'mapbox' or 'finance'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SunburstComponent } from './sunburst/sunburst.component';
import { HomepageComponent }       from './homepage/homepage.component';
import { SunburstTableComponent }  from './sunburst-table/sunburst-table.component';
import { AngularMaterialModule }   from './shared/angular-material/angular-material.module';
import { DetailComponent }         from './detail/detail.component';
import { SearchComponent }         from './search/search.component';
import { JobDurationPipe }         from './job-duration.pipe';
import { BarChartComponent }       from './search/bar-chart/bar-chart.component';
import { InfoComponent }           from './detail/info/info.component';
import { InfoTableComponent }      from './detail/info/info-table/info-table.component';
import { InfoMapComponent        } from './detail/info/info-map/info-map.component';
import { SunburstDialogComponent } from './sunburst-dialog/sunburst-dialog.component';
import { ToolbarComponent        } from './shared/toolbar/toolbar.component';
import { FooterComponent         } from './shared/footer/footer.component';
import { CommonModule            } from '@angular/common';
import { TimeSeriesGraphComponent } from './detail/info/time-series-graph/time-series-graph.component';
import { NodeExplorerComponent } from './detail/info/node-explorer/node-explorer.component';


@NgModule({ declarations: [
        AppComponent,
        HomepageComponent,
        SunburstTableComponent,
        DetailComponent,
        SearchComponent,
        JobDurationPipe,
        BarChartComponent,
        InfoTableComponent,
        InfoMapComponent,
        SunburstDialogComponent,
        ToolbarComponent,
        FooterComponent,
        TimeSeriesGraphComponent,
        NodeExplorerComponent
    ],
    bootstrap: [AppComponent], 
    imports: [CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatMomentDateModule,
        AngularMaterialModule,
        LeafletModule,
        PlotlyViaCDNModule,
        InfoComponent,
        SunburstComponent,
        AppRoutingModule], 
    providers: 
        [provideHttpClient(withInterceptorsFromDi()),
         provideCharts(withDefaultRegisterables())   
        ] })
export class AppModule { }
