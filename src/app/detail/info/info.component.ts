import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoTableComponent } from './info-table/info-table.component';
import { InfoService } from './info.service';

enum JobsDisplay 
{
   'Total',
   'Completed' 
};


@Component({
    selector    : 'app-info',
    templateUrl : './info.component.html',
    styleUrls   : ['./info.component.scss'],
    providers   : [ InfoService ] 
})
export class InfoComponent implements OnInit
{

    @ViewChild(InfoTableComponent) infotable;

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
                        callback : function(value, index, values )
                        {
                            let valStr = <string> value;

                            return parseInt(valStr).toLocaleString();
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
                            let valStr = <string> value;

                            return parseInt(valStr).toLocaleString();

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
                            let valStr = <string> value;

                            return parseInt(valStr).toLocaleString();
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
            text    : 'Primary Field of Sciences by Duration'
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
                            let valStr = <string> value;

                            return parseInt(valStr).toLocaleString();
                        } 
                    }, 
                    scaleLabel : 
                    { 
                        display : true, 
                        labelString : 'Duration (Hours)' 
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

    public fosByProjBarChartLabels: Label[] = [];
    public fosByProjBarChartType: ChartType = 'bar';
    public fosByProjBarChartColors : Color[] = [ { backgroundColor : [] } ];
    public fosByProjBarChartLegend = false;

    public fosByJobBarChartLabels: Label[] = [];
    public fosByJobBarChartType: ChartType = 'bar';
    public fosByJobBarChartColors : Color[] = [ { backgroundColor : [] } ];
    public fosByJobBarChartLegend = false;

    public fosByNodesBarChartLabels: Label[] = [];
    public fosByNodesBarChartType: ChartType = 'bar';
    public fosByNodesBarChartColors : Color[] = [ { backgroundColor : [] } ];
    public fosByNodesBarChartLegend = false;

    public fosByDurationBarChartLabels: Label[] = [];
    public fosByDurationBarChartType: ChartType = 'bar';
    public fosByDurationBarChartColors : Color[] = [ { backgroundColor : [] } ];
    public fosByDurationBarChartLegend = false;

    public fosByProjBarChartData: ChartDataSets[] = [
        {
            label : '# Projects',
            data : []
        }
    ];

    public fosByJobBarChartData: ChartDataSets[] = [
        {
            label : '# Jobs',
            data : []
        }
    ];

    public fosByNodesBarChartData: ChartDataSets[] = [
        {
            label : '# Nodes',
            data : []
        }
    ];

    public fosByDurationBarChartData: ChartDataSets[] = [
        {
            label : 'Duration(Hours)',
            data : []
        }
    ];

    fosTotal     : number;
    projTotal    : number;
    jobTotal     : number;
    jobCompleted : number;
    instTotal    : number;
    hrsTotal     : number;
    timestamp    : string;
    
    JobsDisplayEnum  =  JobsDisplay;
    jobVal : JobsDisplay;

    fosTableData : any;
    fosMapData   : any;

    colorDict : Map<string,string>;

    constructor(
        private apiService : ApiService,
        private infoService : InfoService,
        private route      : ActivatedRoute) { }

    ngOnInit()
    {
        this.initColorDict();

        this.route.paramMap.subscribe( (params : ParamMap ) =>
        {

            this.apiService.postInfo( params.get('name') )
                .subscribe( ( data : any ) =>
                {

                    this.timestamp = data.timestamp;

                    this.jobTotal        = data.job_total;
                    this.jobCompleted    = data.job_completed;

                    this.projTotal       = data.proj_total;
                    this.instTotal       = data.inst_total;

                    this.hrsTotal  = data.sec_total;

                    // convert from seconds to minutes
                    this.hrsTotal = this.hrsTotal / 60;
                    
                    // convert from minutes to hours
                    this.hrsTotal = this.hrsTotal / 60;
                    
                    data.fos_info.forEach( ( value, index ) =>
                    {
                        value.duration = value.sec_total;

                        // convert from seconds to minutes
                        value.duration = value.duration / 60;
                        
                        // convert from minutes to hours
                        value.duration = value.duration / 60;
                        
                    });

                    let fosByProjData     = [ ...data.fos_info ];
                    let fosByJobData      = [ ...data.fos_info ];
                    let fosByNodesData    = [ ...data.fos_info ];
                    let fosByDurationData = [ ...data.fos_info ];


                    fosByProjData = this.sortArr( fosByProjData, 'proj_total' );
                    this.pushData( fosByProjData, this.fosByProjBarChartLabels, this.fosByProjBarChartData, 'proj_total', this.fosByProjBarChartColors );

                    fosByJobData = this.sortArr( fosByJobData, 'job_total' );
                    this.pushData( fosByJobData, this.fosByJobBarChartLabels, this.fosByJobBarChartData, 'job_total', this.fosByJobBarChartColors );

                    fosByNodesData = this.sortArr( fosByNodesData, 'node_total' );
                    this.pushData( fosByNodesData, this.fosByNodesBarChartLabels, this.fosByNodesBarChartData, 'node_total', this.fosByNodesBarChartColors );

                    fosByDurationData = this.sortArr( fosByDurationData, 'duration' );
                    this.pushData( fosByDurationData, this.fosByDurationBarChartLabels, this.fosByDurationBarChartData, 'duration', this.fosByDurationBarChartColors );

                    this.fosMapData = data.inst_info;
                    this.fosTableData = data.proj_info;

                    this.jobVal = JobsDisplay.Total;

                } );

            });

    }

    initColorDict() : void
    {
        this.colorDict = new Map<string,string>();

        this.colorDict.set( 'MATHEMATICAL AND PHYSICAL SCIENCES (MPS)', 'rgba(77,121,168, 0.8)'  );
        this.colorDict.set( 'GEOSCIENCES (GEO)', 'rgba(242, 142, 48, 0.8)'  );
        this.colorDict.set( 'COMPUTER AND INFORMATION SCIENCE AND ENGINEERING (CISE)', 'rgba(225,87,88, 0.8)');
        this.colorDict.set( 'ENGINEERING (ENG)', 'rgba(118,183,178, 0.8)'   );
        this.colorDict.set( 'BIOLOGICAL, BEHAVIORAL, AND SOCIAL SCIENCES (BBS)', 'rgba(89,161,78, 0.8)' );
        this.colorDict.set( 'OTHER (TRA)', 'rgba(237,201,72, 0.8)'   );
        this.colorDict.set( 'SOCIAL, BEHAVIORIAL, AND ECONOMIC SCIENCES (SBE)', 'rgba(156,117,95, 0.8)'  );
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

    pushData( arr : any[], labels : Label[], dataset : ChartDataSets[], val : string, colors : Color[] ) : void
    {
        let colorArr = [];

        arr.forEach( ( value, index ) =>
        {
            labels.push( arr[ index ].name );
            dataset[0].data.push( arr[ index ][val] );

            colorArr.push( this.colorDict.get( value.name ) );

        });

        colors[0].backgroundColor = colorArr;
    }

}
