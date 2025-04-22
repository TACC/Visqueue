import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChartConfiguration } from 'chart.js';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InfoTableComponent } from './info-table/info-table.component';
import { InfoService } from './info.service';
import { ColorService } from 'src/app/color.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
        MatCardModule,
        MatButtonToggleModule
    ],
    providers: [InfoService]
})
export class InfoComponent implements OnInit
{
    
    @ViewChild(InfoTableComponent) infotable;

    public fosByProjBarChartOptions : ChartConfiguration['options'] = 
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


    system : string;

    timestamp : string;

    JobsDisplayEnum  =  JobsDisplay;
    jobVal: JobsDisplay;
    jobTotal: number;
    jobCompleted: number;

    constructor(
        private apiService   : ApiService,
        private infoService  : InfoService,
        private route        : ActivatedRoute,
        private colorService : ColorService ) { }

    ngOnInit()
    {

        this.route.paramMap.subscribe( (params : ParamMap ) =>
        {

            this.system = params.get('name');

            this.apiService.postInfo( params.get('name') )
            .subscribe( ( data : any ) =>
            {

                this.timestamp = data.timestamp;  
                
                this.jobTotal        = data.job_total;
                this.jobCompleted    = data.job_completed;


            } );

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

}
