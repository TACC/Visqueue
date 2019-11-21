import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit
{

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

    constructor(private apiService : ApiService) { }

    ngOnInit()
    {
        this.apiService.postInfo( 'stampede2' )
            .subscribe( ( data : any ) =>
            {
                this.projectsTotal    = data.projectsCount;
                this.jobsTotal        = data.jobsCount;
                this.fosTotal         = data.fosCount;
                this.institutionTotal = data.institutionCount;

                for ( let index = 0; index < 10; index++ )
                {

                    this.fosByProjBarChartLabels.push( data.fosByProj[ index ].name );
                    this.fosByProjBarChartData[0].data.push( data.fosByProj[ index ].value );

                    this.fosByJobBarChartLabels.push( data.fosByJob[ index ].name );
                    this.fosByJobBarChartData[0].data.push( data.fosByJob[ index ].value );
                }

            } );
    }

}
