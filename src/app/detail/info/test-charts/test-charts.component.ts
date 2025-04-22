import { Component, OnInit, ViewChild } from '@angular/core';
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

    @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

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
                    text: 'Primary Field of Sciences by # of Projects',
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

    public fosByProjBarChartData: ChartData<'bar'> = {
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

                        console.log( 'fosByProjData', fosByProjData );

                        fosByProjData = this.sortArr( fosByProjData, 'proj_total' );

                        this.fosByProjBarChartData.labels = fosByProjData.map( ( d : any ) => d.abbrev );
                                          
                        this.fosByProjBarChartData.datasets = [
                            {
                                data: fosByProjData.map( ( d : any ) => d.proj_total ),
                                backgroundColor : fosByProjData.map( ( d : any ) => this.colorService.getColorAbbrev( d.abbrev ) ),
                            }

                        ];
                    },
                    error: (err: any) => {
                        console.error('Error fetching data:', err);
                    },
                    complete: () => {
                        console.log('Data fetching complete.');
                        this.chart?.update();
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
