import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoTableComponent } from './info-table/info-table.component';
import { InfoService } from './info.service';
import { ColorService } from 'src/app/color.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BaseChartDirective } from 'ng2-charts';
import { TimeSeriesGraphComponent } from './time-series-graph/time-series-graph.component';

enum JobsDisplay 
{
   'Total',
   'Completed' 
};


@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
    imports: [ 
        CommonModule,
        BaseChartDirective,
        MatCardModule,
        MatButtonToggleModule,
        TimeSeriesGraphComponent
    ],
    providers: [InfoService]
})
export class InfoComponent implements OnInit
{
    @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
    @ViewChild(InfoTableComponent) infotable;

    public fosByProjBarChartOptions     : ChartConfiguration['options'] = {};
    public fosByJobBarChartOptions      : ChartConfiguration['options'] = {};
    public fosByNodesBarChartOptions    : ChartConfiguration['options'] = {};
    public fosByDurationBarChartOptions : ChartConfiguration['options'] = {};

    public fosByProjBarChartData:     ChartData<'bar'> = { labels: [], datasets: [] };
    public fosByJobBarChartData:      ChartData<'bar'> = { labels: [], datasets: [] };
    public fosByNodesBarChartData:    ChartData<'bar'> = { labels: [], datasets: [] };
    public fosByDurationBarChartData: ChartData<'bar'> = { labels: [], datasets: [] };

    public barChartLegend = false;

    system : string;

    timestamp : string;

    JobsDisplayEnum  =  JobsDisplay;
    jobVal: JobsDisplay;
    jobTotal: number;
    jobCompleted: number;

    hrsTotal     : number;
    projTotal    : number;
    instTotal    : number;

    constructor(
        private apiService   : ApiService,
        private infoService  : InfoService,
        private route        : ActivatedRoute,
        private colorService : ColorService ) { }

    ngOnInit()
    {
        this.fosByProjBarChartOptions     = this.getBarChartOptions( 'Field of Science by # of Projects', 'Field of Science', '# Projects' );
        this.fosByJobBarChartOptions      = this.getBarChartOptions( 'Field of Science by # of Jobs', 'Field of Science', '# Jobs' );
        this.fosByNodesBarChartOptions    = this.getBarChartOptions( 'Field of Science by # of Nodes', 'Field of Science', '# Nodes' );
        this.fosByDurationBarChartOptions = this.getBarChartOptions( 'Field of Science by Duration', 'Field of Science', 'Duration (Hours)' );

        this.route.paramMap.subscribe( (params : ParamMap ) =>
        {

            this.system = params.get('name');

            this.apiService.postInfo( params.get('name') )
            .subscribe({
                next: ( data : any ) =>
                {

                    data.fos_info.forEach( ( value ) =>
                        {
                            value.duration = value.sec_total;
        
                            // convert from seconds to minutes
                            value.duration = value.duration / 60;
                            
                            // convert from minutes to hours
                            value.duration = value.duration / 60;
                            
                    });

                    this.timestamp = data.timestamp;  
                
                    this.jobTotal        = data.job_total;
                    this.jobCompleted    = data.job_completed;

                    this.hrsTotal  = data.sec_total;

                    // convert from seconds to minutes
                    this.hrsTotal = this.hrsTotal / 60;
                    
                    // convert from minutes to hours
                    this.hrsTotal = this.hrsTotal / 60;

                    this.projTotal = data.proj_total;

                    this.instTotal = data.inst_total;


                    // fos by projects bar chart
                    let fosByProjData     = [ ...data.fos_info ]; 

                    fosByProjData = this.sortArr( fosByProjData, 'proj_total' );

                    this.fosByProjBarChartData.labels   = fosByProjData.map( ( d : any ) => d.abbrev );
                    
                    this.fosByProjBarChartData.datasets = [
                    {
                        data: fosByProjData.map( ( d : any ) => d.proj_total ),
                        backgroundColor : fosByProjData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                    }];

                    // fos By Jobs Bar Chart
                    let fosByJobData      = [ ...data.fos_info ];

                    fosByJobData = this.sortArr( fosByJobData, 'job_total' );

                    this.fosByJobBarChartData.labels = fosByJobData.map( ( d : any ) => d.abbrev );
                    
                    this.fosByJobBarChartData.datasets = [
                        {
                            data: fosByJobData.map( ( d : any ) => d.job_total ),
                            backgroundColor : fosByJobData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                        }

                    ];

                    // fos By Nodes Bar Chart
                    let fosByNodesData     = [ ...data.fos_info ];                        

                    fosByNodesData = this.sortArr( fosByNodesData, 'node_total' );

                    this.fosByNodesBarChartData.labels = fosByNodesData.map( ( d : any ) => d.abbrev );
                                        
                    this.fosByNodesBarChartData.datasets = [
                        {
                            data: fosByNodesData.map( ( d : any ) => d.node_total ),
                            backgroundColor : fosByNodesData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                        }

                    ];

                    // fos By Duration Bar Chart
                    let fosByDurationData     = [ ...data.fos_info ];                        

                    fosByDurationData = this.sortArr( fosByDurationData, 'duration' );

                    this.fosByDurationBarChartData.labels = fosByDurationData.map( ( d : any ) => d.abbrev );
                                        
                    this.fosByDurationBarChartData.datasets = [
                        {
                            data: fosByDurationData.map( ( d : any ) => d.duration ),
                            backgroundColor : fosByDurationData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                        }

                    ];

                },
                error: ( error : any ) =>
                {
                    console.log( 'Error: ', error );
                },
                complete: () =>
                {
                    this.charts.forEach(chart => {
                        chart.chart?.update();
                    });
                }
            });


        });

    }

    jobsText(newEnum : any ) : void
    {
        this.jobVal = newEnum;
    }

    sortArr( arr : any[ ], val : string ) : any[]
    {
        return arr.sort( ( a, b ) =>
        {
            return ( a[val] > b[val] ) ? -1 : 1;
        });
    }

    getBarChartOptions( titleText : string, xAxisText : string, yAxisText : string) : ChartOptions<'bar'> 
    {
         return {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: titleText,
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xAxisText,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return parseInt(value as string).toLocaleString();
                        },
                    },
                    title: {
                        display: true,
                        text: yAxisText,
                    },
                },
            },
         } as ChartOptions<'bar'>;
    }

}
