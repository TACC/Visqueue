import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-time-series-graph',
    templateUrl: './time-series-graph.component.html',
    styleUrls: ['./time-series-graph.component.scss']
})
export class TimeSeriesGraphComponent implements OnInit {

    public graph = {
        data: [
            { name : 'CCS', x: ['2013-10', '2013-11', '2013-12'], y: [2, 6, 3], type: 'scatter', mode: 'lines+markers' },
            { name : 'CISE',  x: ['2013-10', '2013-11', '2013-12'], y: [5, 8, 4], type: 'scatter', mode: 'lines+markers' }
        ],
        layout: 
        { 
            title: 'A Fancy Plot',
            xaxis : 
            {
                type : 'date',
                tickformat : '%b %y',
                tick0 : '2013-10',
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
            .subscribe( data =>
                {
                    console.log( data );
                })
    }

}
