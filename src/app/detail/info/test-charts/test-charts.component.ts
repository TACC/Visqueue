import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from 'src/app/api.service';
import { InfoService } from '../info.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ColorService } from 'src/app/color.service';

@Component({
  selector: 'app-test-charts',
  imports: [BaseChartDirective],
  templateUrl: './test-charts.component.html',
  styleUrl: './test-charts.component.scss'
})
export class TestChartsComponent implements OnInit {

    @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

    public fosByProjBarChartOptions : ChartOptions<'bar'> = 
        {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Field of Sciences by # of Projects',
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
                        text: 'Fields of Science',
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
                        text: '# Projects',
                    },
                },
            },
        };

    public fosByJobBarChartOptions : ChartOptions<'bar'> = 
        {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Field of Sciences by # of Jobs',
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
                        text: 'Fields of Science',
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
                        text: '# Jobs',
                    },
                },
            },
        };

    public fosByNodesBarChartOptions : ChartOptions<'bar'> = 
        {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Field of Sciences by # of Nodes',
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
                        text: 'Fields of Science',
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
                        text: '# Nodes',
                    },
                },
            },
        };

        public fosByDurationBarChartOptions : ChartOptions<'bar'> = 
        {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Field of Sciences by Duration',
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
                        text: 'Fields of Science',
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
                        text: 'Duration (Hours)',
                    },
                },
            },
        };

    public fosByProjBarChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };

    public fosByJobBarChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };

    public fosByNodesBarChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };

    public fosByDurationBarChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [],
    };

    system: string;
    
    constructor(private apiService   : ApiService,
        private infoService  : InfoService,
        private route        : ActivatedRoute,
        private colorService : ColorService) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe( (params : ParamMap ) =>
            {
    
                this.system = params.get('name');
    
                this.apiService.postInfo( params.get('name') )
                .subscribe({
                    next: (data: any) => {
                        
                        data.fos_info.forEach( ( value ) =>
                            {
                                value.duration = value.sec_total;
            
                                // convert from seconds to minutes
                                value.duration = value.duration / 60;
                                
                                // convert from minutes to hours
                                value.duration = value.duration / 60;
                                
                        });

                        let fosByProjData     = [ ...data.fos_info ];                        

                        fosByProjData = this.sortArr( fosByProjData, 'proj_total' );

                        this.fosByProjBarChartData.labels = fosByProjData.map( ( d : any ) => d.abbrev );
                                          
                        this.fosByProjBarChartData.datasets = [
                            {
                                data: fosByProjData.map( ( d : any ) => d.proj_total ),
                                backgroundColor : fosByProjData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                            }

                        ];

                        let fosByJobData      = [ ...data.fos_info ];

                        fosByJobData = this.sortArr( fosByJobData, 'job_total' );

                        this.fosByJobBarChartData.labels = fosByJobData.map( ( d : any ) => d.abbrev );
                        
                        this.fosByJobBarChartData.datasets = [
                            {
                                data: fosByJobData.map( ( d : any ) => d.job_total ),
                                backgroundColor : fosByJobData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                            }

                        ];

                        let fosByNodesData     = [ ...data.fos_info ];                        

                        fosByNodesData = this.sortArr( fosByNodesData, 'node_total' );

                        this.fosByNodesBarChartData.labels = fosByNodesData.map( ( d : any ) => d.abbrev );
                                          
                        this.fosByNodesBarChartData.datasets = [
                            {
                                data: fosByNodesData.map( ( d : any ) => d.node_total ),
                                backgroundColor : fosByNodesData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                            }

                        ];

                        let fosByDurationData     = [ ...data.fos_info ];                        

                        fosByDurationData = this.sortArr( fosByDurationData, 'duration' );

                        this.fosByDurationBarChartData.labels = fosByDurationData.map( ( d : any ) => d.abbrev );
                                          
                        this.fosByDurationBarChartData.datasets = [
                            {
                                data: fosByDurationData.map( ( d : any ) => d.node_total ),
                                backgroundColor : fosByDurationData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                            }

                        ];
                    },
                    error: (err: any) => {
                        console.error('Error fetching data:', err);
                    },
                    complete: () => {
                        console.log('Data fetching complete.');
                        
                        this.charts.forEach(chart => {
                            chart.chart?.update();
                          });
                    }
                });
            });
    }

    public barChartLegend = false;

    sortArr( arr : any[ ], val : string ) : any[]
    {
        return arr.sort( ( a, b ) =>
        {
            return ( a[val] > b[val] ) ? -1 : 1;
        });
    }
}
