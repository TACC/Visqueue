import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ResponseData } from 'src/app/models/explore/jpw/responseData';
import { GraphData } from 'src/app/models/explore/jpw/graphData';
import { JpwTsdata } from 'src/app/models/explore/jpw/jpw-tsdata';

@Component({
    selector: 'app-jpw-timeserieschart',
    templateUrl: './jpw-timeserieschart.component.html',
    styleUrls: ['./jpw-timeserieschart.component.scss']
})
export class JpwTimeserieschartComponent implements OnInit {

    @Input() data : ResponseData;

    graphData : GraphData[];

    layout = 
    {
        title : 'Jobs per Week by Field of Science'
    };

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void 
    {

        if( changes.data )
        {
            if(changes.data.firstChange )
            {
                return;
            }

            let newData : GraphData[] = [];

            for (const datum of changes.data.currentValue ) 
            {
                console.log( datum );
                
                let xValues = datum.data.map( ( a : JpwTsdata ) => a.weekStart );
                let yValues = datum.data.map( ( a : JpwTsdata ) => a.jobs );

                console.log( xValues );
                console.log( yValues );

                let t_graphData = {
                    type : 'scatter',
                    mode : 'lines',
                    name : datum.fos,
                    x : xValues,
                    y : yValues,
                    line : {
                        color : '#17BECF'
                    }
                };

                newData.push( t_graphData );

                this.graphData = newData;
            }
    
        }    

    }

}
