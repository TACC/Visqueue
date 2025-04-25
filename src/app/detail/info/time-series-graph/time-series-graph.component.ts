import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { ActivatedRoute } from '@angular/router';
import { FosTimeSeries } from 'src/app/models/fos-time-series';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
    selector: 'app-time-series-graph',
    templateUrl: './time-series-graph.component.html',
    styleUrls: ['./time-series-graph.component.scss'],
    imports: [PlotlyModule]
})
export class TimeSeriesGraphComponent implements OnInit {

    public graph = {
        data : [],
        layout: 
        { 
            title: 'Jobs per month (Field of Science)',
            showlegend : true,
            xaxis : 
            {
                type : 'date',
                tickformat : '%b %y',
                dtick : 'M1',
                gridcolor : 'rgba(133, 133, 133, 0.5)'
            },
            yaxis : { gridcolor : 'rgba(133, 133, 133, 0.5)' },
            plot_bgcolor  : 'rgba(0,0,0,0)',
            paper_bgcolor : 'rgba(0,0,0,0)'
        },
        config : 
        {
            responsive : true
        }
    };

    constructor(
        private infoService : InfoService,
        private route       : ActivatedRoute
        ) { }

    ngOnInit(): void 
    {
        let system =  this.route.snapshot.params[ 'name' ];

        this.infoService.getFosTimeSeries( system )
            .subscribe( ( data : [ FosTimeSeries ] ) =>
                {
                    
                    for (const fosData of data ) 
                    {
                        fosData.data.sort( ( val1, val2 ) =>
                        {
                            let val1Date = Date.parse( val1.date );
                            let val2Date = Date.parse( val2.date );

                            if( val1Date > val2Date )
                            {
                                return 1;
                            }
                            else if( val1Date < val2Date )
                            {
                                return -1;
                            }

                            return 0;
                        });

                        let dates     = fosData.data.map( d => d.date       );
                        let jobs      = fosData.data.map( d => d.total_jobs );
                        
                        let ts_color =  this.infoService.getFosColor( fosData.abbrev );
                    
                        this.graph.data.push( 
                            {
                                name : fosData.name,
                                x    : dates,
                                y    : jobs,
                                type : 'scatter',
                                mode : 'lines+markers',
                                line : { color : ts_color },
                                hovertemplate : '%{y:,} <i>Jobs</i>',
                                connectgaps : false
                            }
                        );
                    }

                })
    }

}
