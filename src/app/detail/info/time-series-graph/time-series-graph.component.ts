import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { ActivatedRoute } from '@angular/router';
import { FosTimeSeries } from 'src/app/models/fos-time-series';

@Component({
    selector: 'app-time-series-graph',
    templateUrl: './time-series-graph.component.html',
    styleUrls: ['./time-series-graph.component.scss']
})
export class TimeSeriesGraphComponent implements OnInit {

    public graph = {
        data : [],
        layout: 
        { 
            title: 'Number of Jobs per month for each Field of Science',
            showlegend : true,
            xaxis : 
            {
                type : 'date',
                tickformat : '%b %y',
                dtick : 'M1'
            }
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
                        let parIndex  = fosData.fos.indexOf('(');
                        
                        let shortName;

                        if( parIndex >= 0 )
                        {
                            shortName = fosData.fos.substring( ( fosData.fos.indexOf('(') + 1 ), fosData.fos.length - 1 ); 
                        }
                        else
                        {
                            shortName = 'HUM';
                        }

                        console.log( shortName );
                        console.log( dates );
                        console.log( jobs );
                    
                        this.graph.data.push( 
                            {
                                name : shortName,
                                x    : dates,
                                y    : jobs,
                                type : 'scatter',
                                mode : 'lines+markers'
                            }
                        );
                    }

                })
    }

}
