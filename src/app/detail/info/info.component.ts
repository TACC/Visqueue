import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoTableComponent } from './info-table/info-table.component';
import { tileLayer, latLng } from 'leaflet';

enum JobsDisplay 
{
   'Total',
   'Completed',
   'Cancelled' 
};

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit
{

    @ViewChild( InfoTableComponent, { static : false } ) infotable;

    public fosByProjBarChartOptions : ChartOptions = 
    {
        title : 
        { 
            display : true,
            text    : 'Primary Field of Sciences by # of Projects'
        },
        responsive : true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [ { } ],
            yAxes: 
            [ 
                { 
                    ticks : 
                    { 
                        beginAtZero : true,
                        callback : function( value, index, values )
                        {
                            return parseInt(value).toLocaleString();
                        }
                    }, 
                    scaleLabel : 
                    { 
                        display : true, 
                        labelString : '# Projects' 
                    }
                }
            ]
        },
        plugins:
        {
            datalabels:
            {
                anchor: 'end',
                align: 'end',
            }
        }
    };

    public fosByJobBarChartOptions : ChartOptions = 
    {
        title : 
        { 
            display : true,
            text    : 'Primary Field of Sciences by # of Jobs'
        },
        responsive : true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [ { } ],
            yAxes: 
            [ 
                { 
                    ticks : 
                    { 
                        beginAtZero : true,
                        callback : function( value, index, values )
                        {
                            return parseInt(value).toLocaleString();
                        }
                    }, 
                    scaleLabel : 
                    { 
                        display : true, 
                        labelString : '# Jobs' 
                    }
                }
            ]
        },
        plugins:
        {
            datalabels:
            {
                anchor: 'end',
                align: 'end',
            }
        },
        tooltips : 
        {
            callbacks : 
            {
                label : function( tooltipItem, data )
                {   
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) 
                    {
                        label += ': ';
                    }
                    
                    label +=  parseInt( <string>tooltipItem.yLabel ).toLocaleString();;
                
                    return label;
                }
            }
        }
    };

    public fosByNodesBarChartOptions : ChartOptions = 
    {
        title : 
        { 
            display : true,
            text    : 'Primary Field of Sciences by # of Nodes'
        },
        responsive : true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [ { } ],
            yAxes: 
            [ 
                { 
                    ticks : 
                    { 
                        beginAtZero : true,
                        callback : function( value, index, values )
                        {
                            return parseInt(value).toLocaleString();
                        } 
                    }, 
                    scaleLabel : 
                    { 
                        display : true, 
                        labelString : '# Nodes' 
                    } 
                }
            ]
        },
        plugins:
        {
            datalabels:
            {
                anchor: 'end',
                align: 'end',
            }
        },
        tooltips : 
        {
            callbacks : 
            {
                label : function( tooltipItem, data )
                {   
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) 
                    {
                        label += ': ';
                    }
                    
                    label +=  parseInt( <string>tooltipItem.yLabel ).toLocaleString();;
                
                    return label;
                }
            }
        }
    };

    public fosByDurationBarChartOptions : ChartOptions = 
    {
        title : 
        { 
            display : true,
            text    : 'Primary Field of Sciences by Duration (Hours)'
        },
        responsive : true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [ { } ],
            yAxes: 
            [ 
                { ticks : { beginAtZero : true }, scaleLabel : { display : true, labelString : 'Duration' } }
            ]
        },
        plugins:
        {
            datalabels:
            {
                anchor: 'end',
                align: 'end',
            }
        },
        tooltips : 
        {
            callbacks : 
            {
                label : function( tooltipItem, data )
                {   
                    let label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) 
                    {
                        label += ': ';
                    }
                    
                    label +=  parseInt( <string>tooltipItem.yLabel ).toLocaleString();;
                
                    return label;
                }
            }
        }
    };

    public fosByProjBarChartLabels: Label[] = [];
    public fosByProjBarChartType: ChartType = 'bar';
    public fosByProjBarChartLegend = false;

    public fosByJobBarChartLabels: Label[] = [];
    public fosByJobBarChartType: ChartType = 'bar';
    public fosByJobBarChartLegend = false;

    public fosByNodesBarChartLabels: Label[] = [];
    public fosByNodesBarChartType: ChartType = 'bar';
    public fosByNodesBarChartLegend = false;

    public fosByDurationBarChartLabels: Label[] = [];
    public fosByDurationBarChartType: ChartType = 'bar';
    public fosByDurationBarChartLegend = false;

    public fosByProjBarChartData: ChartDataSets[] = [
        {
            label : '# Projects',
            data : [],
            backgroundColor :
            [
                'rgba(77,121,168, 0.8)',
                'rgba(242, 142, 48, 0.8)',
                'rgba(225,87,88, 0.8)',
                'rgba(118,183,178, 0.8)',
                'rgba(89,161,78, 0.8)',
                'rgba(237,201,72, 0.8)',
                'rgba(175,122,161, 0.8)',
                'rgba(242,156,166, 0.8)',
                'rgba(156,117,95, 0.8)'
            ]
        }
    ];

    public fosByJobBarChartData: ChartDataSets[] = [
        {
            label : '# Jobs',
            data : [],
            backgroundColor :
            [
                'rgba(77,121,168, 0.8)',
                'rgba(242, 142, 48, 0.8)',
                'rgba(225,87,88, 0.8)',
                'rgba(118,183,178, 0.8)',
                'rgba(89,161,78, 0.8)',
                'rgba(237,201,72, 0.8)',
                'rgba(175,122,161, 0.8)',
                'rgba(242,156,166, 0.8)',
                'rgba(156,117,95, 0.8)'
            ]
        }
    ];

    public fosByNodesBarChartData: ChartDataSets[] = [
        {
            label : '# Nodes',
            data : [],
            backgroundColor :
            [
                'rgba(77,121,168, 0.8)',
                'rgba(242, 142, 48, 0.8)',
                'rgba(225,87,88, 0.8)',
                'rgba(118,183,178, 0.8)',
                'rgba(89,161,78, 0.8)',
                'rgba(237,201,72, 0.8)',
                'rgba(175,122,161, 0.8)',
                'rgba(242,156,166, 0.8)',
                'rgba(156,117,95, 0.8)'
            ]
        }
    ];

    fosTotal         : number;
    projectsTotal    : number;
    jobsTotal        : number;
    jobsCompleted    : number;
    jobsCancelled    : number;
    institutionTotal : number;

    JobsDisplayEnum  =  JobsDisplay;
    jobVal : JobsDisplay;

    fosTableData : any;
    fosMapData   : any;

    

    constructor(
        private apiService : ApiService,
        private route      : ActivatedRoute) { }

    ngOnInit()
    {

        this.route.paramMap.subscribe( (params : ParamMap ) =>
        {

            this.apiService.postInfo( params.get('name') )
                .subscribe( ( data : any ) =>
                {

                    // console.log( data );

                    this.jobsTotal        = data.jobs_total;
                    this.jobsCompleted    = data.jobs_completed;
                    this.jobsCancelled    = data.jobs_cancelled;

                    this.projectsTotal    = data.proj_total;
                    this.institutionTotal = data.inst_total;

                    this.fosTableData = data.proj_info;
                    this.fosMapData   = data.inst_info;

                    let fosByProjData     = [ ...data.fos_info ];
                    let fosByJobData      = [ ...data.fos_info ];
                    let fosByNodesData    = [ ...data.fos_info ];
                    let fosByDurationData = [ ...data.fos_info ];

                    fosByProjData = this.sortArr( fosByProjData, 'proj_total' );
                    this.pushData( fosByProjData, this.fosByProjBarChartLabels, this.fosByProjBarChartData, 'proj_total' );

                    fosByJobData = this.sortArr( fosByJobData, 'jobs_total' );
                    this.pushData( fosByJobData, this.fosByJobBarChartLabels, this.fosByJobBarChartData, 'jobs_total' );

                    fosByNodesData = this.sortArr( fosByNodesData, 'nodes_total' );
                    this.pushData( fosByNodesData, this.fosByNodesBarChartLabels, this.fosByNodesBarChartData, 'nodes_total' );

                    this.jobVal = JobsDisplay.Total;

                } );

            });

    }

    jobsText(newEnum : JobsDisplay ) : void
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

    pushData( arr : any[], labels : Label[], dataset : ChartDataSets[], val : string ) : void
    {
        arr.forEach( ( value, index ) =>
        {
           labels.push( arr[ index ].fos );
            dataset[0].data.push( arr[ index ][val] );

        });
    }

}
