import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChartOptions, ChartType, ChartDataset, ChartConfiguration } from 'chart.js';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoTableComponent } from './info-table/info-table.component';
import { InfoService } from './info.service';
import { ColorService } from 'src/app/color.service';
import { BaseChartDirective } from 'ng2-charts';

enum JobsDisplay 
{
   'Total',
   'Completed' 
};


@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
    imports: [ BaseChartDirective ],
    providers: [InfoService]
})
export class InfoComponent implements OnInit
{

    @ViewChild(InfoTableComponent) infotable;

    // public fosByProjBarChartOptions : ChartConfiguration['options'] = 
    // {
    //     title : 
    //     { 
    //         display : true,
    //         text    : 'Primary Field of Sciences by # of Projects'
    //     },
    //     responsive : true,
    //     // We use these empty structures as placeholders for dynamic theming.
    //     scales: {
    //         xAxes: [ { } ],
    //         yAxes: 
    //         [ 
    //             { 
    //                 ticks : 
    //                 { 
    //                     beginAtZero : true,
    //                     callback : function(value, index, values )
    //                     {
    //                         let valStr = <string> value;

    //                         return parseInt(valStr).toLocaleString();
    //                     }
    //                 }, 
    //                 scaleLabel : 
    //                 { 
    //                     display : true, 
    //                     labelString : '# Projects' 
    //                 }
    //             }
    //         ]
    //     },
    //     plugins:
    //     {
    //         datalabels:
    //         {
    //             anchor: 'end',
    //             align: 'end',
    //         }
    //     }
    // };

    // public fosByJobBarChartOptions : ChartOptions = 
    // {
    //     title : 
    //     { 
    //         display : true,
    //         text    : 'Primary Field of Sciences by # of Jobs'
    //     },
    //     responsive : true,
    //     // We use these empty structures as placeholders for dynamic theming.
    //     scales: {
    //         xAxes: [ { } ],
    //         yAxes: 
    //         [ 
    //             { 
    //                 ticks : 
    //                 { 
    //                     beginAtZero : true,
    //                     callback : function( value, index, values )
    //                     {
    //                         let valStr = <string> value;

    //                         return parseInt(valStr).toLocaleString();

    //                     }
    //                 }, 
    //                 scaleLabel : 
    //                 { 
    //                     display : true, 
    //                     labelString : '# Jobs' 
    //                 }
    //             }
    //         ]
    //     },
    //     plugins:
    //     {
    //         datalabels:
    //         {
    //             anchor: 'end',
    //             align: 'end',
    //         }
    //     },
    //     tooltips : 
    //     {
    //         callbacks : 
    //         {
    //             label : function( tooltipItem, data )
    //             {   
    //                 let label = data.datasets[tooltipItem.datasetIndex].label || '';

    //                 if (label) 
    //                 {
    //                     label += ': ';
    //                 }
                    
    //                 label +=  parseInt( <string>tooltipItem.yLabel ).toLocaleString();;
                
    //                 return label;
    //             }
    //         }
    //     }
    // };

    // public fosByNodesBarChartOptions : ChartOptions = 
    // {
    //     title : 
    //     { 
    //         display : true,
    //         text    : 'Primary Field of Sciences by # of Nodes'
    //     },
    //     responsive : true,
    //     // We use these empty structures as placeholders for dynamic theming.
    //     scales: {
    //         xAxes: [ { } ],
    //         yAxes: 
    //         [ 
    //             { 
    //                 ticks : 
    //                 { 
    //                     beginAtZero : true,
    //                     callback : function( value, index, values )
    //                     {
    //                         let valStr = <string> value;

    //                         return parseInt(valStr).toLocaleString();
    //                     } 
    //                 }, 
    //                 scaleLabel : 
    //                 { 
    //                     display : true, 
    //                     labelString : '# Nodes' 
    //                 } 
    //             }
    //         ]
    //     },
    //     plugins:
    //     {
    //         datalabels:
    //         {
    //             anchor: 'end',
    //             align: 'end',
    //         }
    //     },
    //     tooltips : 
    //     {
    //         callbacks : 
    //         {
    //             label : function( tooltipItem, data )
    //             {   
    //                 let label = data.datasets[tooltipItem.datasetIndex].label || '';

    //                 if (label) 
    //                 {
    //                     label += ': ';
    //                 }
                    
    //                 label +=  parseInt( <string>tooltipItem.yLabel ).toLocaleString();;
                
    //                 return label;
    //             }
    //         }
    //     }
    // };

    // public fosByDurationBarChartOptions : ChartOptions = 
    // {
    //     title : 
    //     { 
    //         display : true,
    //         text    : 'Primary Field of Sciences by Duration'
    //     },
    //     responsive : true,
    //     // We use these empty structures as placeholders for dynamic theming.
    //     scales: {
    //         xAxes: [ { } ],
    //         yAxes: 
    //         [ 
    //             { 
    //                 ticks : 
    //                 { 
    //                     beginAtZero : true,
    //                     callback : function( value, index, values )
    //                     {
    //                         let valStr = <string> value;

    //                         return parseInt(valStr).toLocaleString();
    //                     } 
    //                 }, 
    //                 scaleLabel : 
    //                 { 
    //                     display : true, 
    //                     labelString : 'Duration (Hours)' 
    //                 } 
    //             }
    //         ]
    //     },
    //     plugins:
    //     {
    //         datalabels:
    //         {
    //             anchor: 'end',
    //             align: 'end',
    //         }
    //     },
    //     tooltips : 
    //     {
    //         callbacks : 
    //         {
    //             label : function( tooltipItem, data )
    //             {   
    //                 let label = data.datasets[tooltipItem.datasetIndex].label || '';

    //                 if (label) 
    //                 {
    //                     label += ': ';
    //                 }
                    
    //                 label +=  parseInt( <string>tooltipItem.yLabel ).toLocaleString();;
                
    //                 return label;
    //             }
    //         }
    //     }
    // };

    // public fosByProjBarChartLabels: Label[] = [];
    // public fosByProjBarChartType: ChartType = 'bar';
    // public fosByProjBarChartColors : Color[] = [ { backgroundColor : [] } ];
    // public fosByProjBarChartLegend = false;

    // public fosByJobBarChartLabels: Label[] = [];
    // public fosByJobBarChartType: ChartType = 'bar';
    // public fosByJobBarChartColors : Color[] = [ { backgroundColor : [] } ];
    // public fosByJobBarChartLegend = false;

    // public fosByNodesBarChartLabels: Label[] = [];
    // public fosByNodesBarChartType: ChartType = 'bar';
    // public fosByNodesBarChartColors : Color[] = [ { backgroundColor : [] } ];
    // public fosByNodesBarChartLegend = false;

    // public fosByDurationBarChartLabels: Label[] = [];
    // public fosByDurationBarChartType: ChartType = 'bar';
    // public fosByDurationBarChartColors : Color[] = [ { backgroundColor : [] } ];
    // public fosByDurationBarChartLegend = false;

    // public fosByProjBarChartData: ChartDataset[] = [
    //     {
    //         label : '# Projects',
    //         data : []
    //     }
    // ];

    // public fosByJobBarChartData: ChartDataset[] = [
    //     {
    //         label : '# Jobs',
    //         data : []
    //     }
    // ];

    // public fosByNodesBarChartData: ChartDataset[] = [
    //     {
    //         label : '# Nodes',
    //         data : []
    //     }
    // ];

    // public fosByDurationBarChartData: ChartDataset[] = [
    //     {
    //         label : 'Duration(Hours)',
    //         data : []
    //     }
    // ];

    // fosTotal     : number;
    // projTotal    : number;
    // jobTotal     : number;
    // jobCompleted : number;
    // instTotal    : number;
    // hrsTotal     : number;
    // timestamp    : string;
    
    // JobsDisplayEnum  =  JobsDisplay;
    // jobVal : JobsDisplay;

    // fosTableData : any;
    // fosMapData   : any;

    // system : string;

    // constructor(
    //     private apiService   : ApiService,
    //     private infoService  : InfoService,
    //     private route        : ActivatedRoute,
    //     private colorService : ColorService ) { }

    ngOnInit()
    {

    //     this.route.paramMap.subscribe( (params : ParamMap ) =>
    //     {

    //         this.system = params.get('name');

    //         this.apiService.postInfo( params.get('name') )
    //             .subscribe( ( data : any ) =>
    //             {

    //                 this.timestamp = data.timestamp;

    //                 this.jobTotal        = data.job_total;
    //                 this.jobCompleted    = data.job_completed;

    //                 this.projTotal       = data.proj_total;
    //                 this.instTotal       = data.inst_total;

    //                 this.hrsTotal  = data.sec_total;

    //                 // convert from seconds to minutes
    //                 this.hrsTotal = this.hrsTotal / 60;
                    
    //                 // convert from minutes to hours
    //                 this.hrsTotal = this.hrsTotal / 60;
                    
    //                 data.fos_info.forEach( ( value, index ) =>
    //                 {
    //                     value.duration = value.sec_total;

    //                     // convert from seconds to minutes
    //                     value.duration = value.duration / 60;
                        
    //                     // convert from minutes to hours
    //                     value.duration = value.duration / 60;
                        
    //                 });

    //                 let fosByProjData     = [ ...data.fos_info ];
    //                 let fosByJobData      = [ ...data.fos_info ];
    //                 let fosByNodesData    = [ ...data.fos_info ];
    //                 let fosByDurationData = [ ...data.fos_info ];


    //                 fosByProjData = this.sortArr( fosByProjData, 'proj_total' );
    //                 this.pushData( fosByProjData, this.fosByProjBarChartLabels, this.fosByProjBarChartData, 'proj_total', this.fosByProjBarChartColors );

    //                 fosByJobData = this.sortArr( fosByJobData, 'job_total' );
    //                 this.pushData( fosByJobData, this.fosByJobBarChartLabels, this.fosByJobBarChartData, 'job_total', this.fosByJobBarChartColors );

    //                 fosByNodesData = this.sortArr( fosByNodesData, 'node_total' );
    //                 this.pushData( fosByNodesData, this.fosByNodesBarChartLabels, this.fosByNodesBarChartData, 'node_total', this.fosByNodesBarChartColors );

    //                 fosByDurationData = this.sortArr( fosByDurationData, 'duration' );
    //                 this.pushData( fosByDurationData, this.fosByDurationBarChartLabels, this.fosByDurationBarChartData, 'duration', this.fosByDurationBarChartColors );

    //                 this.fosMapData = data.inst_info;
    //                 this.fosTableData = data.proj_info;

    //                 this.jobVal = JobsDisplay.Total;

    //             } );

    //         });

    }



    // jobsText(newEnum : any ) : void
    // {
    //     this.jobVal = newEnum;
    // }

    // sortArr( arr : any[ ], val : string ) : any[]
    // {
    //     return arr.sort( ( a, b ) =>
    //     {
    //         return ( a[val] > b[val] ) ? -1 : 1;
    //     });
    // }

    // pushData( arr : any[], labels : Label[], dataset : ChartDataset[], val : string, colors : Color[] ) : void
    // {
    //     let colorArr = [];

    //     arr.forEach( ( value, index ) =>
    //     {

    //         let abbrev = arr[ index ][ 'abbrev' ];

    //         dataset[0].data.push( arr[ index ][ val ] );
            
    //         labels.push( abbrev );
    //         colorArr.push( this.colorService.getColorAbbrev( abbrev ) );

    //     });

    //     colors[0].backgroundColor = colorArr;
    // }

}
