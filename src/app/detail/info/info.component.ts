import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoTableComponent } from './info-table/info-table.component';

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
            text    : 'Top 10 Field of Sciences by # of Projects'
        },
        responsive : true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [ { } ],
            yAxes: 
            [ 
                { ticks : { beginAtZero : true }, scaleLabel : { display : true, labelString : '# Projects' } }
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
            text    : 'Top 10 Field of Sciences by # of Jobs'
        },
        responsive : true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [ { } ],
            yAxes: 
            [ 
                { ticks : { beginAtZero : true }, scaleLabel : { display : true, labelString : '# Jobs' } }
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

    public fosByNodesBarChartOptions : ChartOptions = 
    {
        title : 
        { 
            display : true,
            text    : 'Top 10 Field of Sciences by # of Nodes'
        },
        responsive : true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [ { } ],
            yAxes: 
            [ 
                { ticks : { beginAtZero : true }, scaleLabel : { display : true, labelString : '# Nodes' } }
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

    public fosByDurationBarChartOptions : ChartOptions = 
    {
        title : 
        { 
            display : true,
            text    : 'Top 10 Field of Sciences by Duration'
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
                'rgba(156,117,95, 0.8)',
                'rgba(186,176,171, 0.8)'
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
                'rgba(156,117,95, 0.8)',
                'rgba(186,176,171, 0.8)'
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
                'rgba(156,117,95, 0.8)',
                'rgba(186,176,171, 0.8)'
            ]
        }
    ];

    public fosByDurationBarChartData: ChartDataSets[] = [
        {
            label : 'Duration',
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
                'rgba(156,117,95, 0.8)',
                'rgba(186,176,171, 0.8)'
            ]
        }
    ];

    fosTotal         : number;
    projectsTotal    : number;
    jobsTotal        : number;
    institutionTotal : number;

    fosInfo : any;

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


                    this.projectsTotal    = data.projectsCount;
                    this.jobsTotal        = data.jobsCount;
                    this.fosTotal         = data.fosCount;
                    this.institutionTotal = data.institutionCount;

                    this.fosInfo = data.fosInfo;

                    const fosByProjData  = [ ...this.fosInfo ];
                    const fosByJobData   = [ ...this.fosInfo ];
                    const fosByNodesData = [ ...this.fosInfo ];


                    fosByProjData.sort( ( a, b ) =>
                    {
                        return ( a.projects > b.projects ) ? -1 : 1;
                    });

                    for ( let index = 0; index < 10; index++ )
                    {

                        this.fosByProjBarChartLabels.push( fosByProjData[ index ].name);
                        this.fosByProjBarChartData[0].data.push( fosByProjData[ index ].projects );

                    }

                    fosByJobData.sort( ( a, b ) =>
                    {
                        return ( a.jobs > b.jobs ) ? -1 : 1;
                    });

                    for ( let index = 0; index < 10; index++ )
                    {

                        this.fosByJobBarChartLabels.push( fosByJobData[ index ].name);
                        this.fosByJobBarChartData[0].data.push( fosByJobData[ index ].jobs );

                    }

                    fosByNodesData.sort( ( a, b ) =>
                    {
                        return ( a.nodes > b.nodes ) ? -1 : 1;
                    });

                    for ( let index = 0; index < 10; index++ )
                    {

                        this.fosByNodesBarChartLabels.push( fosByNodesData[ index ].name );
                        this.fosByNodesBarChartData[0].data.push( fosByNodesData[ index ].nodes );

                    }

                } );

            });

    }

}
